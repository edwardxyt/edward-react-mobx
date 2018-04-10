import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/reserve-bid/info.css'
import { NativeBridge, Browser } from '../../helpers'

@inject('order')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class Products extends React.Component {
    state = {
        ruler_control: false,
        intro_control: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.order.fetchBidList()
    }

    rulerControlHandler = () => {
        this.setState({ ruler_control: !this.state.ruler_control })
    }

    IntroOpenHandler = () => {
        this.setState({ intro_control: !this.state.intro_control })
    }

    jumpHandler = () => {
        let { history } = this.props
        history.push('/order/faq')
    }

    toInfoHandler = (id) => {
        let { history } = this.props
        history.push(`/order/info?applyInvestClaimId=${id}`)
    }

    toApplyHandler = (id) => {
        let { history } = this.props
        //是否加上判断
        history.push(`/order/apply?applyInvestClaimId=${id}`)
    }

    reserveHandler = () => {
        let { history, order } = this.props
        history.push('/order/apply')
    }

    render() {
        let { order, history } = this.props
        let banner_section = () => {
            return <div styleName="introBanner"></div>
        }
        let bid_section = () => {
            let bid_list_func = (item, index) => {
                return <div styleName="bidItem" key={index}>
                    <div styleName="itemCeil ceilOne" onClick={() => this.toInfoHandler(item.id)}>
                        <div
                            styleName="ceilUp">{item.loadRate}<span styleName="loadPercent">%</span>
                            <span styleName="addRate">{item.addRate == 0 ? '' :
                                <span>+<span styleName="addRateNum">{item.addRate}</span>%</span>}</span>
                        </div>
                        <div styleName="ceilDown">预期年化利率</div>
                    </div>
                    <div styleName="itemCeil ceilTwo" onClick={() => this.toInfoHandler(item.id)}>
                        <div styleName="ceilUp">{item.repayPeriod}天</div>
                        <div styleName="ceilDown">期限</div>
                    </div>
                    <div styleName="itemBtn">
                        {item.status ?
                            <div styleName="btn" onClick={() => this.toApplyHandler(item.id)}>抢购</div> :
                            <div styleName="btn-disabled">预约已满</div>}
                    </div>
                </div>
            }
            return <div styleName="bidBox">
                {order.bidList.map(bid_list_func)}
            </div>
        }
        let ruler_section = () => {
            let { ruler_control } = this.state
            let over_text = <div>
                4.预约出借暂不支持使用工豆、返息券、返现券，敬请期待；
                <br />5.取消预约后，系统将不再为出借人匹配项目，剩余未匹配资金将实时解冻并退还至出借人的微金账户内；
                <br />6.如要查看产品到期日，请参见预约记录，具体回款时间以实际匹配资产项目回款日为准，按照实际出借期限享受利息和加息利息；
                <br />7.预约加息部分利息在预约项目到期后以工豆形式发放到出借人账户中，如果因出借人将部分/全部回款资金中途退出或者提现，导致部分/全部回款资金复投失败的，复投失败的资金不享受加息部分利息，剩余复投成功的资金按照期限享受加息利息。加息利息=最后一期的实际出借金额*出借期限/360*计息比例。如果是非因出借人原因导致复投失败的，则平台会按照出借人实际出借期限享受加息利息；
                <br />8.本产品暂不支持债权转让功能。
            </div>
            return <div styleName="rulerBox">
                <div styleName="subTitle">
                    预约规则
                </div>
                <div styleName="rulerContentNovice">
                    <div>
                        1. 预约成功后，系统将冻结预约金额，将按照系统匹配规则为出借人匹配掌众优质资产；
                        <br />2.预约有效期为3天，2小时内不可取消预约，3天内系统未成功为出借人匹配项目，预约冻结资金将实时解冻并退回至出借人的微金账户内；
                        <br />3.预约匹配时间不计息（最长不超3个工作日）；
                    </div>
                    {ruler_control && over_text}
                </div>
                <div styleName="openBtn" onClick={() => {
                    this.setState({ ruler_control: !this.state.ruler_control })
                }}>{ruler_control ? "收起部分" : "展开全部"}</div>
            </div>
        }
        let intro_section = () => {
            let { intro_control } = this.state
            let over_text = <div styleName="overText">
                <br />
                <div styleName="sectionText">
                    二、闪电借款主要借款用户具备良好的经济偿还能力，属于可持续发展和培育的“高成长性人群”。
                </div>
                <div styleName="sectionText">
                    三、预约项目由北京掌众金融信息服务有限公司为出借人提供无限连带责任保证担保。
                    <br />
                    北京掌众金融信息服务有限公司成立于2014年3月，中国互联网金融协会理事单位；作为基于大数据风控的自动化助货平台，掌众金融为银行等传统金融机构提供大数据风控等技术支持，专注为有小额、短期资金需求的蓝领及新白领提供满足消费需求的现金贷和消费分期服务。
                    <br />
                    <br />
                    掌众金融坚持“移动普惠，让生活更好”，以小额分散为基本原则，以风控机器人为技术驱动，通过互联网、大数据技术帮助“信用空白”用户建立信用档案，让信用变得更有价值！
                </div>
                <div styleName="textTitle">项目风险提示：</div>
                <div styleName="sectionText">出借前请认真阅读并充分知悉相关风险，谨慎出借：</div>
                <div styleName="sectionText"> 一、借款人信用风险</div>
                <div styleName="sectionText">
                    出借人出借资金的过程中，如果借款人信用状况恶化，借款人短期或者长期丧失还款能力（包括但不限于借款人收入情况、财产状况发生变化，人身出现意外、发生疾病、死亡、企业吊销、注销等情况），或者借款人的还款意愿发生变化时，会出现借款人逾期支付本息的违约风险，甚至出现借款人本息损失的风险。
                </div>
                <div styleName="sectionText">二、债权转让延迟的风险</div>
                <div styleName="sectionText">
                    出借人申请债权转让，工场微金平台会积极协助出借人寻找债权受让人完成债权转让；但自接到出借人债权转让申请后，债权转让完成时间取决于转让债权在平台的实际成交时间，因此出借人债权转让的日期存在一定的不确定性，本平台不保证一定能够在出借人需求的时间协助出借人寻找到合适的债权受让人。
                </div>
                <div styleName="sectionText">三、不可抗力</div>
                <div styleName="sectionText">由于战争、动乱、自然灾害、黑客、系统停机维护、网络服务器故障、电信部门技术设备调整等不可抗力因素的出现而可能导致出借人资产损失的风险。</div>
                <div styleName="sectionText">四、出借利率风险</div>
                <div styleName="sectionText">
                    借款及相关服务协议所指“借款利率”均为出借人出借时所期望的年化利率，不代表出借人最终实际利息；在出借实际利息未达到所期望的利率的情况下，出借人仅能根据实际利息取得相关出借利息。
                </div>
                <div styleName="sectionText">五、政策风险</div>
                <div styleName="sectionText">国家宏观政策、财政政策、货币政策、行业政策、地区发展政策的变动可能会对出借方执行产生不利影响，北京凤凰信用管理有限公司对此政策风险不承担责任。
                </div>
                <div styleName="sectionText">六、其他风险</div>
                <div styleName="sectionText">本风险提示的揭示事项仅为列举性质，未能详尽列明出借人所面临的全部风险和可能导致出借人资产损失的所有因素。</div>
            </div>
            return <div styleName="introduceBox">
                <div styleName="introduceTitle">
                    产品详情
                </div>
                <div styleName="introduceText">
                    <div styleName="textTitle">
                        预约宝为您随机匹配“闪电借款”的产品，您所出借的项目是掌众金服旗下闪电借款精心筛选的优质借款项目，借款用途为日常消费，金额在 500 元一 1
                        万元。所有会员等级加息、返利、活动等奖励均按照所投当期产品为计算依据。
                    </div>
                    <div>
                        借款用途：日常消费（借款人保证按照借款用途使用资金）
                        <br />还款来源：个人收入
                        <br />预计起息日：出借资金划转至借款人存管银行电子账户之日
                        <br />限额管理：借款人该笔借款没有超过监管要求的借款余额上限
                    </div>
                    <div styleName="textTitle">还款保障：</div>
                    <div styleName="sectionText textEpli">
                        一、北京掌众金融信息服务有限公司通过自主研发出国内领先的“如来”风控引擎，闪电借款基于大数据风控建模体系，已经成为国内实现纯在线自动化审核信审的平台，有效控制用户的欺诈与信用风险，保障用户的出借安全性<span>{intro_control ? '。' : '...'}</span>
                    </div>
                    {intro_control && over_text}
                </div>
                <div styleName="openBtn" onClick={() => {
                    this.setState({ intro_control: !this.state.intro_control })
                }}>{intro_control ? "收起部分" : "展开全部"}</div>
            </div>
        }
        let faq_section = () => {
            return <div styleName="jumpLink" onClick={this.jumpHandler}>
                <div styleName="jumpLinkText">常见问题</div>
                <div styleName="jumpLinkArrow"></div>
            </div>
        }
        let records_section = () => {
            let record_btn_style = Browser.inIOSApp ? "recordBtnIos" : "recordBtn"
            return <div styleName={record_btn_style} onClick={() => history.push('/order/records')}>
                预约记录
            </div>
        }
        return <div styleName="infoPanel">
            <Header noClose title="预约" history={history} />
            {banner_section()}
            {bid_section()}
            {ruler_section()}
            {intro_section()}
            {faq_section()}

            <div styleName="bottomBox">
                <div styleName="reserveBtn" onClick={this.reserveHandler}>立即预约</div>
            </div>

            {records_section()}
        </div>
    }
}

export default Products