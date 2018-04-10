import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import { Header } from '../../components/'
import { NativeBridge } from '../../helpers/'
import styles from '../../css/reserve-bid/apply.css'

@inject('reserve_bid')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class ReserveApply extends React.Component {
    state = {
        pending: false,
        type_tab: -1,
        applyId: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.reserve_bid.fetchProduct()
        this.setState({ applyId: this.props.reserve_bid.applyInvestClaimId })
    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")

        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.reserve_bid.setFormData(name, `${v[0]}.${v[1]}`, 'bid_data')
        } else {
            this.props.reserve_bid.setFormData(name, e.target.value, 'bid_data')
        }

    }

    allMadeHandler = () => {
        let { reserve_bid } = this.props
        this.props.reserve_bid.setFormData('reserveMoney', reserve_bid.bid_data.accountAmount, 'bid_data')
    }

    applyHandler = () => {
        let { reserve_bid, history } = this.props
        let { type_tab } = this.state
        let current_type
        if (reserve_bid.bid_data.bids.length == 1) {
            current_type = 0
        } else {
            current_type = type_tab
        }
        let current_bid = reserve_bid.bid_data.bids[current_type]
        let sussessHandler = () => {
            if (this.state.pending) return
            this.setState({ pending: true })
            reserve_bid.submitReserveHandler(current_bid.id, current_bid.couponId)
                .then(() => {
                    return Components.showToast('预约成功')
                },
                () => {
                    this.setState({ pending: false })
                    return new Promise((_, reject) => {
                    })
                })
                .then(() => {
                    history.push(`/reserve-bid/records`)
                })
        }

        reserve_bid.fetchProduct().then(data => {
            if (type_tab == -1 && (!this.props.reserve_bid.applyInvestClaimId)) {
                Components.showToast("请选择预约产品")
            } else if (reserve_bid.bid_data.reserveMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (reserve_bid.bid_data.reserveMoney < current_bid.minAmt) {
                Components.showToast("预约金额不足100")
            } else if (reserve_bid.bid_data.reserveMoney > current_bid.accountAmount) {
                Components.showToast("可用金额不足，请充值后重试")
            } else if (!current_bid.isCompany) {
                if (reserve_bid.bid_data.reserveMoney > data.batchMaxmum) {
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

    switchTypeHandler = (index, item) => {
        this.setState({ type_tab: index })
        this.setState({ applyId: this.props.reserve_bid.applyInvestClaimId || item.id })
    }

    toProtocol = () => {
        let id
        if (this.state.type_tab == -1 && (!this.props.reserve_bid.applyInvestClaimId)) {
            id = 1
        } else {
            id = this.state.applyId
        }
        this.props.history.push(`/reserve-bid/protocol?applyInvestClaimId=${id}`)
    }

    render() {
        let { reserve_bid, history } = this.props
        let { context } = reserve_bid.bid_data
        let { type_tab } = this.state
        let infoItem = (name, value) => {
            return <div styleName={name == '复投次数' ? "infoItem itemLast" : "infoItem"}>
                <div styleName="itemLeft">{name}</div>
                <div styleName={name == "预期年化利率" ? "itemRight rightRed" : "itemRight"}>{value}</div>
            </div>
        }
        let type_list_func = (item, index) => {
            if (!item || !item.status) return;

            return <div
                styleName={(item.id == reserve_bid.applyInvestClaimId || type_tab == index) ? "typeItem typeItemChecked" : "typeItem"}
                key={index}
                onClick={() => this.switchTypeHandler(index, item)}>
                {item.loadRate}%{item.addRate == 0 ? "" : '+' + item.addRate + '%'}<span
                    styleName="color9">/</span>{item.repayPeriod}天
            </div>
        }

        let single_info = () => {
            let goals = ((reserve_bid.bid_data.reserveMoney * ((context.loadRate + context.addRate) / 100) * context.repayPeriod) / 360).toString().split(".")
            if (goals[1] && goals[1].length > 2) {
                goals[1] = goals[1].substr(0, 2)
                goals = `${goals[0]}.${goals[1]}`
            } else {
                goals = (reserve_bid.bid_data.reserveMoney * ((context.loadRate + context.addRate) / 100) * context.repayPeriod) / 360
            }

            let year_rate = context.addRate == 0 ? `${context.loadRate}%` : `${context.loadRate}%+${context.addRate}%`
            let complex_count = context.repayPeriod == '21' ? '0次' : context.repayPeriod == '42' ? '1次' : context.repayPeriod == '63' ? '2次' : '-次'
            return <div styleName="infoContent">
                <div styleName="infoAmount">
                    <div styleName="amountLeft">预计利息<span styleName="coverBeans">(含加息工豆)</span></div>
                    <div styleName="amountRight">
                        &yen;{goals}
                    </div>
                </div>
                <div styleName="itemWrapper">
                    {infoItem("预期年化利率", year_rate)}
                    {infoItem("期限", `${context.repayPeriod}天`)}
                    {infoItem("预计起息时间", "预计今日起息")}
                    {infoItem("预约有效期", `${context.bookValidPeriod}天`)}
                    {infoItem("复投次数", complex_count)}
                </div>
            </div>
        }

        let all_info = (bids) => {
            let bid = bids[this.state.type_tab]
            let bid_rate
            let item = {
                goals: '0',
                rate: '--%',
                term: '--天',
                indate: '--天'
            }
            if (bid) {
                bid_rate = bid.addRate == 0 ? '' : `+${bid.addRate}%`
            }
            if (bid) item = {
                goals: (reserve_bid.bid_data.reserveMoney * ((bid.loadRate + bid.addRate) / 100) * bid.repayPeriod) / 360,
                rate: `${bid.loadRate}%${bid_rate}`,
                term: bid.repayPeriod + '天',
                indate: bid.bookValidPeriod + '天'
            }
            let goals = item.goals.toString().split('.')
            if (goals[1] && goals[1].length > 2) {
                goals[1] = goals[1].substr(0, 2)
                goals = `${goals[0]}.${goals[1]}`
            } else {
                goals = item.goals
            }
            let complex_number = item.term == '21天' ? '0次' : item.term == '42天' ? '1次' : item.term == '63天' ? '2次' : '--次'
            return <div styleName="infoContent">
                <div styleName="infoAmount">
                    <div styleName="amountLeft">预计利息<span styleName="coverBeans">(含加息工豆)</span></div>
                    <div styleName="amountRight">
                        &yen;{goals}
                    </div>
                </div>
                <div styleName="itemWrapper">
                    {infoItem("预期年化利率", item.rate)}
                    {infoItem("期限", item.term)}
                    {infoItem("预计起息时间", "预计今日起息")}
                    {infoItem("预约有效期", item.indate)}
                    {infoItem("复投次数", complex_number)}
                </div>
            </div>
        }
        return <div styleName='applyPanel'>
            <Header title="预约抢购" history={history} />
            <div styleName="submitPanel">
                <div styleName="reserveType">
                    <div styleName="typeTitle">抢购信息</div>
                    <div styleName="typeSubtitle">抢购类型</div>
                    <div styleName="typeText">
                        {reserve_bid.bid_data.bids.map(type_list_func)}
                    </div>
                </div>
                <div styleName="reserveMoney">抢购金额</div>
                <div styleName="userMoney">
                    <div styleName="inputMoney">
                        <input type="number" placeholder="100元起预约" value={reserve_bid.bid_data.reserveMoney}
                            onChange={this.inputChangeHandler('reserveMoney')} />
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>
                            全投
                        </span>
                    </div>
                    <div styleName="money">
                        <div styleName="balance">
                            可用余额<span styleName="remain">&yen;{reserve_bid.bid_data.accountAmount}</span>
                        </div>
                        <div styleName="recharge" onClick={() => NativeBridge.toNative('app_recharge')}>充值</div>
                    </div>
                </div>
            </div>
            <div styleName="interval"></div>
            <div styleName="submitInfo">
                {reserve_bid.applyInvestClaimId ?
                    single_info() :
                    reserve_bid.bid_data.bids.length > 0 && all_info(reserve_bid.bid_data.bids)}
            </div>
            <div styleName="submitProtocol">
                <span styleName="protocolText">本人已阅读并签署
                    <span styleName="applyProtocol"
                        onClick={this.toProtocol}>
                        《预约协议》
                    </span>
                </span>
                <div>
                    如您出借的产品为42天或63天，考虑到复投期间存在匹配期，特殊情况，到期日会有延迟，具体以合同约定为准。
                </div>
            </div>
            <div styleName="submitBtnContainer">
                <div styleName="submitBtn" onClick={this.applyHandler}>立即预约</div>
                {/* <div styleName="submitBtn-disabled">预约已满</div> */}
            </div>
        </div>
    }
}

export default ReserveApply
