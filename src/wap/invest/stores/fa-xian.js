import {extendObservable} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class FaXian {

    constructor(Ajax, Post) {
        this.Ajax = Ajax
        this.Post = Post

        this.data = {}
        extendObservable(this.data, {
            notice: [],
            banners: [],
            topics: [],
            coupon_count: "",
            giftList: [],
            limitList: [],
            endList: []
        })
    }

    getBannersHandler = () => {
        let q = Utils.urlQuery
        this.Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e', id: q.banner_id || '30'},
            silence: true
        }).catch(data => {
            this.data.banners = data.map(i => ({url: i.url, img: i.thumb}))
        })

        this.Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e', id: q.topic_id || '31'},//31
            silence: true
        }).catch(data => {
            this.data.topics = data.map(i => ({url: i.url, img: i.thumb}))
        })

        // 领券中心张数接口
        this.Post('/api/v2/getCouponNum.shtml').then(data => {
            this.data.coupon_count = data.availableNum
        });
    }
    getNoticeHandler = () => {
        return this.Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e', id: '33'},
            silence: true
        }).catch(data => {
            this.data.notice = data;
        })
    }
    // 领券中心接口
    requestGiftList = () => {
        return this.Post('/api/v2/getCouponList.shtml')
            .then(data => {
                this.data.giftList = data.packageList
                this.data.limitList = data.couponAvailableList
                this.data.endList = data.couponEndList
                return {
                    giftList: this.data.giftList,
                    limitList: this.data.limitList,
                    endList: this.data.endList
                }
            })
    }
    limitGetHandler = (item) => {
        return this.Post('/api/v2/getCouponList.shtml')
            .then(data => {
                return this.Post('/api/v2/grabCoupon.shtml', {
                    code: item.code,
                    couponType: item.type,
                    couponToken: data.couponToken
                })
            })
    }

    giftPopHandler = (code) => {
        return this.Post('/api/v2/getCouponInfo.shtml', {code: code})
    }

    giftGitHandler = (item) => {
        return this.Post('/api/v2/getCouponList.shtml')
            .then(data => {
                return this.Post('/api/v2/grabCoupon.shtml', {
                    couponToken: data.couponToken,
                    code: item.code,
                    couponType: item.type
                })
            })
    }
}


