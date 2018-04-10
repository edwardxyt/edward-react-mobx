import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import * as FW from 'fw-javascripts'
import styles from '../../../css/fa-xian/coupon-singles.css'
import { NativeBridge } from '../../../helpers'

@inject('faxian')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore'  })
class CouponSingles extends React.Component {
    render() {
        let limitList = this.props.faxian.data.limitList
        if (!limitList || limitList.length == 0) return null;
        return <div styleName="list_box">
            <div styleName="list_box_title">
                <img styleName="icon_limit" src={require("../../../images/fa-xian/coupon-center/icon-limit.png")} />
                <span styleName="limit_title">限时抢购</span>
            </div>
            {limitList.map((limit, index) => <SinglesList item={limit} key={index} />)}
        </div>
    }
}

@inject('faxian')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore'  })
class SinglesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            receiveStatus: this.props.item.receiveStatus,
            surplus_seconds: null,
            pending: false
        }
    }

    componentDidMount() {
        // start counting down
        if (this.props.item.receiveStatus == "01") {
            this.setState({ surplus_seconds: this.props.item.intervalMilli })
            this.timer = setInterval(() => {
                if (this.state.surplus_seconds < 1) {
                    clearInterval(this.timer)
                    this.setState({ receiveStatus: '02' })
                    this.props.faxian.requestGiftList()
                } else {
                    this.setState({ surplus_seconds: this.state.surplus_seconds - 1 })
                }
            }, 1000)
        }
    }

    getHandler = (item) => {
        // 请求处理中, 不能重复点击
        if (this.state.pending) return;
        this.setState({ pending: true })
        item.isGet = "1";
        this.props.faxian.limitGetHandler(item).then(data => {
            FW.Components.showAlert(data.remainNumber)
            this.setState({ pending: false })
            this.props.faxian.requestGiftList()//用户点击后重新请求，改变数据
        }, () => {
            this.props.faxian.requestGiftList()//用户点击后重新请求，改变数据
        })
    }

    jump() {
        NativeBridge.toNative('app_coupon')
    }

    render() {
        let { receiveStatus, surplus_seconds } = this.state;
        let { item } = this.props;
        let day_number = "期限：>=" + item.limitTerm + "天"
        let day = item.limitTerm == "0" ? "任意期限可用" : day_number
        let content;
        let SVGCircleProgress = FW.Components.SVGCircleProgress
        let buy_func = (item) => {
            if (receiveStatus == "00") {
                content = <div>
                    <div styleName="content_title">开抢时间</div>
                    <div styleName="content_time"> {item.startTime.substr(-8)}</div>
                    <div styleName="content_state_gray">未开始</div>
                </div>
            } else if (receiveStatus == "01") {
                let time = surplus_seconds, min = parseInt(time / 60), sec = time % 60;
                sec = `0${sec}`.substr(-2)
                content = <div>
                    <div styleName="content_title">倒计时</div>
                    <div styleName="content_time">
                        {`${min}:${sec}`}
                    </div>
                    <div styleName="content_state_gray">领取</div>
                </div>
            } else if (receiveStatus == "02") {
                let remain_name = item.grapLimit == "0" ? "list_remain" : "list_remain list_remain_limit"
                content = <div styleName={remain_name} onClick={() => {
                    item.grapLimit == "0" ? this.getHandler(item) : this.jump()
                }}>
                    <SVGCircleProgress animate={true} bgColor={'#FC655A'} percent={100 - parseInt(item.restPercent)}
                        weight={4} radius={50} progressColor={"#eee"} padding={0} />
                    {item.grapLimit == "0" ? <a styleName="content_state_red">领取</a>
                        : <a styleName="content_state_red">去投资</a>
                    }
                    <div styleName="list_right_title">
                        剩余
                    </div>
                    <div styleName="list_right_starttime">
                        {item.restPercent}
                    </div>
                </div>
            }
            return content;

        }
        let list_type_style = (item.type == 2 ? styles['list-item-red-bg'] :
            (item.type == 5 ? styles['list-item-gold'] : styles['list_item'])
        )
        return <div className={list_type_style}>
            <div styleName="item_left">
                <div styleName="detail_left">
                    <div styleName="list_amount">
                        <span styleName="list_rmb">
                            {item.type == "1" ? "￥" : null}
                            {item.type == "2" ? "+" : null}
                        </span>
                        {item.amount}<span styleName="gold-unit">{item.type == "5" && "克"}</span>
                    </div>
                    <div styleName="list_name">
                        {item.type == "1" && "返现券"}
                        {item.type == "2" && "返息券"}
                        {item.type == "5" && "返金券"}
                    </div>
                </div>
                <div styleName="detail_right">
                    <div>
                        {item.type == "5" ? `满${item.limitAmount}克可用` : `满￥${item.limitAmount}可用`}
                    </div>
                    <div>{day}</div>
                    <div>有效期至{item.validPeriod}</div>
                </div>
            </div>
            <div styleName="item_right">
                {buy_func(item)}
            </div>
        </div>
    }
}

export default CouponSingles