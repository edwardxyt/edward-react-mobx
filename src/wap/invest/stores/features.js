import {extendObservable} from 'mobx'
import { getJSONP } from 'fw-javascripts'

export default class Features{
    constructor(Get){
        this.Get = Get;
        this.data = {};
        extendObservable(this.data,{
            level_list: [],
            levelConfig: {},
            limitCount: '',
            limitDays: '',
            sendStore: '',
            firstInvestAmount: ''
        })
    }
    getDataHandler(){
        this.Get('/api/v1/upgrade-formula.shtml')
        .then(data => {
                this.data.levelConfig = data.levelConfig
                this.data.limitCount = data.limitCount
                this.data.limitDays = data.limitDays
                this.data.sendStore = data.sendStore
                this.data.firstInvestAmount = data.firstInvestAmount
        })
        getJSONP('https://www.gongchangzx.com/api/userLevel/v1/giftVO.json')
            .then(data => {
                if (data.code != 10000) throw new Error('接口异常, 无法获取用户等级信息');
                this.data.level_list = data.data.levelGiftRule
            })
    }
}