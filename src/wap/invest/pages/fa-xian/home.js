import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { BannerGroup } from 'fw-components'

import { Header } from '../../components/'
import styles from '../../css/fa-xian/home.css'
import { NativeBridge } from '../../helpers'
import { Browser } from '../../helpers'

@inject('faxian')
@observer
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Home extends React.Component {

    state = {
        position_index: 0,
        position: 0
    }

    componentDidMount() {
        let { faxian } = this.props;

        faxian.getBannersHandler()
        faxian.getNoticeHandler().then(() => {
            this.startMovingNotice()
        })
    }

    componentWillUnmount() {
        clearInterval(this._time_gap)
    }

    gotoHandler = (link, need_login) => {
        if (link.indexOf('://') < 0) {
            link = location.protocol + '//' + location.hostname + link;
        }
        if (Browser.inApp) {
            NativeBridge.goto(link, need_login)
        } else {
            location.href = encodeURI(link);
        }
    }

    startMovingNotice = () => {
        let delay = 30, duration = 3000, step = 2, singleH = 36, p, position_index;
        let { notice } = this.props.faxian.data;
        this._time_gap = 0;

        let t = setInterval(() => {
            this._time_gap += delay;
            if (this._time_gap >= duration) {
                p = this.state.position - step, position_index = this.state.position_index;

                if (p <= -singleH * (this.state.position_index + 1)) {
                    this._time_gap = 0
                    p = Math.round(p / singleH) * singleH
                    position_index += 1
                }

                if (p <= -singleH * notice.length) {
                    this._time_gap = 0
                    p = 0
                    position_index = 0
                }
                this.setState({
                    position: p,
                    position_index: position_index
                })
            }
        }, delay)
    }

    onImageClickHandler = (index) => {
        let { banners } = this.props.faxian.data;
        let link = null;
        let bs = banners;
        for (let i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].url;
        }
        if (link) this.gotoHandler(link);
    }

    bdHandler = () => {
        if (this._count++ > 6)
            this.gotoHandler('https://m.9888.cn/static/test-native-bridge/index.html')
    }

    render() {
        let { banners, notice, topics, coupon_count } = this.props.faxian.data;
        let { position } = this.state;

        let topic = (t, index) => {
            return <a styleName="event" key={index}
                onClick={() => this.gotoHandler(t.url)}>
                <img src={t.img} />
            </a>
        }

        let banner_group;
        if (banners && banners.length > 0)
            banner_group = <BannerGroup styleName="banners"
                onImageClick={this.onImageClickHandler}
                images={banners.map(i => i.img)} />;

        let noticeFn = (item, index) => {
            return <a onClick={() => this.gotoHandler(item.url)} key={index}>{item.title}</a>
        }

        return <div styleName="home">
            <div styleName="findBanner">{banner_group}</div>

            <div styleName="notice">
                <img styleName="notice-icon" src={require("../../images/fa-xian/home/1.png")} />

                <div styleName="sp-line"></div>
                <div styleName="text">
                    <div styleName="text-scroll-panel" style={{ top: `${position}px` }}>
                        {notice.map(noticeFn)}
                        {notice[0] && noticeFn(notice[0])}
                    </div>
                </div>
                <i styleName="icon-right-arrow"></i>
            </div>

            <div styleName="channel">
                <a onClick={() => this.gotoHandler('https://m.9888.cn/static/wap/invest/index.html#/fa-xian/coupon', true)}>
                    <i styleName="icon icon-coupon"></i>
                    领券中心
                {coupon_count != "0" &&
                        <span styleName="coupon-count">{coupon_count}</span>}
                </a>

                <a onClick={() => this.gotoHandler("https://m.dougemall.com", true)}>
                    <i styleName="icon icon-mall"></i>豆哥商城 </a>

                <a onClick={() => this.gotoHandler("https://m.9888.cn/static/wap/faq/index.html")}>
                    <i styleName="icon icon-help"></i>帮助中心</a>

                <a onClick={() => this.gotoHandler("https://m.9888.cn/static/wap/topic-invest-school/index.html")}>
                    <i styleName="icon icon-xt"></i>网贷学堂</a>
            </div>

            <div styleName="title-recommended" onClick={this.bdHandler}>内容推荐</div>
            <div styleName="events">{topics.map(topic)}</div>
            <div styleName="contact-us">
                <a styleName="service" href="tel:4000322988">
                    <i styleName="icon-service"></i><span>联系客服</span></a>
                <a styleName="about-us" onClick={() => this.gotoHandler("https://m.9888.cn/static/wap/invest/index.html#/fa-xian/ourself")}>
                    <i styleName="icon-about-us"></i>
                    <span >关于我们</span>
                </a>
            </div>
        </div>
    }
}

export default Home