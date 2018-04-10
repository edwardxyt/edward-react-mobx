import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components/'
import styles from '../../css/protocol/counseling.css'
import { NativeBridge, Browser } from '../../helpers'

@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})
class LeaderPromise extends React.Component {
    render() {

        let { history } = this.props

        return <div styleName="bg">
            {!Browser.inApp && <Header title="出借人承诺书" history={history} /> }

            <div styleName="content">
                出借人承诺书<br /><br />
                致北京凤凰信用管理有限公司：<br /><br />
                本出借人为符合中华人民共和国法律（即中国法律，不包括香港特别行政区、澳门特别行政区和台湾地区的法律法规）规定的具有完全民事行为能力，能独立行使和承担民事权利义务的自然人或法人或其他组织；为贵司运营的网络借贷信息中介平台（以下简称“平台”）的注册用户；本出借人对在平台的出借行为承诺并保证如下：
    <br /><br />1、在出借过程中向平台提供真实、准确、完整的身份等信息；
    <br /><br />2、出借资金为来源合法的自有资金；
    <br /><br />3、已充分了解出借项目信贷风险，确认本出借人具备相应的风险认知和承受能力；
    <br /><br />4、自行承担借贷产生的本息损失；
    <br /><br />5、在资金出借时，平台已向本出借人充分披露和告知了相关的出借风险，本出借人完全知悉、了解并同意：
    <br /><br />1）借款及服务协议所指“借款利率”均为预期年化利率，不代表出借人最终实际利率；
    <br /><br />2）在出借实际利率未达到预期利率的情况下，出借人仅能根据实际利率取得利息；
    <br /><br />3）平台未以任何形式对出借人的出借资金及利息提供保证或担保；
    <br /><br />4）出借人的出借资金及利息可能存在不能按期收回的风险。
    <br /><br />6、遵守并履行借贷合同及有关协议约定的其他义务。
    <br /><br />7、对于平台基于本出借人的资金出借而提供的借款人的个人身份信息和其他相关信用信息，本出借人确保仅用于资金出借使用，不向任何第三方透露，并为借款人的信用信息及平台的业务内容和商业秘密进行保密。
    <br /><br />8、如本出借人违反上述约定的任一承诺和保证，本出借人同意平台有权单方解除双方签署的《出借咨询与服务协议》，并承担因此造成的所有损失。
    <br /><br />本出借人确认：如违反上述承诺及保证，本出借人自愿承担因此引发的全部责任及损失。
    <br /><br />注：本承诺书中“本出借人”是指在本平台注册，并以其自有合法资金通过本平台提供的信息服务获取利息的用户，包括平台各类借款项目出借人、债权受让人等。
</div>
        </div>
    }
}

export default LeaderPromise