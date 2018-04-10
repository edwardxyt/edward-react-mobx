import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components'
import styles from '../../css/topic/commission.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class Commission extends React.Component {

    componentDidMount() { }

    render() {
        return <div styleName="bg">
            <Header title={'年化佣金小贴士'} history={this.props.history} />

            <div styleName="header"></div>
            <div styleName="partone">
                <div styleName="textleft">上月好友累投非等额标年化<br />额越高<br />
                    （含自己投资）</div>
                <div styleName="textright">
                    本月您的佣金比例越高
    </div>
            </div>
            <div styleName="parttwo">
                <div styleName="text">
                    单笔投资期限越长，得到的年化佣金越多
    </div>
            </div>
            <div styleName="addpromt">
                温馨提示:
    <span styleName="addcontext">非等额标包括还款方式为一次性还本付息、按月付息<br />
                    到期还本和按天一次性还本付息的一次性还本标；<br />
                    等额标包括还款方式为按月等额还款和按季等额还款的标。</span>
            </div>
            <div styleName="caltitle">
                <div styleName="caltext">
                    投资非等额标和投资等额标，佣金比例计算标准不同。
    </div>
            </div>
            <div styleName="parttBox">
                <div styleName="partthree">
                    <div styleName="thtitle">
                        非等额标的A码返佣比例根据其上个月完成该种类标的好友年化投资额的多少，确定其本月佣金比例，每月一调整。
        </div>
                    <div styleName="space"></div>
                    <div styleName="casetitle">
                        某A码销售人员11月完成好友（含自己）累投非等额标的年化投资额为88万元，则12月份的佣金返利比例为1%，12月内好友单笔投资非等额标，其佣金返利举例如下
        </div>
                    <table styleName="date">
                        <tbody>

                            <tr style={{ height: "66px" }}>
                                <th style={{ width: "120px" }}>投资期限</th>
                                <th style={{ width: "127px" }}>投资金额</th>
                                <th style={{ width: "348px" }}>佣金返利</th>
                            </tr>
                            <tr style={{ height: "70px" }}>
                                <td>180天</td>
                                <td>10000元</td>
                                <td>10000*180/360*1%=50元</td>
                            </tr>
                            <tr style={{ height: "70px" }}>
                                <td>8个月</td>
                                <td>200000元</td>
                                <td>200000*8/12*1%=1333.33元</td>
                            </tr>
                        </tbody>
                    </table>
                    <div styleName="casetwotitle">
                        他在12月完成好友（含自己）累投非等额标的年化投资额为105万，则其在明年1月份的佣金返利比例为1.3%，明年1月内好友单笔投资非等额标，他的佣金返利举例如下        </div>
                    <table styleName="date">
                        <tbody>

                            <tr style={{ height: "66px" }}>
                                <th style={{ width: "120px" }}>投资期限</th>
                                <th style={{ width: "127px" }}>投资金额</th>
                                <th style={{ width: "348px" }}>佣金返利</th>
                            </tr>
                            <tr style={{ height: "70px" }}>
                                <td>180天</td>
                                <td>10000元</td>
                                <td>10000*180/360*1.3%=65元</td>
                            </tr>
                            <tr style={{ height: "70px" }}>
                                <td>8个月</td>
                                <td>200000元</td>
                                <td>200000*8/12*1.3%=1733.33元</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div styleName="partf">
                <div styleName="ftitle">
                    等额标的A码返利比例固定为1%，但最终年化佣金需乘以0.56，且投资超过个18月标按18个月计算佣金。0.56为借款方占用投资方的资金使用率。    </div>
                <div styleName="gap"></div>
                <div styleName="fsubtitle">
                    某A码销售人员，若好友单笔投资等额标，他的返利佣金举例如下
    </div>
                <table styleName="refund">
                    <tbody>

                        <tr>
                            <th style={{ width: "150px", color: "#005479", fontWeight: "bold" }}>还款方式</th>
                            <th style={{ width: "448px" }}>按月等额还款</th>
                        </tr>
                        <tr>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>投资期限</td>
                            <td>8个月</td>
                        </tr>
                        <tr>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>投资金额</td>
                            <td>200000元</td>
                        </tr>
                        <tr>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>佣金返利</td>
                            <td>200000*8/12*1%*0.56=746.67元</td>
                        </tr>
                    </tbody>
                </table>
                <table styleName="refund">
                    <tbody>

                        <tr>
                            <th style={{ width: "150px", color: "#005479", fontWeight: "bold" }}>还款方式</th>
                            <th style={{ width: "448px" }}>按季等额还款</th>
                        </tr>
                        <tr>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>投资期限</td>
                            <td>6个月</td>
                        </tr>
                        <tr>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>投资金额</td>
                            <td>100000元</td>
                        </tr>
                        <tr>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>佣金返利</td>
                            <td>100000*6/12*1%*0.56=280元</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div styleName="warmprompt">
                温馨提示：<br />
                1、投资债权转让标不计年化佣金；<br />
                2、灵活收益标投资起息后先发锁定期佣金返利，回款后再发剩余天数佣金返利；<br />
                3、最终返利取值四舍五入保留2位小数点；<br />
                4、佣金返利起息后以工豆形式发放。<br />
                5、此佣金返利标准，自2016年12月6日 00:00:00开始实施，即该时间后起息的标，其推荐人佣金返利都按新标准发放，反之按旧标准发放。</div>
            <div styleName="last">
                <table styleName="final">
                    <tbody>
                        <tr style={{ height: "57px" }}>
                            <th style={{ width: "300px", color: "#005479", fontWeight: "bold" }}>考核项目</th>
                            <th style={{ width: "300px" }}>A码人员标准</th>
                        </tr>
                        <tr style={{ height: "50px" }}>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>月度年化交易额（元）</td>
                            <td>10万</td>
                        </tr>
                        <tr style={{ height: "50px" }}>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>月度拉新下限（人）</td>
                            <td>5</td>
                        </tr>
                        <tr style={{ height: "50px" }}>
                            <td style={{ color: "#005479", fontWeight: "bold" }}>月度拉新上限（人）</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div styleName="explain">
                *以上活动由金融工场主办 与Apple Inc. 无关
</div>
        </div>
    }
}

export default Commission