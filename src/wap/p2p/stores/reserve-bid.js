import {extendObservable, computed} from 'mobx'
import {Utils} from 'fw-javascripts'

export default class ReserveBid {
    constructor(Post) {
        this.Post = Post
        this.bid_data = {}
        this.records = {}

        extendObservable(this.records, {
            type: '0',
            tab: {
                '0': {name: '预约中', page_no: 1, list: []},
                '1': {name: '预约结束', page_no: 1, list: []},
                '2': {name: '已取消', page_no: 1, list: []},
            }
        })

        extendObservable(this.bid_data, {
            context: {
                avgLoanPeriod: '',//平均起息时间
                bookValidPeriod: '-',//预约有效期
                id: null,//预约标id
                loadRate: '-',//利率
                minAmt: '',//最小预约额
                repayPeriod: '-',//期限
                valueTime: '',//预计起息时间
                startTime: '',//抢购时间
                paymentTime: '',//预计到期时间
                addRate: ''
            },
            accountAmount: null,//可用余额
            isRisk: 0,//是不是进行风险评估：0-为评估 1-已评估
            batchMaxmum: null,//批量投资限额
            reserveMoney: '',//用户输入的预约金额
            isChecked: true,
            contractMsg: '',
            isCompany: null,
            bidList: [],
            bids: []
        })
    }

    @computed
    get applyInvestClaimId() {
        return Utils.hashQuery.applyInvestClaimId
    }

    fetchProduct = () => {
        // let claimId = id ? id : this.applyInvestClaimId
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            this.bid_data.context = data.appointClaim;
            this.bid_data.accountAmount = data.accountAmount;
            this.bid_data.isRisk = data.isRisk;
            this.bid_data.batchMaxmum = data.batchMaxmum
            this.bid_data.minAmt = data.appointClaim.minAmt
            this.bid_data.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            this.bid_data.isCompany = data.isCompany

            let mix_bids = data.appointClaimList || []
            mix_bids.push(data.appointClaim)

            this.bid_data.bids = mix_bids
            return {
                isRisk: this.bid_data.isRisk,
                batchMaxmum: this.bid_data.batchMaxmum,
                isCompany: this.bid_data.isCompany,
            }
        })
    }

    resetPageNo = () => {
        let {tab, type} = this.records, current_tab = tab[type]
        current_tab.page_no = 1
    }

    setRecordsCurrentStatus = status => {
        this.records.type = status;
        this.getReserveList()
    }

    getReserveList = (done) => {
        let {tab, type} = this.records, current_tab = tab[type]
        if (current_tab.page_no === 0) return done && done();
        const PAGE_SIZE = 10

        if (current_tab.page_no == 1) current_tab.list.splice(0, current_tab.list.length)
        this.Post('/api/v1/appointRecordList.shtml', {
            page: current_tab.page_no++,
            pageSize: PAGE_SIZE,
            status: type
        }, {loading: false}).then(data => {
            current_tab.list.push(...data.pageData.result)

            if (current_tab.page_no >= data.pageData.pagination.totalPage)
                current_tab.page_no = 0;

            done && done();
        })

    }

    submitReserveHandler = (id) => {
        let claimId = id ? id : this.applyInvestClaimId
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: claimId
        }).then((data) => {
            return this.Post('/api/v1/investAppoint.shtml', {
                applyAmt: this.bid_data.reserveMoney,
                applyInvestClaimId: claimId,
                bookInvestToken: data.bookInvestToken,
                couponId: ""
            })
        })
    }

    cancelHandler = (id) => {
        return this.Post('/api/v1/cancelAppoint.shtml', {
            applyId: id
        })
    }

    getContractHandler = () => {
        return this.Post('/api/v1/appointContractMess.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            this.bid_data.contractMsg = data.contractMsg
            return {
                contractMsg: this.bid_data.contractMsg
            }
        })
    }

    //获取聚合页标的列表
    fetchBidList = () => {
        this.Post('/api/v2/appointInvestList.shtml').then(data => {
            this.bid_data.bidList = data.appointClaimList
        })
    }

    setFormData = (field, value, type) => {
        this[type][field] = value
    }
}