import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event, Components } from 'fw-javascripts'

import styles from '../../css/reserve-bid/records.css'
import Header from '../../components/header'
import showConfirm from '../../components/confirm'
import { NativeBridge } from '../../helpers'
import { Browser } from '../../helpers'

@inject('reserve_bid')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore'  })
class ReserveRecords extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve_bid.resetPageNo();
        this.props.reserve_bid.getReserveList()
        Event.touchBottom(this.props.reserve_bid.getReserveList)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    cancelReserveHandler = (bookTime, id) => {
        let { reserve_bid, history } = this.props;
        let cb = () => {
            reserve_bid.cancelHandler(id).then((data) => {
                if (data.cancelResult == '1') {

                } else if (data.cancelResult == '0') {
                    Components.showToast("取消成功")
                    reserve_bid.resetPageNo()
                    reserve_bid.getReserveList()
                }
            })
        };
        showConfirm('确定取消？', cb)
    }

    lookProtocolHandler = (type, id) => {
        NativeBridge.trigger('reserve_contract', `${type},${id}`)
    }

    tabHandler = (status) => {
        let { type } = this.props.reserve_bid.records
        let { setRecordsCurrentStatus, getReserveList } = this.props.reserve_bid
        if (status == type) return
        setRecordsCurrentStatus(status)
    }

    render() {
        let { reserve_bid, history } = this.props
        let { type, tab } = this.props.reserve_bid.records
        let { list } = reserve_bid.records.tab[type]

        let no_records = <div styleName="emptyPanel">
            <img src={require('../../images/reserve-bid/records/norecords.png')} />
            <div styleName="norecords-text">暂无预约</div>
        </div>

        let tab_func = (item, index) => {
            let tab_item_style = item == type ? `tab_item tab_item_${index} tab_on` : `tab_item tab_item_${index}`
            return <div styleName={tab_item_style} key={index} onClick={() => this.tabHandler(item)}>
                {tab[item].name}
            </div>
        }

        let records_func = (item, index) => {
            let status;
            if (item.status == 0) {
                status = '预约中'
            } else if (item.status == 1) {
                status = '预约结束 '
            } else if (item.status == 2) {
                status = '已取消'
            }

            let cancelstyle = item.status == 2 ? styles['cancelstyle'] : styles['reserveItem']

            return <div className={cancelstyle} key={index}>
                {item.status == 0 &&
                    <div styleName="itemHeader">
                        <span styleName="icon-status icon-status0"></span>
                        <div styleName="statusText">
                            {status}<br />
                            <span
                                styleName="statusNum">{item.addRate == 0 ? `${item.loanRate}%` : `${item.loanRate}%+${item.addRate}%`}<span
                                    styleName="sprit">/</span>{item.repayPeriod}天</span>
                        </div>
                        {(!item.isFirstBid) && <div styleName="itemHeaderRight cancelBtn"
                            onClick={() => this.cancelReserveHandler(item.bookTime, item.id)}>
                            取消预约
                    </div>}
                    </div>}
                {item.status == 1 &&
                    <div styleName="itemHeader headerOver">
                        <span styleName="icon-status icon-status1"></span>
                        <div styleName="statusText">
                            {status}<br />
                            <span
                                styleName="statusNum">{item.addRate == 0 ? `${item.loanRate}%` : `${item.loanRate}%+${item.addRate}%`}<span
                                    styleName="sprit">/</span>{item.repayPeriod}天</span>
                        </div>
                    </div>}
                {item.status == 2 &&
                    <div styleName="itemHeader headerCancel">
                        <span styleName="icon-status icon-status2"></span>
                        <div styleName="statusText">
                            {status}<br />
                            <span
                                styleName="statusNum">{item.addRate == 0 ? `${item.loanRate}%` : `${item.loanRate}%+${item.addRate}%`}<span
                                    styleName="sprit">/</span>{item.repayPeriod}天</span>
                        </div>
                    </div>}
                <div styleName="infoContainer">
                    {item.status == 2 ? <div styleName="infoItem">
                        <div styleName="infoItemLeft">实际出借金额</div>
                        <div styleName="itemHeaderRight colorRed">￥{item.investAmt}</div>
                    </div> : <div styleName="infoItem">
                            <div styleName="infoItemLeft">预计利息(含加息工豆)</div>
                            <div styleName="itemHeaderRight colorRed">￥{item.interest}</div>
                        </div>}
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约金额</div>
                        <div styleName="itemHeaderRight colorRed">￥{item.bookInvestAmt}</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约时间</div>
                        <div styleName="itemHeaderRight">
                            {new Date(parseInt(item.bookTime)).toLocaleDateString().replace(/\//g, "-") + " " + new Date(parseInt(item.bookTime)).toTimeString().substr(0, 8)}
                        </div>
                    </div>
                    {item.status != 2 && <div styleName="infoItem">
                        <div styleName="infoItemLeft">预计还款时间</div>
                        <div styleName="itemHeaderRight">
                            {new Date(parseInt(item.paymentDate)).toLocaleDateString().replace(/\//g, "-") + new Date(parseInt(item.bookTime)).toTimeString().substr(0, 0)}
                        </div>
                    </div>}
                </div>
                {(item.status == 0 || item.status == 1) && <div styleName="infoItem infoProtocol">
                    <div styleName="infoItemLeft">预约协议</div>
                    <div styleName="itemHeaderRight"
                        onClick={() => this.lookProtocolHandler(item.contractType, item.id)}>
                        已签署<span styleName="arrow"></span>
                    </div>
                </div>}
            </div>
        }

        let tab_style = Browser.inIOSApp ? 'tabWrapperIos' : 'tabWrapper'

        // {/* backArrowHandler={() => NativeBridge.close()} */}
        // history={history}

        return <div styleName="recordsPanel">
            <Header title="我的预约" history={history} />
            <div styleName={tab_style}>
                {['0', '1', '2'].map(tab_func)}
            </div>
            <div styleName="textWrapper">
                {list.map(records_func)}
                {list.length == 0 && tab[type].page_no == 0 && no_records}
            </div>
        </div>
    }
}

export default ReserveRecords