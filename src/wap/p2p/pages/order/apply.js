import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/order/apply.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

@inject('order')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Apply extends React.Component {
    state = {
        // dataPanelControl: false,
        pending: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.order.fetchProduct()
        this.props.order.fetchUser()
    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")
        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.order.setFormData(name, `${v[0]}.${v[1]}`)
        } else {
            this.props.order.setFormData(name, e.target.value)
        }
    }

    allMadeHandler = () => {
        this.props.order.setFormData('orderMoney', this.props.order.user.cashBalance)
    }

    dateChooseHandler = () => {
        this.setState({dataPanelControl: true})
    }

    closeHandler = () => {
        this.setState({dataPanelControl: false})
    }

    toProtocol = () => {
        this.props.history.push(`/order/protocol?applyInvestClaimId=${this.props.order.applyInvestClaimId}`)
    }

    applyHandler = () => {
        let {order, history} = this.props
        let sussessHandler = () => {
            if (this.state.pending) return
            this.setState({pending: true})
            order.submitHandler()
                .then((data) => {
                        if (data.appointStatus === '0') {
                            return Components.showToast('预约成功')
                        }
                    },
                    () => {
                        this.setState({pending: false})
                        return new Promise((_, reject) => {
                        })
                    })
                .then(() => {
                    history.push(`/order/success`)
                })
        }

        order.fetchProduct().then(data => {
            if (order.orderMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (order.orderMoney < order.product.minInvest) {
                Components.showToast(`预约金额不足${order.product.minInvest}`)
            } else if (order.orderMoney > order.user.cashBalance) {
                Components.showToast("可用金额不足，请充值后重试")
            } else {
                sussessHandler()
            }
            // else if (!order.judge.isCompany) {
            //     if (order.orderMoney > order.judge.batchMaxmum) {
            //         Components.showToast("自动投标金额不足").then(() => {
            //             NativeBridge.toNative('auto_bid_second')
            //         })
            //     } else {
            //         sussessHandler()
            //     }
            // } else {
            //     sussessHandler()
            // }
        })


    }

    render() {
        let {product, orderMoney, dateMethod, user} = this.props.order
        let {dataPanelControl} = this.state
        let goals_num = (orderMoney * ((product.annualRate + product.lockPeriod) / 100) * product.lockPeriod) / 360
        let goals = goals_num.toString().split('.')
        if (goals[1] && goals[1].length > 2) {
            goals[1] = goals[1].substr(0, 2)
            goals = `${goals[0]}.${goals[1]}`
        } else {
            goals = goals_num
        }
        return <div styleName="applyPanel">
            <Header title="预约抢购" history={this.props.history}/>
            <div styleName="section1">
                <div styleName="section1Up">
                    <div styleName="item item1">
                        <div styleName="itemUp"><span styleName="redRate">{product.annualRate}</span><span
                            styleName="redPrecent">%</span></div>
                        <div styleName="itemDown">预期年化利率</div>
                    </div>
                    <div styleName="item item2">
                        <div styleName="itemUp itemUp2">{product.lockPeriod}天</div>
                        <div styleName="itemDown">锁定期</div>
                    </div>
                    <div styleName="item item3">
                        <div styleName="itemUp itemUp2">{product.minInvest}元起</div>
                        <div styleName="itemDown">单日限额{product.dayLimitInvestAmount}万元</div>
                    </div>
                </div>
                <div styleName="section1Down">
                    今日剩余额度<span styleName="color333">{product.todaySurplusAmount}万元</span>
                </div>
            </div>
            <div styleName="section2">
                <div styleName="title">
                    <div styleName="titleLeft">抢购金额</div>
                    <div styleName="titleRight">预期利息<span styleName="color333">{goals}元</span></div>
                </div>
                <div styleName="content">
                    <div styleName="inputMoney">
                        <input type="text" placeholder="100元起预约" value={this.props.order.orderMoney}
                               onChange={this.inputChangeHandler('orderMoney')}/>
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>全投</span>
                    </div>
                    <div styleName="money">
                        <div styleName="balance">
                            可用余额<span styleName="remain">&yen;{user.cashBalance}</span>
                        </div>
                        <div styleName="recharge" onClick={() => NativeBridge.toNative('app_recharge')}>充值</div>
                    </div>
                </div>
            </div>
            {/*<div styleName="section3">*/}
            {/*<div styleName="left">到期后设置</div>*/}
            {/*<div styleName="right" onClick={this.dateChooseHandler}><span*/}
            {/*styleName="rightText">{dateMethod === null ? "请选择" : dateMethod === '0' ? '继续复投' : '自动退出'}</span><span*/}
            {/*styleName="iconArrow"></span></div>*/}
            {/*</div>*/}
            <div styleName="section4">
                <span styleName="protocolText">本人已阅读并签署
                    <span styleName="applyProtocol"
                          onClick={this.toProtocol}>
                        《预约协议》
                    </span>
                </span>
            </div>
            <div styleName="submitBtnContainer">
                <div styleName="submitBtn" onClick={this.applyHandler}>立即预约</div>
            </div>
            {/*{dataPanelControl && <OverDate closeHandler={this.closeHandler}/>}*/}
        </div>
    }
}

@inject('order')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class OverDate extends React.Component {
    state = {
        current: '0'
    }

    confirmHandler = () => {
        this.props.closeHandler()
        this.props.order.setDateMethod(this.state.current)
    }

    render() {
        let {current} = this.state

        return <div styleName="datePanel">
            <div styleName="main">
                <div styleName="mainItem" onClick={() => this.setState({current: '0'})}>
                    <div styleName="mainItemLeft">
                        <span styleName={current == '0' ? "iconCheck" : "iconUnCheck"}></span>
                    </div>
                    <div styleName="mainItemRight">
                        <div styleName="rightTitle color333">继续复投</div>
                        <div styleName="rightText">继续复投即用户授权平台系统在锁定期满后将回款（如有回款）本息自动匹配新的资产。到期前5天12:00前可更改。</div>
                    </div>
                </div>
                <div styleName="mainItem" onClick={() => this.setState({current: '1'})}>
                    <div styleName="mainItemLeft">
                        <span styleName={current == '1' ? "iconCheck" : "iconUnCheck"}></span>
                    </div>
                    <div styleName="mainItemRight">
                        <div styleName="rightTitle color333">自动退出</div>
                        <div styleName="rightText">自动退出即用户授权平台系统锁定期后自动发起债权转让申请。到期前一天12:00前可更改。</div>
                    </div>
                </div>
                <div styleName="confirmBtn" onClick={this.confirmHandler}>确定</div>
            </div>
        </div>
    }
}


export default Apply