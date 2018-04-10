import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/order/records.css'
import { Event, Components } from 'fw-javascripts'

@inject('order')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class Records extends React.Component {
    state = {
        tab: '进行中',
        closeLayer: false,
        orderAmount: 0,
        matchAmount: 0
    }

    componentDidMount() {
        this.props.order.fetchRecords()
        Event.touchBottom(this.props.order.fetchRecords)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    switchTab = (tab) => {
        if (this.state.tab == tab) return
        this.setState({ tab: tab })
        let t = 1
        if (tab == '已退出') t = 2
        this.props.order.initPage()
        this.props.order.setRecordsTab(t)
    }

    showLayerHandler = (item) => {
        this.setState({ orderAmount: item.orderAmount, matchAmount: item.matchAmount, closeLayer: true })
    }
    closeLayerHanlder = () => {
        this.setState({ closeLayer: false })
    }
    gotoDetail = (orderId) => {
        this.props.history.push(`/order/records-detail?orderId=${orderId}`)
    }

    render() {
        let { tab, closeLayer, orderAmount, matchAmount } = this.state
        let { history } = this.props
        let { dateMethod, records, recordsDetail } = this.props.order

        let no_records = <div styleName="emptyPanel">
            <img src={require('../../images/order/records/norecords.png')} />
            <div>暂无预约</div>
        </div>
        let tabFn = (item, index) => {
            return <div styleName="tab" key={index}>
                <div styleName={tab == item ? "tabItem tabActive" : "tabItem"}
                    onClick={() => this.switchTab(item)}>{item}</div>
            </div>
        }
        let recordsFn = (item, index) => {
            let status
            if (item.orderStatus == '0') {
                status = '预约中'
            } else if (item.orderStatus == '1') {
                status = '持有中'
            } else if (item.orderStatus == '2') {
                status = '退出中'
            } else if (item.orderStatus == '3') {
                status = '已结束 '
            } else if (item.orderStatus == '4') {
                status = '预约失败'
            }
            return <div styleName="record" key={index}>
                <div styleName="recordTitle">
                    <div styleName="recordLeft">
                        <div styleName="bid">{item.orderName}</div>
                        <div styleName="bidDetail">{item.annualRate} / {item.lockPeriod}天 / {item.repayModeText}</div>
                    </div>
                    <div styleName="recordRight" onClick={() => this.gotoDetail(item.orderId)}>
                        <span styleName="reserve">{status}</span>
                        <img src={require('../../images/order/apply/arrow.png')} />
                    </div>
                </div>
                {(status == '预约中' || status == '持有中' || status == '退出中') && <div styleName="recordItem interest">
                    <span>预期利息</span>
                    <span styleName="red">¥{item.interestAmount}</span>
                </div>}
                {(status == '预约中' || status == '预约失败') && <div styleName="recordItem">
                    <span>预约金额</span>
                    <span styleName="red">¥{item.orderAmount}</span>
                </div>}
                {(status == '持有中') && <div styleName="recordItem">
                    <span>加入本金</span>
                    <img styleName="circle" onClick={() => this.showLayerHandler(item)}
                        src={require('../../images/order/records-detail/circle.png')} />
                    <span>{item.orderAmount}</span>
                </div>}
                {(status == '退出中') && <div styleName="recordItem">
                    <span>加入本金</span>
                    <span>{item.orderAmount}</span>
                </div>}
                {(status == '预约中' || status == '持有中' || status == '退出中') && <div styleName="recordItem">
                    <span>预约时间</span>
                    <span>{item.appointTime}</span>
                </div>}
                {(status == '预约中') && <div styleName="recordItem">
                    <span>预计起息日期</span>
                    <span>{item.loanTime}</span>
                </div>}
                {(status == '持有中' || status == '退出中') && <div styleName="recordItem">
                    <span>起息时间</span>
                    <span>{item.loanTime}</span>
                </div>}
                {(status == '退出中') && <div styleName="recordItem">
                    <span>预计退出时间</span>
                    <span>{item.exitTime}</span>
                </div>}
                {(status == '预约失败') && <div styleName="recordItem">
                    <span>预约日期</span>
                    <span>{item.appointTime}</span>
                </div> && <div styleName="recordItem">
                        <span>预约终止日期</span>
                        <span>{item.exitTime}</span>
                    </div>}
                {(status == '已结束') && <div styleName="recordItem">
                    <span>已收利息</span>
                    <span>{item.interestAmount}</span>
                </div> && <div styleName="recordItem">
                        <span>已收本金</span>
                        <span>{item.orderAmount}</span>
                    </div> && <div styleName="recordItem">
                        <span>退出时间</span>
                        <span>{item.exitTime}</span>
                    </div>}
                {/*<div styleName="set">*/}
                {/*<div styleName="setText">到期后设置<span>(到期前5天12:00前可更改)</span></div>*/}
                {/*<div styleName="quit">{dateMethod}</div>*/}
                {/*</div>*/}
            </div>
        }
        return <div styleName="bg">
            <Header title="我的预约" history={history} />
            <div styleName="tabs">
                {['进行中', '已退出'].map(tabFn)}
            </div>
            <div styleName="records">
                {records.length > 0 && records.map(recordsFn)}
                {records.length == 0 && no_records}
            </div>
            {closeLayer && <div styleName="layer">
                <div styleName="layerBox">
                    <div styleName="layerText">
                        本次预约总额为<span>{orderAmount}</span>元，已成功匹配债权金额为<span>{matchAmount}</span>元(加入本金)。，预约成功后5个自然日内未匹配成功的资金将退回至您的账户内。<br /><br />
                        预期利息是根据最近一次到期日计算所得，仅供参考。实际所得利息，以退出结算时的结果为准。
                    </div>
                    <div styleName="layerBtn" onClick={this.closeLayerHanlder}>知道了</div>
                </div>
                <img styleName="layerClose" onClick={this.closeLayerHanlder}
                    src={require('../../images/order/records-detail/close.png')} />>
            </div>}
        </div>
    }
}

export default Records