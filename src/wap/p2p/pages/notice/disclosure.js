import React from 'react'
import CSSModules from 'react-css-modules'
import { getJSONP, Utils } from 'fw-javascripts'

import { Header } from '../../components'
import { NativeBridge } from '../../helpers'
import styles from '../../css/notice/disclosure.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class LeftPanel extends React.Component {
    state = {
        data: {}
    }
    componentDidMount() {
        // NativeBridge.trigger('hide_header')
        this.fetchDataHandler()
    }
    judgeCash = (value, n) => {
        n = n >= 0 && n <= 20 ? n : 2;
        var len = value && value.toString().split(".")[0].length;
        value = Number(value && value.toString().substr(0, 11));

        var v = "";
        if (len > 8) {
            v = (value / 100000000).toFixed(n) + "亿";
        } else if (len > 3) {
            v = (value / 10000).toFixed(n) + "万";
        } else {
            return value.toFixed(n)
        }

        return v
    }
    fetchDataHandler = () => {
        getJSONP('https://www.gongchangp2p.com/dataTopics/data.shtml')
            .then(data => {
                let d = data.data;
                this.setState({
                    data: d
                })
            })
    }
    render() {
        let { data } = this.state;
        let infoFn = (item, index) => {
            return <div styleName="infoCell" key={index}>
                <div styleName="text" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                <div styleName="cash"><span>{item.cash}</span></div>
            </div>
        }
        let accumulate = [
            {
                text: "累计借贷金额<br/>(元)",
                cash: this.judgeCash(data.total_invest)
            },
            {
                text: "累计借贷笔数<br/>(笔)",
                cash: this.judgeCash(data.total_orderCount, 0)
            },
            {
                text: "累计支付利息<br/>(元)",
                cash: this.judgeCash(data.total_interest)
            },
            {
                text: "借贷余额<br/>(元)",
                cash: this.judgeCash(data.total_principalInvest)
            },
            {
                text: "借贷余额笔数<br/>(笔)",
                cash: (data.total_principalCount/1000).toFixed(2)+"千"//借贷余额笔数
            },
        ]

        let enduranceFn = (item, index) => {
            return <div styleName="enduranceCell" key={index}>
                <div styleName="text" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                <div styleName={`cash cash-${index}`}><span>{item.cash}</span></div>
            </div>
        }
        let endurance = [
            {
                text: "利息余额(元)",
                cash: this.judgeCash(data.total_repInterest, 2)
            },
            {
                text: "逾期90天(不含)以上金额(元)",
                cash: this.judgeCash(data.total_ninetyOverdueSum, 2)
            },
            {
                text: "累计代偿金额(元)",
                cash: this.judgeCash(data.total_compenAmount)
            },
            {
                text: "金额分级逾期率1-90天",
                cash: this.judgeCash(data.overdue_ninetySumRate, 2) + "%"
            },
            {
                text: "累计代偿笔数(笔)",
                cash: this.judgeCash(data.total_compenCount, 0)
            },
            {
                text: "金额分级逾期率91-180天",
                cash: this.judgeCash(data.overdue_oneEightySumRate, 2) + "%"
            },
            {
                text: "出借人本息损失(元)",
                cash: this.judgeCash(data.total_lendSum, 2)
            },
            {
                text: "金额分级逾期率181天以上",
                cash: this.judgeCash(data.overdue_oneEightyOneSumRate, 2) + "%"
            },
            {
                text: "逾期金额(元)",
                cash: this.judgeCash(data.total_overdueSum, 2)
            },
            {
                text: "逾期90天(不含)以上笔数(笔)",
                cash: this.judgeCash(data.total_ninetyOverdueCount, 0)
            },
            {
                text: "逾期笔数(笔)",
                cash: this.judgeCash(data.total_overdueCount, 0)
            },
            {
                text: "项目分级逾期率1-90天",
                cash: this.judgeCash(data.overdue_ninetyRate, 2) + "%"
            },
            {
                text: "金额逾期率",
                cash: this.judgeCash(data.total_lendSum / data.total_invest * 100, 2) + "%"
            },
            {
                text: "项目分级逾期率91-180天",
                cash: this.judgeCash(data.overdue_oneEightyRate, 2) + "%"
            },
            {
                text: "项目逾期率",
                cash: this.judgeCash(data.total_overdueCount / data.total_orderCount * 100, 2) + "%"
            },
            {
                text: "项目分级逾期率181天以上",
                cash: this.judgeCash(data.overdue_oneEightyOneRate, 2) + "%"
            }
        ]

        return <div>
            <div styleName="infoCon">
                {data && accumulate.map(infoFn)}
            </div>
            <div styleName="infoPromote"></div>
            <div styleName="pieCon">
                <iframe style={{
                    border: '0',
                    width: '720px',
                    height: '2020px'
                }} src="https://static.9888.cn/pages/wap/chart-b/index.html?222"></iframe>
            </div>
            <div styleName="enduranceMobile">
                <div styleName="enduranceTitle">平台风险承受能力</div>
                <div styleName="enduranceContent">
                    {data && endurance.map(enduranceFn)}
                </div>
            </div>
            <div styleName="table">
                <table border="0" cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            <td colSpan="2">收费标准</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>业务类型</td>
                            <td>资费标准</td>
                        </tr>
                        <tr>
                            <td>用户注册</td>
                            <td>免费</td>
                        </tr>
                        <tr>
                            <td>开通存管账户</td>
                            <td>免费</td>
                        </tr>
                        <tr height="130">
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: '0px', width: '20%', verticalAlign: 'middle' }}>出借</td>
                                            <td >普通出借项目<br />批量出借项目<br />债权转让项目</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td >免费</td>
                        </tr>
                        <tr>
                            <td >回款到账</td>
                            <td >免费</td>
                        </tr>
                        <tr height="200">
                            <td >债权转让</td>
                            <td >锁定期满后出借人申请债权转让且转让成功的，按成功 转让债权本金的0.5%向平台支付债权转让手续费。</td>
                        </tr>
                        <tr>
                            <td >充值</td>
                            <td >免费</td>
                        </tr>
                        <tr height="180">
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: '0px', width: '20%', verticalAlign: 'middle' }}>提现</td>
                                            <td >快速提现<br />充值未出借提现费</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td >免费<br />对充值后未进行出借的资金进行提现，将收取提现金额的0.4%的提现费。</td>
                        </tr>
                        <tr height="150">
                            <td >借款人收费</td>
                            <td >工场微金平台对借款人收取的服务费标准为1%-6%（年 化），具体标准以相关合同约定为准。</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div styleName="timeData">数据截止至{data.date}</div>
        </div>
    }
}

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class MiddlePanel extends React.Component {
    render() {
        let chairmanFn = (item, index) => {
            return <div styleName="person" key={index}>
                <div styleName="personUp">
                    <img src={item.img} styleName="personPic fl" />
                    <div styleName="personRTitle fl">
                        <span styleName="name">{item.name}</span>
                        <span styleName="position">{item.job}</span>
                    </div>
                </div>
                <div styleName="personRContent">{item.profile}</div>
            </div>
        }
        let experts = [
            {
                img: require("../../images/notice/disclosure/men9.png"),
                name: '盛佳',
                job: '金融科技专家',
                profile: '曾任Google中国产品经理，负责全球产品搜索及产品基础架构业务；云壤（北京）信息技术有限公司创办人之一。毕业于清华大学计算机科学与技术系，拥有加拿大多伦多大学计算机专业硕士学位。荣任中国证券业协会互联网证券专业委员会委员、中国人民银行研究局G20数字金融专家组专家。现任中新控股科技集团有限公司执行董事、中国网信金融集团有限公司首席执行官。'
            },
            {
                img: require("../../images/notice/disclosure/men10.png"),
                name: '赵梦琴 ',
                job: '小微金融业务专家',
                profile: '曾任包商银行小微金融部总经理，从2005年起从事小微金融的研究与实践，荣获“中国银监会全国银行业金融机构小企业金融服务先进个人”等多项荣誉。毕业于东北财经大学，工商管理硕士，参与编写了《微小企业贷款的研究与实践》等研究专著，是中国小微信贷、小微金融领域的理论研究者、技术传播者和实践领军者。现任北京锦源盛达信息技术咨询有限公司董事长。'
            }
        ]
        let chairman = [
            {
                img: require("../../images/notice/disclosure/men2.png"),
                name: '魏薇·董事长兼CEO',
                job: '',
                profile: '毕业于中国人民大学。曾任北京联合开元投资担保有限公司副总经理和联合创业集团有限公司营运管理中心总经理。经过10余年金融行业管理岗位的历练，拥有丰富的网贷行业实战经验和全面而独到的行业视角及理念，是小微金融的领军人物，普惠金融体系的积极践行者。'
            },
            {
                img: require("../../images/notice/disclosure/men4.png"),
                name: '邹晓东',
                job: '首席风险官',
                profile: '毕业于东北财经大学，中国注册会计师（CICPA），英国特许公认会计师 （FCCA），曾任普华永道中天会计师事务所审计经理，联合创业担保集团辽宁公司首席风险官，拥有多年的风险管理经验。'
            },
            {
                img: require("../../images/notice/disclosure/men7.png"),
                name: '张锐',
                job: 'CTO 首席技术官',
                profile: '毕业于青岛理工大学，曾任人人(NYSE:RENN)高级技术经理，先锋支付技术基础架构负责人，去哪儿(NYSE: QUNR)国际机票(供应链)技术负责人。现任工场微金CTO，负责工场微金互联网产品与技术团队。对大规模复杂在线交易系统架构设计及互联网产品技术团队管理具备丰富经验。'
            },
            // {
            //     img: require("../../images/notice/disclosure/men8.png"),
            //     name: '段炼',
            //     job: 'CMO 首席营销官',
            //     profile: '毕业于北京交通大学，曾就职于中信国安集团和北京锐安科技有限公司，从事综合管理及互联网信息安全监管等相关工作，具备多年跨行业跨职能相关管理工作经验。对于营销管理、成本管理、团队管理具有丰富的工作经验，现任工场微金CMO,负责工场微金用户运营营销工作。'
            // }
        ]
        return <div styleName="basicInfo">
            <div styleName="basicInfoTitle">
                公司基本信息
                </div>
            <div styleName="basicInfoContent clearfix">
                <div styleName="basicInfoContentL fl">
                    <p styleName="site">公司全称及简称：</p>
                    <p styleName="site">统一社会信用代码：</p>
                    <p styleName="line">注册资本：</p>
                    <p styleName="line">实缴资本：</p>
                    <p styleName="adress">注册地址：</p>
                    <p styleName="line">成立时间：</p>
                    <p styleName="line">经营期限：</p>
                    <p styleName="line">法定代表人：</p>
                    <p styleName="line">股东信息：</p>
                    <p styleName="range">经营范围：</p>
                    <p styleName="line">经营状态：</p>
                    <p styleName="site" style={{ height: "282px" }}>从业人员：</p>
                    <p styleName="site newLine" style={{ height: "138px" }}>第三方机构合作：</p>
                    <p styleName="case" style={{ height: "148px" }}>风险管理负责人：</p>
                    <p styleName="site siteLook">经营场所：</p>
                    <p styleName="site">分支机构：</p>
                </div>
                <div styleName="basicInfoContentR fl">
                    <p styleName="rsite">北京凤凰信用管理有限公司（简称：凤凰信用）</p>
                    <p styleName="rsite">91110000597734276G</p>
                    <p styleName="rline">5000万</p>
                    <p styleName="rline">5000万</p>
                    <p styleName="radress">北京市朝阳区朝阳门外大街18号11层1105内008号</p>
                    <p styleName="rline">2012年5月23日</p>
                    <p styleName="rline">2012-05-23至2062-05-22</p>
                    <p styleName="rline">魏薇</p>
                    <p styleName="rline">魏薇，持股比例：100%</p>
                    <p styleName="rrange" style={{ height: "512px" }}>
                        企业信用征集、评定；企业信用管理咨询；经济贸易咨询；投资咨询；企业管理咨询；市场调查；投资管理；资产管理；软件开发；设计、制作、代理、发布广告；技术咨询；技术服务；委托生产电子产品、照相器材、计算机、软件及辅助设备；航空机票票务代理；经营电信业务；互联网信息服务；销售化工产品。（企业依法自主选择经营项目，开展经营活动；销售化工产品、“经营电信业务”；“互联网信息服务”以及依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动；不得从事本市产业政策禁止和限制类项目的经营活动。）</p>
                    <p styleName="rline">开业</p>
                    <p styleName="rline" style={{ height: "278px" }}>截止至2018年3月1日，北京凤凰信用管理有限公司人员数量共计49人，其中正式员工49人。从年龄构成看，30周岁以下员工20人，31（含）到40周岁员工25人，41周岁（含）以上员工4人；从学历结构看，研究生及以上员工6人，本科及以下员工43人；从岗位构成看，管理人员3人，技术人员19人，风控人员3人，财务人员3人，其他人员21人。</p>
                    <p styleName="rsite newLine" style={{ height: "140px" }}>徽商银行股份有限公司，为平台及平台用户提供资金存管服务，平台资金与用户资金相分离；中金金融认证中心有限公司，为平台及平台用户提供电子签章服务。</p>
                    <p styleName="rcase">
                        邹晓东，工场微金首席风险官。毕业于东北财经大学，中国注册会计师（CICPA），英国特许公认会计师 （FCCA），曾任普华永道中天会计师事务所审计经理，联合创业担保集团辽宁公司首席风险官，拥有多年的风险管理经验。
                    </p>
                    <p styleName="rline">北京市朝阳区朝阳门外大街18号11层1105内008号</p>
                    <p styleName="rline" style={{ marginTop: "54px" }}>无</p>
                </div>
            </div>
            <div styleName="webInfoTitle">
                风险管理信息
            </div>
            <div styleName="webInfoContent riskInfoContent">
                <div styleName="webInfoContentL fl">
                    <p styleName="line">网贷机构风险管理架构：</p>
                    <p styleName="line riskLine">风险评估流程：</p>
                    <p styleName="line">风险预警管理情况：</p>
                    <p styleName="line riskWay">催收方式：</p>
                </div>

                <div styleName="webInfoContentR fl">
                    <p styleName="rline">风险管理部：首席风险官1名；高级风险经理1名；风险经理2名。</p>
                    <p styleName="rLineTitle">工场微金项目审批流程图</p>
                    <img src={require("../../images/notice/disclosure/flow1.jpg")} alt="" />
                    <p styleName="rline riskRline">资产端业务部门进行贷后管理检查前要制定检查计划。贷后检查分日常检查和重点检查。对合作的资产端需要提供每月的资产质量报表，平台严格按《北京凤凰信用管理有限公司网络借贷信息中介平台贷后管理办法》与《北京凤凰信用管理有限公司网络借贷信息中介平台业务档案管理办法》执行。</p>
                    <p styleName="rline riskText">短信、电话。</p>
                </div>
            </div>
            <div styleName="webInfoTitle">
                公司网站平台信息
            </div>
            <div styleName="webInfoContent">
                <div styleName="webInfoContentL fl">
                    <p styleName="line">网站或互联网平台地址：</p>
                    <p styleName="line">平台名称：</p>
                    <p styleName="line">平台上线运营时间：</p>
                    <p styleName="line">ICP备案号：</p>
                    <p styleName="line">经营性ICP许可证号：</p>
                    <p styleName="line">移动APP应用：</p>
                    <p styleName="line">官方微信公众号：</p>
                    <p styleName="line">全国公安网监备案：</p>
                    <p styleName="case">资金存管情况：</p>
                    <p styleName="site siteLook">注册协议模板：</p>
                    <p styleName="line">联系电话：</p>
                    <p styleName="line">投诉电话：</p>
                    <p styleName="line">电子邮箱：</p>
                    <p styleName="line">通讯地址：</p>
                </div>
                <div styleName="webInfoContentR fl">
                    <p styleName="rline">www.gongchangp2p.com</p>
                    <p styleName="rline">工场微金</p>
                    <p styleName="rline">2012年7月1日</p>
                    <p styleName="rline">京ICP备14029254号-1</p>
                    <p styleName="rline">京ICP证140736号</p>
                    <p styleName="rline">工场微金</p>
                    <p styleName="rline">工场微金</p>
                    <p styleName="rline">京公网安备11010502031615号</p>
                    <p styleName="rcase">
                        存管银行：徽商银行<br />签约时间：2015年9月6日<br />全量业务上线时间：2016年10月20日
                    </p>
                    <p styleName="rline"><a styleName="rlineLook" target="_blank" href="/static/wap/protocol-user-service/index.html">点击查看</a></p>
                    <p styleName="rline rlineTop">400-6766-988</p>
                    <p styleName="rline ">400-6766-988转3</p>
                    <p styleName="rline">gcwj_kefu@veragroup.com</p>
                    <p styleName="rline">北京市朝阳区朝阳门外大街18号11层1105内008号</p>
                </div>
            </div>
            <div styleName="orgTitle">
                重大事项
            </div>
            <div styleName="matterTable">
                <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <td colSpan="3">公司减资、合并、分立、解散或申请破</td>
                            <td colSpan="1">无</td>
                        </tr>
                        <tr>
                            <td colSpan="3">公司依法进入破产程序</td>
                            <td colSpan="1">无</td>
                        </tr>
                        <tr>
                            <td colSpan="3">公司被责令停业、整顿、关闭</td>
                            <td colSpan="1">无</td>
                        </tr>
                        <tr height="130">
                            <td colSpan="3">公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事<br />处罚、重大行政处罚</td>
                            <td colSpan="1">无</td>
                        </tr>
                        <tr height="200">
                            <td colSpan="3" >公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员<br />
                                涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、<br />
                                重大行政处罚，或被采取强制措施：</td>
                            <td colSpan="1">无</td>
                        </tr>
                        <tr>
                            <td colSpan="3">公司主要或者全部业务陷入停顿：</td>
                            <td colSpan="1">无</td>
                        </tr>
                        <tr height="100">
                            <td colSpan="3">存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项：</td>
                            <td colSpan="1">无</td>
                        </tr>
                        <tr>
                            <td colSpan="3">其他重大事项：</td>
                            <td colSpan="1"><a href="http://static.9888.cn/pdf/web/%E4%BB%8E%E4%B8%9A%E6%9C%BA%E6%9E%84%E9%87%8D%E5%A4%A7%E4%BA%8B%E9%A1%B9.pdf" target="_blank">点击查看></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div styleName="orgTitle">
                组织架构
            </div>
            <img src={require("../../images/notice/disclosure/org.png")} alt="" styleName="orgPic" />
            <div styleName="shareTitle">实际控制人</div>
            <div styleName="shareContent">
                {/*<img src={require("../../images/notice/disclosure/logo3.png")} alt="" styleName="sharePic" />*/}
                <p styleName="des">Decade Elite Global Limited</p>
            </div>
            {/*<div styleName="chairmanRight">
                <div styleName="chairmanRightTitle">
                    专家顾问
                    </div>
                <div styleName="chairmanRightTitleContent expertsContent">
                    {experts.map(chairmanFn)}
                </div>
    </div>*/}
            <div styleName="chairmanRight">
                <div styleName="chairmanRightTitle">
                    高管团队
                    </div>
                <div styleName="chairmanRightTitleContent">
                    {chairman.map(chairmanFn)}
                </div>
            </div>
        </div>
    }
}

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class RightPanel extends React.Component {
    render() {
        return <div styleName="auditReportMobile">
            <div styleName="audioMobile">
                <span>经审计的年度报表 </span>
                <div styleName="auditBtn auditBtn1" onClick={() => { location.href = "https://static.9888.cn/pdf/web/2016report.pdf" }} >立即查看</div>
            </div>
            <div styleName="audioMobile">
                <span>会计师事务所审计报告 </span>
                <div styleName="auditBtn auditBtn1" onClick={() => { location.href = "https://static.gongchangp2p.com/pdf/web/%E4%BC%9A%E8%AE%A1%E5%B8%88%E4%BA%8B%E5%8A%A1%E6%89%80%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A.pdf" }} >立即查看</div>
            </div>
            <div styleName="audioMobile">
                <span>信息系统安全等级测评报告  </span>
                <a styleName="auditBtn auditBtn3" onClick={() => { location.href = "https://static.9888.cn/pdf/web/%E4%BF%A1%E6%81%AF%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8%E7%AD%89%E7%BA%A7%E6%B5%8B%E8%AF%84%E6%8A%A5%E5%91%8A.pdf" }}>立即查看</a>
            </div>
            <div styleName="audioMobile">
                <span>律师事务所合规报告  </span>
                <div styleName="auditBtn auditBtn1" onClick={() => { location.href = "https://static.gongchangp2p.com/pdf/web/%E5%BE%8B%E5%B8%88%E4%BA%8B%E5%8A%A1%E6%89%80%E5%90%88%E8%A7%84%E6%8A%A5%E5%91%8A.pdf" }}>立即查看</div>
            </div>
        </div>
    }
}
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class LastPanel extends React.Component {
    render() {
        let reportList = [
            {
                name: '《工场微金2月份运营报告》',
                link: 'http://mp.weixin.qq.com/s/xtY2LVkY0ur5_iNC-WfXtQ'
            },
            {
                name: '《工场微金1月份运营报告》',
                link: 'http://mp.weixin.qq.com/s/SL71WTxm1QtA5wTkl_eUzA'
            },
            {
                name: '《工场微金12月份运营报告》',
                link: 'http://mp.weixin.qq.com/s/iHbfyi2RyAMWYy7ZZvIEIg'
            },
            {
                name: '《工场微金11月份运营报告》',
                link: 'http://mp.weixin.qq.com/s/BhsDjTvPV39qZPT1wyhX6A'
            },
            {
                name: '《工场微金10月份运营报告》',
                link: 'http://mp.weixin.qq.com/s/N3k7vyFW9rGva2eB8_ALoA'
            },
            {
                name: '《工场微金9月份运营报告》',
                link: 'http://mp.weixin.qq.com/s/pPLQxClKfgFmQAiVy1tIww'
            },
        ]
        let report = (item, index) => {
            return <div styleName="audioMobile" key={index}>
                <span>{item.name}</span>
                <div styleName="auditBtn auditBtn1" onClick={() => { location.href = item.link }} >立即查看</div>
            </div>
        }
        return <div styleName="auditReportMobile">
            {reportList.map(report)}
        </div>
    }
}


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Disclosure extends React.Component {
    state = {
        tab: '承诺函'
    }
    componentDidMount() {
        // NativeBridge.trigger("hide_header")
    }
    switchTabHandler = (t) => {
        this.setState({ tab: t })
    }
    render() {
        let { tab } = this.state;

        let tabFn = (item, index) => {
            return <div key={index}
                styleName={tab == item ? 'tab active' : 'tab'}
                onClick={() => this.switchTabHandler(item)}>{item}
            </div>
        }
        let letter = <div styleName="letter">
            <img src={require('../../images/notice/disclosure/letter.png')}/>
        </div>
        let showPanel = () => {
            let p
            if (tab == "运营数据") {
                p = <LeftPanel />
            } else if (tab == "企业信息") {
                p = <MiddlePanel />
            } else if (tab == "专项报告") {
                p = <RightPanel />
            } else if (tab == "运营报告") {
                p = <LastPanel />
            } else if(tab == '承诺函'){
                p = letter
            }
            return p
        }

        return <div styleName="bg">
            {/*<Header title='信息披露' history={this.props.history} />*/}

            <div styleName="tabPanel">
                {["承诺函","运营数据", "企业信息", "专项报告", "运营报告"].map(tabFn)}
            </div>

            {showPanel()}
        </div>
    }
}

export default Disclosure