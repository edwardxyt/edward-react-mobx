import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components/'
import styles from '../../css/protocol/counseling.css'
import { NativeBridge, Browser } from '../../helpers'

@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})
class PerformDuty extends React.Component {
    render() {

        let { history } = this.props

        return <div styleName="bg">
            {(!Browser.inApp) && <Header title="履行反洗钱义务的承诺书" history={history} />}

            <div styleName="content">
                履行反洗钱义务的承诺书
    <br /><br />
                本出借人郑重承诺：
    <br /><br />本出借人严格遵守国家《中华人民共和国反洗钱法》等相关法律、行政法规、监管规定和规章制度,切实履行反洗钱义务,并切实做到：
    <br /><br />
                1、本出借人在工场微金平台（即www.gongchangp2p.com，以下简称“工场微金”）上从事出借的资金为来源合法的自有资金,均符合中国及其他相关国家的法律、行政法规、部门规章、地方性规定、政策及其他一切可适用的有关法律规定。
    <br /><br />2、本出借人就出借资金使用已取得必要的授权、核准、审批、备案、许可。本出借人在工场微金平台上从事出借的资金不存在被或可能被公安机关、司法机关、税务机关、工商机关、外汇管理机关等国家机关采取强制措施、追缴、没收的情形，不存在任何限制性条件妨碍借款人按约定使用该出借资金的权利，且该权利不会为其他任何第三方所质疑。
    <br /><br />3、积极参与并配合工场微金的反洗钱活动（包括但不限于配合提供并更新真实、完整、准确、及时有效的身份信息，从事出借资格相关信息，交易目的和交易性质说明，以及相关资金合法来源证明、说明等），坚决杜绝并检举洗钱活动。
    <br /><br />4、本出借人如果违反以上承诺或发生违反反洗钱法等相关法律法规行政规章的违法违规行为，情节严重或者造成重大损失的，本出借人自愿按照法律法规承担赔偿损失等相应民事责任、行政处罚甚至刑事责任。
    <br /><br />本出借人承诺，本出借人在工场微金上从事出借的资金来源均属正规合法的自有资金，特此做出书面承诺。
    <br /><br />注：本承诺书中“本出借人”是指在本平台注册，并以其自有合法资金通过本平台提供的信息服务获取利息的用户，包括本平台各类借款项目出借人、债权受让人等。
</div>
        </div>
    }
}

export default PerformDuty