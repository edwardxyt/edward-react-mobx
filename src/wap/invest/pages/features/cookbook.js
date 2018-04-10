import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../components'
import { NativeBridge, Browser } from '../../helpers'
import styles from '../../css/features/cookbook.css'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})
class Cookbook extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
    }

    registerHandler = () => {
        if (Browser.inApp) {
            NativeBridge.toNative('app_register')
        } else {
            location.href = 'https://passport.9888.cn/pp-web2/register/phone.do?sourceSite=jrgc'
        }
    }

    render() {
        return <div styleName="bg">
            <Header title="玩赚攻略" history={this.props.history} />

            <img src={require("../../images/features/cookbook/1.png")} />
            <div styleName="summary">
                金融工场，品牌创立于2012年，是中国领先的综合金融信息服务平台。平台以金融全球化趋势为契机，融合信息技术创新手段，秉承安全、专业、透明的经营理念，为用户提供多样化高效智能的金融产品，为企业和个人提供定制化金融服务解决方案。平台在交易品种与交易组织模式上持续创新，优化金融资产配置，提供多样花金融产品，让每个用户都能平等、轻松、高效地享受互联网金融服务，享有高品质金融生活。
            </div>

            <img src={require("../../images/features/cookbook/2.png")} />

            <div styleName="section">
                <div styleName="tips">
                    新工友注册好福利
                    <div styleName="cover"></div>
                </div>
                <a styleName="link"
                    href="https://www.9888.cn/cms/addhtml/2078.html?reloadworkpage=y">完整新手秘笈 &gt; </a>
                <div styleName="text-1-1">
                    注册即送200元返现券礼包
                </div>
                <img src={require("../../images/features/cookbook/3.png")} />

                <img onClick={this.registerHandler}
                    src={require("../../images/features/cookbook/4.png")} />

                <div styleName="text">
                    <div styleName="text-title">如何才能正确的投资赚更多的钱呢？</div>
                    <div>
                        好友注册后15天内（含注册当日），投资达到VIP1等级送50元，达到VIP2及以上等级，再送300元！ 奖励以工豆形式实时发放，有效期30天
                        </div>
                </div>
            </div>

            <div styleName="section">
                <div styleName="tips">
                    邀请好友礼上礼
                            <div styleName="cover"></div>
                </div>
                <a styleName="link"
                    href="https://www.9888.cn/cms/addhtml/2078.html?reloadworkpage=y">完整邀友返利攻略 &gt;</a>
                <img src={require("../../images/features/cookbook/5.png")} />

                <div styleName="text">
                    <div>温馨提示：</div>
                    <div>工豆会在好友注册后15天内（含注册当日），根据好友当时到达的相应等级实时发放相应的工豆。</div>
                </div>
            </div>

            <div styleName="section">
                <div styleName="tips">VIP会员，享专属特权
                             <div styleName="cover"></div>
                </div>
                <img src={require("../../images/features/cookbook/6.png")} />

                <div styleName="text">
                    <div>根据会员贡献值不同，工友将荣升为不同的VIP等级，级别越高享有的权益越多哦~~</div>
                    <div>贡献值包括投资贡献值和邀友贡献值。</div>
                    <div>还不明白，豆哥这里还有更详细的哦，
            <a href="https://m.9888.cn/static/wap/invest/index.html#/features/vip-prerogative">查看升级攻略 &gt;</a>
                    </div>
                </div>
            </div>

            <div styleName="section">
                <div styleName="tips">豆哥商城免费换豪礼 <div styleName="cover"></div>
                </div>
                <img src={require("../../images/features/cookbook/7.png")} />

                <div styleName="text">
                    <div>去豆哥商城兑换前，别忘了赚工分哦~~</div>
                    <div>工分是金融工场给工友的回馈奖励，签到、投资、参加论坛活动都能领取哦~~，在豆哥商城兑换后扣减相应工分。</div>
                    <div>更详细的赚工分秘笈在这里，<a href="/static/wap/topic-score/index.html">点击查看 &gt;</a></div>
                </div>
            </div>

            <div styleName="section">
                <div styleName="tips">投资好伙伴，有他们赚更多 <div styleName="cover"></div>
                </div>
                <img src={require("../../images/features/cookbook/8.png")} />

                <div styleName="text">
                    <div>返现券和返息券可同时使用哦，千万别忘选啦！</div>
                    <div>返息券的额外收益是以工豆形式发放；且投资灵活收益项目，使用返息券后仅发锁定天数内产生的额外收益~</div>
                    <div>好伙伴们都有一定的有效期，请尽快使用呢~</div>
                </div>
            </div>

            <img src={require("../../images/features/cookbook/9.png")} />
        </div>
    }
}

export default Cookbook