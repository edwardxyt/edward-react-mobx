import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/current/product.css'
import {Utils, Event, Components} from 'fw-javascripts'

@inject('current')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Product extends React.Component {
    state = {
        productInfo: {}
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.current.fetchProduct().then(data => {
            this.setState({
                productInfo: {
                    annualRate: data.annualRate,
                    productId: data.ddProductId,
                    lastProfit: data.lastProfit,
                    lockPeriod: data.lockPeriod,
                    profitByTenThousand: data.profitByTenThousand,
                    totalInteret: data.totalInteret,
                    totalMoney: data.totalMoney
                }
            })
        })
    }

    render() {
        let history = this.props.history
        let {productInfo} = this.state
        let banner_section = () => {
            return <div styleName="banner">
                <div styleName="top">
                    <div>总资产(元)</div>
                    <div styleName="total">{productInfo.totalMoney}</div>
                    <div>昨日收益<span styleName="rewards">{productInfo.lastProfit}</span>元</div>
                </div>
                <div styleName="down">
                    <div styleName="downItem">
                        <div>预期年化利率</div>
                        <div styleName="itemDown">{productInfo.annualRate}%</div>
                    </div>
                    <div styleName="downItem">
                        <div>预期万元收益(元)</div>
                        <div styleName="itemDown">{productInfo.profitByTenThousand}</div>
                    </div>
                    <div styleName="downItem">
                        <div>累计收益(元)</div>
                        <div styleName="itemDown">{productInfo.totalInteret}</div>
                    </div>
                </div>
            </div>
        }
        let step_section = () => {
            return <div styleName="step">
                <div styleName="stepItem">
                    <img src={require("../../images/current/icon-step1.png")}/>
                    <div styleName="stepDown">100元起投</div>
                </div>
                <div styleName="stepItem">
                    <img src={require("../../images/current/icon-step2.png")}/>
                    <div styleName="stepDown">日复利计息</div>
                </div>
                <div styleName="stepItem">
                    <img src={require("../../images/current/icon-step3.png")}/>
                    <div styleName="stepDown">转出灵活</div>
                </div>
                <div styleName="stepItem">
                    <img src={require("../../images/current/icon-step3.png")}/>
                    <div styleName="stepDown">分散风险</div>
                </div>
            </div>
        }
        let ruler_section = () => {
            return <div styleName="ruler">
                <div styleName="rulerTitle">交易规则</div>
                <div styleName="rulerText">
                    <div styleName="pic">
                        <span styleName="pot"></span>
                        <span styleName="line1"></span>
                        <span styleName="pot"></span>
                        <span styleName="line2"></span>
                        <span styleName="pot"></span>
                    </div>
                    <div styleName="des">
                        <div styleName="desItem desItem1">开始转入</div>
                        <div styleName="desItem desItem2">{productInfo.lockPeriod}天</div>
                        <div styleName="desItem desItem3">随时转出</div>
                    </div>
                    <div styleName="lockDate">
                        <span styleName="iconLock"></span>
                        <span styleName="iconText">锁定期</span>
                    </div>
                    <div styleName="freeDate">
                        <span styleName="iconFree"></span>
                        <span styleName="iconText">自由转让期</span>
                    </div>
                    <div styleName="des1">不可转让债权</div>
                    <div styleName="des2">转出免手续费</div>
                </div>
            </div>
        }
        let detail_section = () => {
            return <div styleName="detail">
                <div styleName="detailTitle">产品详情</div>
                <div styleName="detailText">
                    <div styleName="detailSubtitle">产品介绍</div>
                    <div>
                        智存宝一款智能出借工具，通过将用户出借资金与借款项目进行实时撮合匹配交易，为用户提供便利、快捷的出借体验。出借用户通过授权自动投标形成债权而产生利息，在有资金流动性需求时，可通过发起债权转让的方式申请退出。
                    </div>
                    <div styleName="detailSubtitle">收益规则</div>
                    <div>
                        起息后，会按照日复利方式计息，实际收益以到账收益为准。通过智能匹配的项目到期后，若您未申请转让，则系统将资金进行本息复投，持续为您产生收益。
                    </div>
                </div>
                <div styleName="learnMore">
                    <span>了解详情</span>
                    <span styleName="iconArrow"></span>
                </div>
            </div>
        }
        let links_section = () => {
            return <div styleName="links">
                <div styleName="linksItem" onClick={() => history.push('/current/faq')}>
                    <div styleName="linksLeft">
                        <span styleName="iconFaq"></span>
                        <span styleName="iconText">常见问题</span>
                    </div>
                    <div styleName="linksRight"></div>
                </div>
                <div styleName="linksItem">
                    <div styleName="linksLeft">
                        <span styleName="iconPro"></span>
                        <span styleName="iconText">智存宝服务协议</span>
                    </div>
                    <div styleName="linksRight"></div>
                </div>
            </div>
        }
        let tips_section = () => {
            return <div styleName="tips">
                市场有风险 投资需谨慎
            </div>
        }
        let bottom_section = () => {
            return <div styleName="bottom">
                <div styleName="bText">立即转入</div>
            </div>
        }
        return <div styleName="productBg">
            <Header title="智存宝"/>
            {banner_section()}
            {step_section()}
            {ruler_section()}
            {detail_section()}
            {links_section()}
            {tips_section()}
            {bottom_section()}
        </div>
    }
}

export default Product