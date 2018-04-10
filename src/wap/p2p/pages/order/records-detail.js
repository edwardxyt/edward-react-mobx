import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/order/records-detail.css'

@inject('order')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class RecordsDetail extends React.Component {
    state = {
        closeLayer: false,
        closePop: false,
        status: this.props.order.dateMethod
    }

    componentDidMount() {
        this.props.order.fetchRecordsDetail()
    }

    closeLayerHanlder = () => {
        this.setState({closeLayer: false})
    }
    showLayerHandler = () => {
        this.setState({closeLayer: true})
    }
    showPopHandler = () => {
        this.setState({closePop: true})
    }
    selectHanlder = (status) => {
        if (this.state.status == status) return
        this.setState({status: status})
    }
    submitHandler = () => {
        let {status} = this.state
        this.setState({closePop: false})
        this.props.order.confirmRepeatFlag(status)
    }
    gotoProtocol = () => {
        this.props.history.push(`/order/protocol?applyInvestClaimId=${this.props.order.applyInvestClaimId}`)
    }

    render() {
        let {closeLayer, closePop, status} = this.state
        let {history} = this.props
        let {recordsDetail, recordsResult, totalCount} = this.props.order


        let popText = [
            {
                title: '继续复投',
                status: '1',
                text: '继续复投即用户授权平台系统在锁定期满后将回款（如有回款）本息自动匹配新的资产。到期前5天12:00前可更改。'
            },
            {
                title: '自动退出',
                status: '0',
                text: '自动退出即用户授权平台系统锁定期后自动发起债权转让申请。到期前5天12:00前可更改。'
            }
        ]
        let popItem = (item, index) => {
            return <div styleName="popItem" key={index} onClick={() => this.selectHanlder(item.status)}>
                {item.status == status ? <img src={require('../../images/order/records-detail/checked.png')}/> :
                    <img src={require('../../images/order/records-detail/check.png')}/>}
                <div styleName="popType">
                    <div styleName="popTitle">{item.title}</div>
                    <div styleName="popText">{item.text}</div>
                </div>
            </div>
        }
        let welfareStatus = {
            2: '投标中',
            3: '流标',
            4: '满标',
            5: '还款中',
            6: '已还清'
        }
        let welfareFn = (item, index) => {
            return <div styleName="list" key={item.orderId}>
                <div styleName="listTitle">{item.prdName}</div>
                <div styleName="listItem">
                    <span>加入金额</span>
                    <span styleName="red">¥{item.investMoney}</span>
                </div>
                <div styleName="listItem">
                    <span>预期年化利率</span>
                    <span>{item.annualRate}</span>
                </div>
                <div styleName="listItem">
                    <span>出借/转入日期</span>
                    <span>{item.applyDate}</span>
                </div>
                <div styleName="status">{welfareStatus[item.status]}</div>
            </div>
        }

        let status_func=()=>{
            let status
            if (recordsDetail.orderStatus == '0') {
                status = '预约中'
            } else if (recordsDetail.orderStatus == '1') {
                status = '持有中'
            } else if (recordsDetail.orderStatus == '2') {
                status = '退出中'
            } else if (recordsDetail.orderStatus == '3') {
                status = '已结束 '
            } else if (recordsDetail.orderStatus == '4') {
                status = '预约失败'
            }
            return  <div styleName="recordBox">
                <div styleName="recordItem">
                    <span>状态</span>
                    <span>{status}</span>
                </div>
                <div styleName="recordItem">
                    <span>预约时间</span>
                    <span>{recordsDetail.appointTime}</span>
                </div>
                {(status == '预约中') && <div styleName=" recordItem">
                    <span>预计起息日期</span>
                    <span>{recordsDetail.loanTime}</span>
                </div>}
                {(status == '持有中' || status == '退出中' || status == '已退出') &&
                <div styleName=" recordItem">
                    <span>起息日期</span>
                    <span>{recordsDetail.loanTime}</span>
                </div> && <div styleName=" recordItem">
                    <span>最近到期日</span>
                    <span>{recordsDetail.lastExpireTime}</span>
                </div>}
                {(status == '退出中') && <div styleName=" recordItem">
                    <span>预计退出日期 </span>
                    <span>{recordsDetail.lastExpireTime}</span>
                </div>}
                {(status == '预约失败') && <div styleName=" recordItem">
                    <span>预约终止日期 </span>
                    <span>{recordsDetail.exitTime}</span>
                </div>}
                {(status == '已退出') && <div styleName=" recordItem">
                    <span>退出日期 </span>
                    <span>{recordsDetail.exitTime}</span>
                </div>}
            </div>
        }



        return <div styleName="bg">
            <Header title="我的预约" history={history} sub_title="项目详情" sub_link="/order/info"/>
            <div styleName="detailTitle">
                <div styleName="amountText">预约总额</div>
                <div styleName="amount">¥{recordsDetail.orderAmount}</div>
                <div styleName="interest">预期利息:<span>¥{recordsDetail.interestAmount}</span></div>
                <img styleName="circle" onClick={this.showLayerHandler}
                     src={require('../../images/order/records-detail/circle.png')}/>
            </div>
            {status_func()}
            <div styleName="middle">
                {/*<div styleName="set">*/}
                {/*<div styleName="setText">到期后设置<span>(到期前5天12:00前可更改)</span></div>*/}
                {/*<div styleName="quit" onClick={this.showPopHandler}>{status}<img src={require('../../images/order/apply/arrow.png')} /></div>*/}
                {/*</div>*/}
                <div styleName="set" onClick={this.gotoProtocol}>
                    <div styleName="setText">出借咨询与服务协议</div>
                    <div styleName="quit">查看<img src={require('../../images/order/apply/arrow.png')}/></div>
                </div>
            </div>
            <div styleName="welfare">
                {/*<div styleName="welfareTitle">获得福利</div>
                <div styleName="welfareText">
                    <div styleName="recordItem">
                        <span>使用返现券</span>
                        <span>¥100.00 / 2张</span>
                    </div>
                    <div styleName="recordItem">
                        <span>使用返息券</span>
                        <span>500工豆 / 1张</span>
                    </div>
                    <div styleName="recordItem">
                        <span>工分</span>
                        <span>850</span>
                    </div>
                    <div styleName="recordItem">
                        <span>加息奖励</span>
                        <span>900工豆</span>
                    </div>
                    <div styleName="recordItem">
                        <span>贡献值</span>
                        <span>780</span>
                    </div>
                </div>
                <div styleName="welfareNo">预约成功6日内，以最终成功匹配的金额发放相关福利。
            </div>*/}
                {totalCount > 0 && <div styleName="welfare">
                    <div styleName="welfareTitle">债权列表({totalCount}个)</div>
                    <div styleName="lists">
                        {recordsResult && recordsResult.map(welfareFn)}
                    </div>
                </div>}
            </div>
            {closeLayer && <div styleName="layer">
                <div styleName="layerBox">
                    <div styleName="layerText">
                        本次预约总额为<span>{recordsDetail.orderAmount}</span>元，已成功匹配债权金额为<span>{recordsResult.investMoney}</span>元(加入本金)。，预约成功后5个自然日内未匹配成功的资金将退回至您的账户内。<br/><br/>
                        预期利息是根据最近一次到期日计算所得，仅供参考。实际所得利息，以退出结算时的结果为准。
                    </div>
                    <div styleName="layerBtn" onClick={this.closeLayerHanlder}>知道了</div>
                </div>
                <img styleName="layerClose" onClick={this.closeLayerHanlder}
                     src={require('../../images/order/records-detail/close.png')}/>>
            </div>}
            {closePop && <div styleName="pop">
                <div styleName="popBox">
                    {popText.map(popItem)}
                    <div styleName="popBtn" onClick={this.submitHandler}>确定</div>
                </div>
            </div>}
        </div>
    }
}

export default RecordsDetail