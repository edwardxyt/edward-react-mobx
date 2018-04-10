import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils } from 'fw-javascripts'

import { Header } from '../../components'
import styles from '../../css/features/app-download.css'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})
class AppDownload extends React.Component {

    componentDidMount() {
        document.title = "金融工场 — 安全、专业、透明的综合性金融服务平台。"
        this.try_to_open_app_directly()
    }

    try_to_open_app_directly() {

        let appendIframe = src => {
            let iframe;
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = src;
            document.body.appendChild(iframe)
        }

        let q = Utils.hashQuery

        if (q.view) {

            let params = '?view=' + q.view
            if (q.id) params += '&id=' + q.id
            if (q.url) params += '&url=' + q.url

            try {
                appendIframe('jrgc://jrgc.com/openApp' + params)
                setTimeout(function () {
                    location.href = 'jrgc://jrgc.com/openApp' + params
                }, 300)
            } catch (e) { }
        }
    }

    render() {
        return <div styleName="bg">
            <img src={require("../../images/features/app-download/img_thumb.png")} />

            <br />
            <a href={"https://app.9888.cn/download/apk?t=" + +new Date()}>
                <img src={require("../../images/features/app-download/btn_android.png")} /></a>
            <br />
            <a href="https://itunes.apple.com/cn/app/jin-rong-gong-chang/id939125881?mt=8">
                <img src={require("../../images/features/app-download/btn_ios.png")} /></a>
            <br />

<div style={{display: 'none'}}>
{/* 合规期间, 隐藏不必要的内容 */}

            <div styleName="hr"></div>

            <img src={require("../../images/features/app-download/1.jpg")} />
            <div styleName="big-text">随手投资，小钱尽享高收益</div>
            <div styleName="small-text">100元起投，年化收益高达12%</div>

            <div styleName="hr"></div>

            <img src={require("../../images/features/app-download/2.jpg")} />
            <div styleName="big-text">邀亲友，一起分享财富</div>
            <div styleName="small-text">用工场码邀亲友注册、投资<br />双方均可获得高额返利</div>

            <div styleName="hr"></div>

            <img src={require("../../images/features/app-download/3.jpg")} />
            <div styleName="big-text">投资收益看得见，一键提现</div>
            <div styleName="small-text">随时查看余额、收益、回款、欠款等信息<br />更可以直接用手机提现</div>

            <div styleName="hr"></div>

            <img src={require("../../images/features/app-download/4.jpg")} />
            <div styleName="big-text">多重安全防控，投资更安心</div>
            <div styleName="small-text">实名认证、动态口令、手势密码、安全证书等<br />多种安全手段，确保资金和隐私安全</div>

            <div styleName="hr"></div>

            <a href="https://app.9888.cn/download/apk">
                <img src={require("../../images/features/app-download/btn_android.png")} /></a>

            <a href="https://itunes.apple.com/cn/app/jin-rong-gong-chang/id939125881?mt=8">
                <img src={require("../../images/features/app-download/btn_ios.png")} /></a>
</div>
            <div styleName="copyright">©2018 金融工场版权所有</div>
        </div>
    }
}

export default AppDownload