import React from 'react'
import CSSModules from 'react-css-modules'

import { NativeBridge,Browser } from '../../helpers'

import { Header } from '../../components'
import styles from '../../css/topic/invite.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Invite extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
     }

    shareLinkHandler = () => {
        //分享链接
        NativeBridge.trigger('shareLink', JSON.stringify({
            title: '快去注册！金融工场免费赠送200元投资礼包啦！',
            image: 'https://static.9888.cn/images/manager/share.jpg',
            link: 'https://m.9888.cn/mpwap/orderuser/toRegister.shtml',
            desc: '金融工场-中国领先的综合金融信息服务平台，回款提现免手续费。'
        }), true)
    }
    sharePicHandler = () => {
        //分享图片
        NativeBridge.trigger('shareImage', JSON.stringify({
            title: '快去注册！金融工场免费赠送200元投资礼包啦！',
            image: 'https://static.9888.cn/images/manager/share.jpg',
            link: 'https://m.9888.cn/mpwap/orderuser/toRegister.shtml',
            desc: '金融工场-中国领先的综合金融信息服务平台，回款提现免手续费。'
        }), true)
    }
    render() {

        return <div styleName="bg">
            <Header title="邀请返利" history={this.props.history} />

            <div styleName="top">
                <img src={require("../../images/topic/invite/top.png")} />
            </div>
            <div styleName="step">
                <div styleName="step-item">
                    <img src={require("../../images/topic/invite/step-one.png")} />
                    <div styleName="step-text">好友填写邀请码<br />
                        <span styleName="colorRed font28">成功注册</span>
                    </div>
                </div>
                <div styleName="step-item">
                    <img src={require("../../images/topic/invite/step-two.png")} />
                    <div styleName="step-text">好友15天内出借<br />
                        <span styleName="colorRed font28">满足升级条件</span></div>
                </div>
                <div styleName="step-item">
                    <img src={require("../../images/topic/invite/step-three.png")} />
                    <div styleName="step-text">邀请人立获<br />
                        <span styleName="colorRed font28">相应工豆奖励</span></div>
                </div>
            </div>
            <div styleName="earn-box">
                <img src={require("../../images/topic/invite/title-earn.png")} />
                <img src={require("../../images/topic/invite/content-earn.jpg")} />
                <div styleName="case-box">
                    好友注册后15天内（含注册当日），投资达到VIP1等级送50元，达到VIP2及以上等级，再送300元！
                    <br />
                    奖励以工豆形式实时发放，有效期30天。
                </div>
            </div>
            <div styleName="vip-box">
                <img src={require("../../images/topic/invite/title-invite.png")} styleName="title-invite" />
                <img src={require("../../images/topic/invite/title-vip.png")} styleName="vip-pic" />
                <div styleName="vip-text">
                    <div styleName="text-item">
                        邀请人获<br />
                        50元工豆
                    </div>
                    <div styleName="text-item">
                        邀请人获<br />
                        300元工豆
                    </div>
                    <div styleName="text-item">
                        邀请人获<br />
                        300元工豆
                    </div>
                    <div styleName="text-item">
                        邀请人获<br />
                        300元工豆
                    </div>
                </div>
            </div>
            <div styleName="mj-box">
                <div styleName="mj-text">
                    工豆会在好友注册后15天内(含注册当日)，根据<br />
                    好友当时达到的相应等级实时发放相应的工豆。
                </div>
                <a href="https://fore.9888.cn/cms/addhtml/2137.html">
                    <img src={require("../../images/topic/invite/xj.png")} styleName="mj-pic" />
                </a>
            </div>
            <div styleName="footer">
                <img src={require("../../images/topic/invite/footerbg.png")} />
            </div>
            {Browser.inJRGCApp && <div styleName="layer">
                <div styleName="layerLink" onClick={this.shareLinkHandler}>
                    <img src={require("../../images/topic/invite/link.png")} />
                    <div styleName="layerText">邀友链接</div>
                </div>
                <div styleName="layerLink" onClick={this.sharePicHandler}>
                    <img src={require("../../images/topic/invite/picture.png")} />
                    <div styleName="layerText">邀友图片</div>
                </div>
            </div>}
        </div>
    }
}

export default Invite