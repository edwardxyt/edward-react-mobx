import {Post} from '../helpers'

const Current = {
    //智存宝交易记录
    records: (page, type) => Post('/api/v1/prdCurTradeRecord.shtml', {
        page: page,
        pageSize: 20,
        type: type
    }),

    //智存宝信息
    info: () => Post('/api/v1/prdCurrentInfo.shtml'),

    //智存宝在投订单列表
    orderList: (page) => Post('/api/v1/prdCurLiveOrders.shtml', {
        page: page,
        pageSize: 20
    }),

    //智存宝开户
    openaccount: () => Post('/api/v1/prdCurOpenAccount.shtml'),

    //智存宝用户账户信息
    profid: () => Post('/api/v1/prdCurAccount.shtml'),

    // 智存宝用户账户状态查询
    state: () => Post('/api/v1/prdCurAccountStatus.shtml'),

    //智存宝订单详情
    order: (id) => Post('/api/v1/prdCurOrderDetail.shtml'),

    //智存宝详情
    detail: () => Post('/api/v1/prdCurrentDetail.shtml'),

    //智存宝转入
    transferIn: (amount, id) => Post('/api/v1/shiftToPrdCur.shtml', {
        amount: amount,
        prdId: id
    }),

    //智存宝转入页
    transferInPageInfo: () => Post('/api/v1/shiftToPrdCurPage.shtml'),

    //智存宝转出
    transferOut: (amount) => Post('/api/v1/shiftOutPrdCur.shtml', {
        amount: amount
    }),

    //智存宝转出页
    transferOutPageInfo: () => Post('/api/v1/shiftOutPrdCurPage.shtml')
}

export default Current
