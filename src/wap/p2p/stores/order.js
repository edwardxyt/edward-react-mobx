import { extendObservable, computed } from 'mobx'
import { Components, Utils, Event } from 'fw-javascripts'

export default class Order {
    constructor(Post) {
        this.Post = Post
        extendObservable(this, {
            product: {},
            orderMoney: '',
            user: {},
            dateMethod: null,
            contractMsg: '',
            tab: 1,
            records: [],
            pageNo: 1,
            bidList: [],
            recordsDetail: {},
            recordsResult: [],
            totalCount: ''
        })
    }

    @computed
    get applyInvestClaimId() {
        return Utils.hashQuery.applyInvestClaimId
    }

    @computed
    get orderId() {
        return Utils.hashQuery.orderId
    }

    initPage = () => {
        this.pageNo = 1
    }
    setRecordsTab = (tab) => {
        this.tab = tab
        this.fetchRecords()
    }

    fetchRecords = (done) => {
        if (this.pageNo === 0) return done && done()
        const PAGE_SIZE = 10

        if (this.pageNo == 1) this.records.splice(0, this.records.length)
        return this.Post('/api/v1/prdCurTradeRecord.shtml', {
            page: this.pageNo++,
            pageSize: PAGE_SIZE,
            tabType: this.tab
        }).then(data => {
            this.records.push(...data.pageData.result)

            if (this.pageNo >= data.pageData.pagination.totalPage)
                this.pageNo = 0;

            done && done();
        })
    }
    //我的预约详情页
    fetchRecordsDetail = () => {
        this.Post('/api/v1/prdCurRecordDetail.shtml', {
            orderId: this.orderId,
        }).then(data => {
            this.recordsDetail = data
            this.recordsResult = data.pageData.result
            this.totalCount = data.pageData.pagination.totalCount
        })
    }
    //产品详情页
    fetchProduct = () => {
        return this.Post('/api/v1/prdCurrentDetail.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            this.product = {
                annualRate: data.annualRate,//年化利率
                lockPeriod: data.lockPeriod,//锁定期
                minInvest: data.minInvest,//最低起投额
                dayLimitInvestAmount: data.dayLimitInvestAmount,//单日投资限额
                todaySurplusAmount: data.todaySurplusAmount,//今日剩余额度
                status: data.status //是否可以购买状态
            }
        })
    }

    fetchUser = () => {
        return this.Post('/api/v1/shiftToPrdCurPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            this.user = {
                cashBalance: data.cashBalance, //账户余额
                prdId: data.prdId,//产品id
                contractType: data.contractList[0].contractType
            }
        })
    }


    submitHandler = () => {
        return this.Post('/api/v1/prdCurrentDetail.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then((data) => {
            return this.Post('/api/v1/shiftToPrdCur.shtml', {
                amount: this.orderMoney,
                expireDealMode: this.dateMethod,//到期复投方式
                prdId: this.user.prdId,
            })
        })
    }


    cancelHandler = (id) => {
        return this.Post('/api/v1/cancelAppoint.shtml', {
            applyId: id
        })
    }

    getContractHandler = () => {
        return this.Post('/api/v1/shiftToPrdCurPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            return this.Post('/api/v1/appointContractMess.shtml', {
                applyInvestClaimId: this.user.prdId,
                contractType: this.user.contractType
            })
        }).then(data => {
            this.contractMsg = data.contractMsg
            return {
                contractMsg: this.contractMsg
            }
        })
    }

    //获取聚合页标的列表
    fetchBidList = () => {
        this.Post('/api/v2/appointInvestList.shtml').then(data => {
            this.bidList = data.appointClaimList
        })
    }

    setFormData = (type, value) => {
        this[type] = value
    }

    setDateMethod = (dateMethod) => {
        this.dateMethod = dateMethod
    }

    confirmRepeatFlag = (flag) => {
        this.dateMethod = flag
        this.Post('/api/prdCur/v2/isRepeatFlag.json', {
            fundQueueId: this.orderId,
            repeatFlag: flag
        })
    }
}