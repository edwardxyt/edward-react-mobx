import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../../css/topic/huang-jin.css'

@CSSModules(styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class HuangJin extends React.Component {
    state = {
        num: 0,
        isTop: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll = (e) => {
        let top = document.body.scrollTop
        // if (top > 233) {
        //     this.setState({isTop: true})
        // } else {
        //     this.setState({isTop: false})
        // }
        if (top < 1800) {
            this.setState({num: 0})
        } else if (top < 2650) {
            this.setState({num: 1})
        } else if (top < 4100) {
            this.setState({num: 2})
        } else if (top < 4275) {
            this.setState({num: 3})
        } else {
            this.setState({num: 4})
        }
    }

    tabToggleHanler = (index) => {
        let jump_func = (index) => {
            this.setState({num: index})
        }
        if (index == 0) {
            jump_func(index)
            window.scrollTo(0, 233)
        } else if (index == 1) {
            jump_func(index)
            window.scrollTo(0, 1800)
        } else if (index == 2) {
            jump_func(index)
            window.scrollTo(0, 2650)
        } else if (index == 3) {
            jump_func(index)
            window.scrollTo(0, 4100)
        } else if (index == 4) {
            jump_func(index)
            window.scrollTo(0, 4275)
        }
    }

    render() {
        let {isTop} = this.state
        let top_style = isTop ? styles['gold-tab-top'] : styles['gold-tab']
        return <div styleName="gold-box">
            <img src={require('../../images/topic/topic-huang-jin/goldbanner.jpg')} styleName="gold-banner"/>
            <div styleName="gold-tab-top">
                {["项目简介", "资金安全", "投资案例", "合作机构", "常见问题"].map((item, index) => {
                    let active_style = this.state.num == index && styles['item-active']
                    return <div styleName="gold-tab-item" key={index} onClick={() => this.tabToggleHanler(index)}>
                        <div className={active_style}>{item}</div>
                    </div>
                })}
            </div>
            <div styleName="gold-intro">
                <div styleName="gold-title">
                    项目说明
                </div>
                <div styleName="intro-box">
                    <div styleName="gold-subtitle">什么是<span styleName="font-yellow">尊享金？</span></div>
                    <div styleName="intro-text">
                        尊享金是指由深圳市众瑞珠宝有限公司作为黄金项目运营方为平台用户提供的黄金销售服
                        务，同时接受用户委托，灵活运用其在黄金行业上下游资源，在用户购买黄金后自主选择的委托服务期限内，以一定方式管理用户所购黄金，协助购金用户实现实物黄金赚收益的目的，最终实现黄金保值、增值。
                    </div>
                </div>
                <div styleName="advange-box">
                    <div styleName="gold-subtitle">尊享金<span styleName="font-yellow">的优势</span></div>
                    <div styleName="advange-text">
                        <div><span styleName="icon-circle"></span>
                            期限丰富多样，目前<span styleName="font-red">以70天和100天为主</span>
                        </div>
                        <div>
                            <span styleName="icon-circle"></span>
                            到期自动转为期限灵活的黄金产品管理服务，用户可在交<span styleName="space">易时间内随时申请提金或申请回购黄金</span>
                        </div>
                        <div>
                            <span styleName="icon-circle"></span>
                            起贩克重起点低，<span styleName="font-red">1克即可</span>
                        </div>
                        <div>
                            <span styleName="icon-circle"></span>
                            利于抵抗通货膨胀，优化个人资产配置
                        </div>
                    </div>
                </div>
                <div styleName="gold-title">
                    交易流程
                </div>
                <div styleName="flow-box">

                </div>
                <div styleName="gold-title">
                    项目特点
                </div>
                <div styleName="features-box">
                    <img src={require("../../images/topic/topic-huang-jin/features.png")} styleName="features-pic"/>
                    <div styleName="features-text">
                        <div styleName="text-item">
                            <div styleName="item-up">操作便捷</div>
                            <div styleName="item-down">轻松购金</div>
                        </div>
                        <div styleName="text-item">
                            <div styleName="item-up">期限较短</div>
                            <div styleName="item-down">灵活储备</div>
                        </div>
                        <div styleName="text-item">
                            <div styleName="item-up">多重保障</div>
                            <div styleName="item-down">收益可观</div>
                        </div>
                    </div>
                </div>
            </div>
            <div styleName="gold-safe">
                <div styleName="gold-title">
                    项目安全
                </div>
                <div styleName="safe-box">
                    <div styleName="safe-item">
                        <div styleName="safe-item-left safe-item-left1"></div>
                        <div styleName="safe-item-right safe-item-right1">
                            <div styleName="right-line1"><span styleName="icon-cachet">第一重</span>运营保障</div>
                            <div styleName="right-line2">工场尊享金运营方专业团队提供全面服务保障，保证用户信息安全的同时， 专属客服人员对接用户售后需求，提供专业的售后咨询服务。
                            </div>
                        </div>
                    </div>
                    <div styleName="safe-item">
                        <div styleName="safe-item-left safe-item-left2"></div>
                        <div styleName="safe-item-right">
                            <div styleName="right-line1"><span styleName="icon-cachet">第二重</span>实物保障</div>
                            <div styleName="right-line2">通过国家级黄金交易市场上海黄金交易所，为用户进行实物黄金原料采购， 确保黄金全部符合国家标准规范。
                            </div>
                        </div>
                    </div>
                    <div styleName="safe-item">
                        <div styleName="safe-item-left safe-item-left3"></div>
                        <div styleName="safe-item-right">
                            <div styleName="right-line1"><span styleName="icon-cachet">第三重</span>物流保障</div>
                            <div styleName="right-line2">与国内知名、优质的物流公司合作，为用户提供黄金提货的寄送与全额保价服务并投保物流险。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div styleName="gold-case">
                <div styleName="gold-title">
                    投资案例
                </div>
                <div styleName="case-box">
                    <div styleName="case1-box">
                        <div styleName="case1-title">
                            <span styleName="icon-case"></span>
                            <span styleName="title-name">案例背景</span>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">客户</div>
                            <div styleName="case1-text-right">张女士</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">认购产品</div>
                            <div styleName="case1-text-right">尊享金A00000042</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">成交金价</div>
                            <div styleName="case1-text-right">274.50元/克</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">购买克重</div>
                            <div styleName="case1-text-right">10.000克</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">预期收益克重</div>
                            <div styleName="case1-text-right">0.125克</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">收益起算日</div>
                            <div styleName="case1-text-right">2017年8月14日</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">委托管理服务到期日</div>
                            <div styleName="case1-text-right">2017年11月22日</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">预期收益期限</div>
                            <div styleName="case1-text-right">2017年8月14日-2017年11月22日</div>
                        </div>
                        <div styleName="case1-text">
                            <div styleName="case1-text-left">收益支付方式</div>
                            <div styleName="case1-text-right">已购黄金及收益克重到期一次性交付</div>
                        </div>
                    </div>
                    <div styleName="case2-box">
                        <div styleName="case1-title">
                            <span styleName="icon-cal"></span>
                            <span styleName="title-name">计算收益</span>
                        </div>
                        <div styleName="case2-text">
                            <div styleName="case2-line1">到期后，李女士一共可以拿到已购黄金及收益克重合计为</div>
                            <div styleName="case2-line2">10.125<span styleName="gold-unit">克</span></div>
                            <div styleName="case2-line3">计算公式</div>
                            <div styleName="case2-line4">10+10*(4.5/100*100/360)=10.125克</div>
                        </div>
                    </div>
                </div>
                <div styleName="gold-title">
                    购金流程
                </div>
                <div styleName="step-box"></div>
            </div>
            <div styleName="gold-cor">
                <div styleName="gold-title">
                    合作机构
                </div>
                <div styleName="cor-text">
                    <div styleName="cor-name font-yellow">深圳市众瑞珠宝有限公司</div>
                    <div>深圳市众瑞珠宝有限公司于2012年2月成立，注册资本20000万元人民币，是一家集贵金属产品生产、定做、批发、零售为一体的企业。公司拥有专业的生产、销售团队，业务
                        遍及深圳、北京、山东等多地，在深圳等地开设多家贵金属产品展厅，除一线城市外，公司 亦积极开拓具发展潜力的二、三线城市，将公司之零售网络拓展至中国更多地方。
                    </div>
                </div>
            </div>
            <div styleName="gold-faq">
                <div styleName="gold-title">
                    常见问题
                </div>
                <div styleName="faq-box">
                    <div styleName="faq-item">
                        <div styleName="faq-item-q">
                            <span styleName="icon-faq">1</span>
                            <span styleName="q-text">尊享金产品为什么没有担保公司担保?</span>
                        </div>
                        <div styleName="faq-item-a">
                            尊享金产品是用户通过工场尊享平台向平台合作方深圳众瑞珠宝申请购买黄金产品并委托 深圳众瑞珠宝进行管理以获取收益的一种交易方式，属于买卖法律关系而非借贷法律关系，因此无需担保公司担保。
                        </div>
                    </div>
                    <div styleName="faq-item">
                        <div styleName="faq-item-q">
                            <span styleName="icon-faq">2</span>
                            <span styleName="q-text">如黄金出现下跌挤兑的情况，平台如何处理?</span>
                        </div>
                        <div styleName="faq-item-a">
                            黄金作为一款实物投资产品，金价会存在上下浮动现象，用户购金幵在委托管理服务期限届
                            满后，如金价下跌，用户可选择通过继续持有黄金产品，并通过委托平台运营方继续提供黄金管理服务，待金价上涨后再申请变现或提金，最终实现黄金保值、增值。平台作为黄金交易信息发布方和技术服务方，将严格按照约定为用户提供交易安全保障。
                        </div>
                    </div>
                </div>
            </div>
            <div styleName="gold-tips">
                <div styleName="tips-text">风险揭示：工场尊享金项目的黄金定价标准实时参考上海黄金交易所
                    价格，由于金价下跌造成的损失， 需由用户自行承担。市场有风险，
                    购买需谨慎。
                </div>
            </div>
        </div>
    }
}

export default HuangJin
