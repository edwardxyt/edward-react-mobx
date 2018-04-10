import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/novice-bid/apply.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

@inject('novice_bid')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class ReserveApplyNovice extends React.Component {
    state = {
        pending: false,
        is_used: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.novice_bid.fetchNoviceProduct()
            .then((data) => {
                (data.couponId != "") && this.setState({is_used: true})
            })

    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")

        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.novice_bid.setFormData(name, `${v[0]}.${v[1]}`, 'novice_bid_data')
        } else {
            this.props.novice_bid.setFormData(name, e.target.value, 'novice_bid_data')
        }

    }

    allMadeHandler = () => {
        let {novice_bid} = this.props
        this.props.novice_bid.setFormData('reserveMoney', novice_bid.novice_bid_data.accountAmount, 'novice_bid_data')
    }

    applyHandler = () => {
        let {novice_bid, history} = this.props
        let {is_used} = this.state
        let sussessHandler = () => {
            if (this.state.pending) return
            this.setState({pending: true})
            let coupon_id = is_used ? novice_bid.novice_bid_data.couponId : ''
            novice_bid.submitNoviceHandler(coupon_id)
                .then(() => {
                        return Components.showToast('预约成功')
                    },
                    () => {
                        this.setState({pending: false})
                        return new Promise((_, reject) => {
                        })
                    })
                .then(() => {
                    //预约成功后触发首页刷新
                    NativeBridge.trigger('home_refresh')
                    history.push(`/novice-bid/success?is_used=${this.state.is_used}`)
                })
        }
        novice_bid.fetchNoviceProduct().then(data => {
            if (novice_bid.novice_bid_data.reserveMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (novice_bid.novice_bid_data.reserveMoney < novice_bid.novice_bid_data.context.minAmt) {
                Components.showToast("预约金额不足100")
            } else if (is_used && novice_bid.novice_bid_data.reserveMoney > novice_bid.novice_bid_data.context.investMaxAmount) {
                Components.showToast("抢购金额超限")
            } else if (novice_bid.novice_bid_data.reserveMoney > novice_bid.novice_bid_data.accountAmount) {
                Components.showToast("可用金额不足，请充值后重试")
            } else if (is_used && novice_bid.novice_bid_data.reserveMoney < novice_bid.novice_bid_data.couponInvestMultip) {
                Components.showToast("不满足20元返现券使用条件，抢购金额满2000可用")
            } else if (!novice_bid.novice_bid_data.isCompany) {
                if (novice_bid.novice_bid_data.reserveMoney > data.batchMaxmum) {
                    Components.showToast("自动投标金额不足").then(() => {
                        NativeBridge.toNative('auto_bid_second')
                    })
                } else {
                    sussessHandler()
                }
            } else {
                sussessHandler()
            }
        })
    }

    useCouponHandler = () => {
        let {is_used} = this.state
        this.setState({is_used: !is_used})
    }

    render() {
        let {history, novice_bid} = this.props
        let {context} = novice_bid.novice_bid_data
        let submit_panel = () => {
            return <div styleName="submitPanel">
                <div styleName="reserveMoney">抢购金额</div>
                <div styleName="userMoney">
                    <div styleName="inputMoney">
                        <input type="number" placeholder="100元起，限投30000" value={novice_bid.novice_bid_data.reserveMoney}
                               onChange={this.inputChangeHandler('reserveMoney')}/>
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>
                            全投
                        </span>
                    </div>
                    <div styleName="money">
                        <div styleName="balance">
                            可用余额<span styleName="remain">&yen;{novice_bid.novice_bid_data.accountAmount}</span>
                        </div>
                        <div styleName="recharge" onClick={() => NativeBridge.toNative('app_recharge')}>充值</div>
                    </div>
                </div>
            </div>
        }
        let amount_panel = () => {
            let infoItem = (name, value) => {
                return <div styleName={name == '预计起息时间' ? "infoItem itemLast" : "infoItem"}>
                    <div styleName="itemLeft">{name}</div>
                    <div styleName={name == "预期年化利率" ? "itemRight rightRed" : "itemRight"}>
                        {value}
                    </div>
                </div>
            }
            let goals_num = (novice_bid.novice_bid_data.reserveMoney * ((context.loadRate + context.addRate) / 100) * context.repayPeriod) / 360
            let goals = goals_num.toString().split('.')
            if (goals[1] && goals[1].length > 2) {
                goals[1] = goals[1].substr(0, 2)
                goals = `${goals[0]}.${goals[1]}`
            } else {
                goals = goals_num
            }
            return <div styleName="submitInfo">
                <div styleName="infoContent">
                    <div styleName="infoAmount">
                        <div styleName="amountLeft">预计利息<span styleName="coverBeans">(含加息工豆)</span></div>
                        <div styleName="amountRight">
                            &yen;{goals}
                        </div>
                    </div>
                    <div styleName="itemWrapper">
                        <div styleName="infoItem">
                            <div styleName="itemLeft">预期年化利率</div>
                            <div styleName="itemRight rightRed">
                                {context.addRate == 0 ? context.loadRate + '%' :
                                    <span styleName="addRate">{`${context.loadRate}%+${context.addRate}%`}</span>}
                            </div>
                        </div>
                        {infoItem("期限", `${context.repayPeriod}天`)}
                        {infoItem("预计起息时间", "预计今日起息")}
                    </div>
                </div>
            </div>
        }

        let coupon_panel = () => {
            let {is_used} = this.state
            return <div styleName="couponPanel">
                <div styleName="couponLeft">
                    <span styleName={is_used ? "iconChecked" : "iconUnChecked"} onClick={this.useCouponHandler}></span>
                    <span styleName="couponLeftText">使用优惠券</span>
                </div>
                <div styleName="couponRight">
                    <span styleName="rightRed">&yen;20</span>返现券，满<span
                    styleName="rightRed">&yen;{novice_bid.novice_bid_data.couponInvestMultip}</span>可用
                </div>
            </div>
        }

        let procotol_panel = () => {
            return <div styleName="submitProtocol protocolNovice">
                <span styleName="protocolText">本人已阅读并签署
                    <span styleName="applyProtocol"
                          onClick={() => history.push(`/novice-bid/protocol?applyInvestClaimId=${novice_bid.applyInvestClaimId}`)}>
                        《预约协议》
                    </span>
                </span>
            </div>
        }

        let novice_intro = () => {
            return <div styleName="introPanel">
                新手标简介
                <br/>1、您投的新手标所匹配的资产是期限为21天消费贷。
                <br/>2、结果可在金融工场app-我的-我的预约中查看。
                <br/>3、2%奖励将以工豆形式在标的起息后发到您的工豆账户中。
                <br/>4、奖励工豆可在您再次出借时抵现（100个工豆=1元）。
                <br/>5、工豆是平台对新用户的奖励，不可提现。
            </div>
        }

        let bottom_panel = () => {
            return <div styleName="submitBtnContainer">
                <div styleName="submitBtn" onClick={this.applyHandler}>立即预约</div>
            </div>
        }
        return <div styleName="applyPanel">
            <Header title="新手标抢购" history={history}/>
            {submit_panel()}
            <div styleName="interval"></div>
            {amount_panel()}
            <div styleName="interval"></div>
            {novice_bid.novice_bid_data.couponId != '' && coupon_panel()}
            {procotol_panel()}
            {novice_intro()}
            {bottom_panel()}
        </div>
    }
}

export default ReserveApplyNovice