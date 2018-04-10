import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'
import AGENT from '../agents/current.js'

export default class Current {
    constructor() {
        this.data = {}

        extendObservable(this.data, {
            inflowAmount: '',
            outflowAmount: '',
            inflowInfo: {},
            outflowInfo: {},
            records: {
                type: '0',
                tab: {
                    '0': {name: '全部', page_no: 1, list: []},
                    '1': {name: '转入', page_no: 1, list: []},
                    '2': {name: '转出', page_no: 1, list: []},
                    '3': {name: '收益', page_no: 1, list: []}
                }
            }
        })
    }

    fetchProduct = () => {
        return AGENT.detail()
    }


    fetchInflowInfo = () => {
        AGENT.transferInPageInfo()
            .then(data => {
                this.data.inflowInfo = {
                    maxAmount: data.maxAmount,
                    cashBalance: data.cashBalance,
                    amount: data.amount,
                    minAmount: data.minAmount,
                    prdId: data.prdId
                }
            })
    }

    fetchOutflowInfo = () => {
        AGENT.transferOutPageInfo()
            .then(data => {
                this.data.outflowInfo = {
                    allAmount: data.allAmount,
                    prdId: data.prdId,
                    dayRedeemMaxAmount: data.dayRedeemMaxAmount
                }
            })
    }

    fetchAssets = () => {
        return AGENT.profid()
    }

    submitInflow = () => {
        return AGENT.transferIn(this.data.inflowAmount, this.data.inflowInfo.prdId)
    }

    submitOutflow = () => {
        return AGENT.transferOut(this.data.outflowAmount)
    }

    fetchRecords = (done) => {
        let {tab, type} = this.data.records, current_tab = tab[type]
        if (current_tab.page_no === 0) return done && done();
        if (current_tab.page_no == 1) current_tab.list.splice(0, current_tab.list.length)
        AGENT.records(current_tab.page_no++, `0${type}`)
            .then(data => {
                current_tab.list.push(...data.pageData.result)
                if (current_tab.page_no >= data.pageData.pagination.totalPage)
                    current_tab.page_no = 0;
                done && done();
            })
    }

    resetPageNo = () => {
        let {tab, type} = this.data.records, current_tab = tab[type]
        current_tab.page_no = 1
    }

    resetType = type => {
        this.data.records.type = type;
        this.fetchRecords()
    }

    setFormData = (field, value, type) => {
        this[type][field] = value
    }
}