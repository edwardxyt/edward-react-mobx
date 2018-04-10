import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/order/info.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

@inject('order')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Info extends React.Component {
    state = {}

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.order.fetchProduct()
    }

    reserveHandler = () => {
        let {history, order} = this.props
        order.fetchProduct().then(data => {
            history.push(`/order/apply?applyInvestClaimId=${order.applyInvestClaimId}`)
        })
    }

    render() {
        let {product} = this.props.order
        let {history} = this.props
        return <div styleName="infoPanel">
            <Header title="详情" history={history}/>
            <div styleName="section1">
                <div styleName="up">
                    <div styleName="number">{product.annualRate}<span styleName="percent">%</span></div>
                    <div styleName="des">预期年化利率</div>
                </div>
                <div styleName="down">
                    <div styleName="downItem downItem1">
                        <div styleName="downItemUp">{product.lockPeriod}天</div>
                        <div styleName="downItemDown">锁定期</div>
                    </div>
                    <div styleName="downItem downItem2">
                        <div styleName="downItemUp">{product.minInvest}元起</div>
                        <div styleName="downItemDown">单日限额{product.dayLimitInvestAmount}万元</div>
                    </div>
                    <div styleName="downItem">
                        <div styleName="downItemUp">{product.todaySurplusAmount}万元</div>
                        <div styleName="downItemDown">今日剩余额度</div>
                    </div>
                </div>
            </div>
            <div styleName="section2">
                <div styleName="item">
                    <div styleName="itemLeft">加入限制</div>
                    <div styleName="itemRight">单日投资限额：50万元，单人可投笔数：5单人限额10万元，退出后可再加入。</div>
                </div>
                <div styleName="item">
                    <div styleName="itemLeft">退出说明</div>
                    <div styleName="itemRight">锁定期内不可退出。<br/>用户可选择锁定期后自动退出或继续复投，自动退出即用户授权平台系统锁定期后自动发起债权转让申请，继续复投即用户授权平台系统在锁定期满后将回款(如有回款)本息自动匹配新的资产。
                    </div>
                </div>
                <div styleName="tips">
                    温馨提示：未能成功转让的债权需继续持有，通过预约宝匹配的资产期限最长为36个月
                </div>
            </div>

            <div styleName="section3">
                <div styleName="title">交易进度</div>
                <div styleName="flow">
                    <div styleName="circle circle1"></div>
                    <div styleName="circle circle2"></div>
                    <div styleName="circle circle3"></div>
                    <div styleName="line line1"></div>
                    <div styleName="line line2"></div>
                    <div styleName="line line3"></div>
                    <div styleName="text text1">债权匹配中</div>
                    <div styleName="text text2">进入锁定期</div>
                    <div styleName="text text3">到期</div>
                    <div styleName="text text4">不可退出</div>
                    <div styleName="text text5">不可退出</div>
                    <div styleName="text text6">预约</div>
                    <div styleName="text text7">5日内起息</div>
                    <div styleName="text text8">90天锁定期满</div>
                    <div styleName="text text9">自动退出</div>
                </div>
            </div>

            <div styleName="section4">
                <div styleName="title">产品详情</div>
                <div styleName="detail">
                    <div>出借的资金最快当日起息。当日利息次日计算。若排队5个自然日后未匹配资产，则终止匹配，需要重新发起。</div>
                    <div styleName="detailLine">出借资产：消费贷等优质资产</div>
                </div>

            </div>

            <div styleName="link">
                <div styleName="linkItem" onClick={() => history.push('/order/faq')}>
                    <div styleName="linkLeft">
                        <span styleName="iconLink iconFaq"></span>
                        <span styleName="linkText">常见问题</span>
                    </div>
                    <div styleName="linkRight"></div>
                </div>

                <div styleName="linkItem"
                     onClick={() => history.push(`/order/protocol?applyInvestClaimId=${this.props.order.applyInvestClaimId}`)}>
                    <div styleName="linkLeft">
                        <span styleName="iconLink iconPro"></span>
                        <span styleName="linkText">智存宝服务协议</span>
                    </div>
                    <div styleName="linkRight"></div>
                </div>
            </div>

            <div styleName="prompt">
                市场有风险<span styleName="gap"></span>出借需谨慎
            </div>

            <div styleName="orderBtnBg">
                {product.status === '1'
                    ? <div styleName="orderBtn" onClick={this.reserveHandler}>立即转入</div>
                    : <div styleName="orderBtn orderBtnGrey">今日额度已满，请明日再来</div>
                }

            </div>
        </div>
    }
}


export default Info