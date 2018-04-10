import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components'
import styles from '../../css/topic/zeng-jin-bao.css'


const TABS = [
    {
        text: '项目简介',
        pos: 172,
    }, {
        text: '资金安全',
        pos: 1920
    }, {
        text: '投资案例',
        pos: 2662
    }, {
        text: '合作机构',
        pos: 4196
    }, {
        text: '常见问题',
        pos: 4706
    },
]

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class ZengJinBao extends React.Component {

    state = {
        currentTab: 0
    }

    componentDidMount() {
        document.title="增金宝"
        window.addEventListener('scroll', this.scrollWatcher, false);
    }

    scrollWatcher = () => {
        let scrolled = document.documentElement.scrollTop + document.body.scrollTop,
            currentTab = 0;
        for (var i = 0; i < TABS.length; i++) {
            if (scrolled + 1 >= TABS[i].pos) {
                currentTab = i;
            } else {
                break
            }
        }
        this.setState({ currentTab: currentTab })

    }

    scrollToFragment = i => {
        window.scroll(0, TABS[i].pos)
    }

    render() {
        let { currentTab } = this.state;
        let genTabs = (t, i) => {
            let className = currentTab === i ? styles['tab-item--active'] : styles['tab-item'];
            return <div key={i} className={className}
                onClick={() => { this.scrollToFragment(i) }}>{t.text}</div>
        }

        return <div>
            {/*<Header noClose title="增金宝" history={this.props.history} />*/}

            <div styleName="banner">
                <img src={require('../../images/topic/zeng-jin-bao/banner.png')} />
            </div>

            <div styleName="tab-group">
                {TABS.map(genTabs)}
            </div>

            <div styleName="fragment product">
                <div styleName="fragment-title">项目简介</div>

                <div styleName="intro">
                    <div styleName="sub-title">什么是<span styleName="text--gold">增金宝?</span></div>
                    <div styleName="text--paragraph">
                        “增金宝”是金融工场向用户提供的一款黄金活期产品。用户持有该产品后可选择提金，也可选择变现，具有灵活买卖、每日支付收益等特点。用户申请购买黄金产品后，可以在服务时间内申请变现，进而实现赚取金价波动和年化双重收益。服务时间为周一至周五的 9：00-23：50（法定节假日除外），收益起算日为D+1日（D为购买日）。
                    </div>
                </div>

                <div styleName="advantages">
                    <div styleName="sub-title"><span styleName="text--gold">增金宝</span>的优势</div>
                    <ul styleName="advantages-list">
                        <li>期限灵活，<span styleName="text--red">提金or变现随时选</span></li>
                        <li>按日结算，收益日日增长</li>
                        <li>起购点低，<span styleName="text--red">1g即可起购</span></li>
                        <li>抵抗通胀，资产配置更优化</li>
                        <li>操作便捷，购金一键操作</li>
                    </ul>
                </div>

                <div styleName="comparison">
                    <div styleName="sub-title"><span styleName="text--gold">增金宝V.S尊享金</span></div>
                    <div styleName="text--paragraph">
                        增金宝在交易时间段内可以随时申请变现和提金，尊享金在约定期间不可提金和变现，约定期限结束后自动转为增金宝产品，用户可随时申请变现和提金; 尊享金产品和增金宝产品的收益率是有区别的；尊享金收益为黄金克重，增金宝收益为现金形式。
                    </div>
                </div>

                <div styleName="deal-process">
                    <div styleName="text--ribbon">交易流程</div>
                    <img src={require('../../images/topic/zeng-jin-bao/deal-process.png')} />
                </div>
            </div>

            <div styleName="fragment security">
                <div styleName="fragment-title">安全保障</div>
                <div styleName="ensure-card-1">
                    <div styleName="no">第一重</div>
                    <div styleName="card-title">运营保障</div>
                    <div styleName="description text--paragraph">
                        工场增金宝运营方专业团队提供全面服务保障，保证用户信息安全的同时，专属客服人员对接用户售后需求，提供专业的售后咨询服务。
                    </div>
                </div>
                <div styleName="ensure-card-2">
                    <div styleName="no">第二重</div>
                    <div styleName="card-title">实物保障</div>
                    <div styleName="description text--paragraph">
                        通过国家级黄金交易市场上海黄金交易所，为用户进行实物黄金原料采购，确保黄金全部符合国家标准规范。
                    </div>
                </div>
                <div styleName="ensure-card-3">
                    <div styleName="no">第三重</div>
                    <div styleName="card-title">物流保障</div>
                    <div styleName="description text--paragraph">
                        与国内知名、优质的物流公司合作，为用户提供黄金提货的寄送与全额保价服务幵投保物流险。
                    </div>
                </div>
            </div>

            <div styleName="fragment invest-case">
                <div styleName="fragment-title">投资案例</div>

                <div styleName="case-background">
                    <table>
                        <caption styleName="sub-title"><i></i>案例背景</caption>
                        <tbody>

                            <tr>
                                <th>客户</th>
                                <td>张女士</td>
                            </tr>
                            <tr>
                                <th>认购产品</th>
                                <td>增金宝A00000042</td>
                            </tr>
                            <tr>
                                <th>成交金价</th>
                                <td>279.00 元/克</td>
                            </tr>
                            <tr>
                                <th>购买克重</th>
                                <td>1.000 克</td>
                            </tr>
                            <tr>
                                <th>购金手续费</th>
                                <td>0.00 元</td>
                            </tr>
                            <tr>
                                <th>支付金额</th>
                                <td>279.00 元</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div styleName="case-income">
                    <div styleName="sub-title"><i></i>收益计算</div>
                    <div styleName="income-cal">
                        假设购买后第二天金价上浮为285元/克，张女士当日收益为<br />
                        <span styleName="income-ammount text--red">0.02 <span>元</span></span><br />
                        <span styleName="cal">
                            计算公式<br />
                            <span>当日存管黄金克重×年化收益率÷360天×当日交易截止时刻金价</span>
                        </span><br />
                        <span styleName="cal-formula text--blue">1* 2% / 360*285 = 0.02元</span>
                    </div>
                </div>

                <div styleName="purchase-process">
                    <div styleName="text--ribbon">购金流程</div>
                    <img src={require('../../images/topic/zeng-jin-bao/purchase-process.png')} />
                </div>
            </div>

            <div styleName="fragment partner">
                <div styleName="fragment-title">合作机构</div>

                <div styleName="sub-title text--gold">深圳市众瑞珠宝有限公司</div>
                <div styleName="text--paragraph">
                    深圳市众瑞珠宝有限公司于2012年2月成立，注册资本20000万元人民币，是一家集贵金属产品生产、定做、批发、零售为一体的企业。公司拥有专业的生产、销售团队，业务遍及深圳、北京、山东等多地，在深圳等地开设多家贵金属产品展厅，除一线城市外，公司亦积极开拓具发展潜力的二、三线城市，将公司之零售网络拓展至中国更多地方。
                </div>
            </div>

            <div styleName="fragment qa">
                <div styleName="fragment-title">常见问题</div>

                <div styleName="qa-item">
                    <div styleName="q text--blue">
                        <span styleName="q-no">1</span>增金宝产品有银行存管吗？
                    </div>
                    <div styleName="a text--paragraph">
                        增金宝产品目前没有银行存管，用户通过第三方支付机构完成交易资金的划付。为给用户提供更高标准的安全保障，目前工场尊享平台已与合作的存管银行开始着手对尊享金接入存管银行进行系统改造。
                    </div>
                </div>
                <div styleName="qa-item">
                    <div styleName="q text--blue">
                        <span styleName="q-no">2</span>增金宝产品为什么没有担保公司担保？
                    </div>
                    <div styleName="a text--paragraph">
                        增金宝产品是用户通过工场尊享平台向平台合作方深圳众瑞珠宝申请购买黄金产品并委托深圳众瑞珠宝进行管理以获取收益的一种交易方式，属于买卖法律关系而非借贷法律关系，因此无需担保公司担保。
                    </div>
                </div>
                <div styleName="qa-item">
                    <div styleName="q text--blue">
                        <span styleName="q-no">3</span>为何尊享金产品接入的是先锋支付，不是徽商银行存管？
                    </div>
                    <div styleName="a text--paragraph">
                        增金宝产品对接存管银行目前处于系统改造中，由于系统改造需要一定时间，在改造完成前，为了满足用户的需求，工场尊享将通过第三方支付机构完成用户交易资金的划付，待系统改造完成后，尊享金产品将第一时间接入存管银行，为用户交易资金提供更高标准的安全保障。
                    </div>
                </div>
                <div styleName="qa-item">
                    <div styleName="q text--blue">
                        <span styleName="q-no">4</span>如黄金出现下跌挤兑的情况，平台如何处理？
                    </div>
                    <div styleName="a text--paragraph">
                        黄金作为一款实物投资产品，金价会存在上下浮动现象，如金价下跌，用户购金后随时可选择通过继续持有黄金产品，并通过委托平台运营方继续提供黄金管理服务，待金价上涨后再申请变现或提金，最终实现黄金保值、增值。平台作为黄金交易信息发布方和技术服务方，将严格按照约定为用户提供交易安全保障。
                    </div>
                </div>
            </div>

            <div styleName="warning text--paragraph">
                风险揭示：增金宝实时参考上海黄金交易所价格，金价正常市场波动带来的收益或可能造成的损失，均由客户自行承担。市场有风险，购买须谨慎。
            </div>
        </div>
    }

}

export default ZengJinBao