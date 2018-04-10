import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components'
import { NativeBridge } from '../../helpers'
import styles from '../../css/topic/score.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class Score extends React.Component {

    componentDidMount() { }

    gotoMall = () => {
        NativeBridge.trigger('redirectMall')
    }

    render() {

        return <div styleName="bg">
            <Header title="玩转工分" history={this.props.history} />

            <img styleName="banner-img" src={require("../../images/topic/score/banner.jpg")} />

            <div styleName="section">
                <div styleName="title">
                    <img src={require("../../images/topic/score/play-score-pig.png")} />
                    <span> 我要赚工分 </span>
                </div>
                <div styleName="text">工分是金融工场对用户的回馈奖励，可用于豆哥商城兑换商品等，兑换后扣减相应工分。</div>

                <table styleName="reward-table">
                    <tbody>
                        <tr styleName="th">
                            <td>奖励方式</td>
                            <td width="50%">奖励分值（分）</td>
                        </tr>
                        <tr>
                            <td>投资奖励</td>
                            <td>年化投资额<span styleName="remark">1</span></td>
                        </tr>
                        <tr>
                            <td>每日签到奖励</td>
                            <td>2分</td>
                        </tr>
                        <tr>
                            <td>连续签到7天奖励</td>
                            <td>10分</td>
                        </tr>
                        <tr>
                            <td>活动奖励</td>
                            <td>根据具体活动奖励</td>
                        </tr>
                    </tbody>
                </table>
                <div styleName="summary">
                    <span styleName="remark">1</span>
                    <span>年化投资额=投资额*投资天数/360。<br />
                        投资按月/季等额还款项目，最终奖励工分需要乘以0.56。0.56为借款方占用投资方的资金使用率。
                    </span>
                </div>
            </div>


            <div styleName="section">
                <div styleName="title">
                    <img src={require("../../images/topic/score/play-score-box.png")} />
                    <span> 我要用工分 </span>
                </div>

                <div styleName="products">
                    <div styleName="product">
                        <img src="https://m.9888.cn/mpwap/img/play-score-img1.jpg" />
                        <div styleName="name">6S 64G<span>(每天10部)</span></div>
                        <div styleName="score">2000000工分</div>
                    </div>
                    <div styleName="product">
                        <img src="https://m.9888.cn/mpwap/img/play-score-img2.jpg" />
                        <div styleName="name">50元返现券<span>(每天20张)</span></div>
                        <div styleName="score">12500工分</div>
                    </div>
                    <div styleName="product">
                        <img src="https://m.9888.cn/mpwap/img/play-score-img3.jpg" />
                        <div styleName="name">抱枕毯<span>(每天20个)</span></div>
                        <div styleName="score">22000工分</div>
                    </div>
                    <div styleName="product">
                        <img src="https://m.9888.cn/mpwap/img/play-score-img4.jpg" />
                        <div styleName="name">超人豆哥<span>(每天20个)</span></div>
                        <div styleName="score">11000工分</div>
                    </div>
                </div>

                <a styleName="btn-mall" onClick={this.gotoMall}>
                    <img src={require("../../images/topic/score/play-score-btn.png")} />
                </a>
            </div>


            <div styleName="section">
                <div styleName="title">
                    <img src={require("../../images/topic/score/play-score-bean.png")} />
                    <span> 豆哥答疑 </span>
                </div>
                <div styleName="question">
                    <div styleName="q">Q1：债权转让、机构标能获得工分么？</div>
                    <div styleName="a">A1：不可以</div>
                    <div styleName="q">Q2：工分什么时候生效？会失效么？</div>
                    <div styleName="a">A2：获取奖励工分后即时生效。工分奖励自工分获取后的12个自然月失效。</div>
                    <div styleName="q">Q3：工分去哪花啊？</div>
                    <div styleName="a">A3：当然是<a onClick={this.gotoMall}>工豆商城</a>啊。</div>
                    <div styleName="q">Q4：为什么获取不到奖励工分？</div>
                    <div styleName="a">A4：请查看我的工场，工分账户是否存在禁用状态。</div>
                </div>
            </div>

            <div styleName="section">
                <div styleName="title">
                    <img src={require("../../images/topic/score/play-score-book.png")} />
                    <span> 注意事项 </span>
                </div>
                <div styleName="text">
                    <div>1、对于涉嫌违规操作的用户，一经发现，金融工场有权禁用该用户，禁用后无法正常使用、获取奖励工分。</div>
                    <div>2、工分相关的最终解释权归金融工场所有。</div>
                </div>
            </div>

            <div styleName="apple-limit">声明：以上活动由金融工场主办 与Apple Inc. 无关</div>
        </div>
    }
}

export default Score