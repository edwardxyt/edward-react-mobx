import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class NoviceBid {
    constructor(Post) {
        this.Post = Post
        this.novice_bid_data = {}

        extendObservable(this.novice_bid_data, {
            context: {
                avgLoanPeriod: '',
                bookValidPeriod: null,
                id: null,
                loadRate: '',
                minAmt: '',
                repayPeriod: '',
                investMaxAmount: '',//预约最大金额
                addRate: ''
            },
            accountAmount: null,
            isRisk: 0,
            batchMaxmum: 0,
            reserveMoney: '',
            isChecked: true,
            contractMsg: '',
            isCompany: null,
            couponAmount: '',//	可用券的面额
            couponId: '',//	可用券的id（只有新手标才会返回值）
            couponInvestMultip: ''
        })
    }

    @computed
    get applyInvestClaimId() {
        return Utils.hashQuery.applyInvestClaimId
    }

    fetchNoviceProduct = () => {
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            let novice_data = this.novice_bid_data
            novice_data.context = data.appointClaim
            novice_data.accountAmount = data.accountAmount
            novice_data.isRisk = data.isRisk
            novice_data.batchMaxmum = data.batchMaxmum
            novice_data.minAmt = data.appointClaim.minAmt
            novice_data.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            novice_data.couponId = data.couponId
            novice_data.couponInvestMultip = data.couponInvestMultip
            return {
                isRisk: novice_data.isRisk,
                batchMaxmum: novice_data.batchMaxmum,
                isCompany: novice_data.isCompany,
                couponId: novice_data.couponId,
                couponInvestMultip: novice_data.couponInvestMultip
            }
        })
    }

    submitNoviceHandler = (id) => {
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then((data) => {
            return this.Post('/api/v1/investAppoint.shtml', {
                applyAmt: this.novice_bid_data.reserveMoney,
                applyInvestClaimId: this.novice_bid_data.context.id,
                bookInvestToken: data.bookInvestToken,
                couponId: id
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
            this.novice_bid_data.contractMsg = data.contractMsg
            return {
                contractMsg: this.novice_bid_data.contractMsg
            }
        })
    }

    setFormData = (field, value, type) => {
        this[type][field] = value
    }
}