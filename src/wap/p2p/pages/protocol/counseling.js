import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components/'
import styles from '../../css/protocol/counseling.css'
import { NativeBridge } from '../../helpers'

@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore' 
})
class Counseling extends React.Component {
    render() {

        let { history } = this.props

        return <div styleName="bg">
            <Header title="信息咨询服务协议" history={history} />

            <div styleName="content">
            甲方：北京凤凰信用管理有限公司
            <br/>
            统一社会信用代码：91110000597734276G
            <br/>
            注册地址：北京市朝阳区朝阳门外大街18号11层1105内008号
            <br/>
        
            <br/>
            乙方：
            <br/>
            身份证号：
            <br/>
            金融工场网站用户名：
            <br/>
        
            <br/>
        
            <br/>
            鉴于:
            <br/>
            1.甲方为一家从事互联网金融咨询服务的专业性公司，其经营的金融工场网络平台（域名：www.9888.cn，以下简称“平台”）作为综合金融服务平台，为客户提供借贷信息发布、居间撮合服务；
            <br/>
        
            <br/>
            2.乙方为金融工场网络平台的注册用户，愿意为甲方在金融工场网络平台上发布的产品推荐投资人。
            <br/>
        
            <br/>
            根据《中华人民共和国合同法》及其他相关法律法规，甲、乙双方经协商一致自愿达成本协议，共同遵守本协议所列条款。
            <br/>
        
            <br/>
            第一条 定义
            <br/>
        
            <br/>
            在本协议中，除非上下文另有解释或文义另有所指。下列词语具有如下含义：
            <br/>
        
            <br/>
            1.产品：指甲方在金融工场网络平台上发布的投资项目；
            <br/>
        
            <br/>
            2.产品成立：指乙方推荐的投资人决定投资产品，签署完产品相关协议并将投资金额汇入甲方指定账户，且该投资项目在平台上进入“还款中”状态；
            <br/>
        
            <br/>
            3.投资人：指投资甲方产品的客户，以下称“投资人”或“客户”；
            <br/>
        
            <br/>
            4.工场码：指乙方在甲方平台完成注册行为后取得的代码，在同一时间内乙方有且仅有一个有效的代码。若乙方推荐的客户在平台注册或投资时按照平台的要求填写乙方工场码，则视为该客户系由乙方推荐和介绍，甲方需根据本协议约定及甲方公司相关规定向乙方支付相应的信息咨询服务费。
            <br/>
        
            <br/>
            第二条 服务内容
            <br/>
        
            <br/>
            乙方将根据产品的结构与特点，向甲方提供以下信息咨询服务：
            <br/>
        
            <br/>
            乙方按照甲方关于产品的相关文件及产品销售要求向合格的机构和个人介绍产品相关信息，促使潜在的投资人投资该产品。
            <br/>
        
            <br/>
            对于乙方向甲方介绍潜在的投资人事宜，在任何情况下都不构成乙方与甲方的代理关系。上述合作服务内容及本协议并不能解释为任何一方是另一方的合伙人、委托人或代理人，或建立了任何形式的合法联盟或联营。
            <br/>
        
            <br/>
            第三条 费用及其支付
            <br/>
        
            <br/>
            1.作为乙方提供本协议项下信息咨询服务之对价，甲方应在产品成立后向乙方支付相应的信息咨询服务费E，其计算方式为：E=H×相应信息咨询服务费率。
            <br/>
        
            <br/>
            其中H为乙方推荐客户投资的进入甲方指定账户并投资成功的资金总额；信息咨询服务费率参照甲方公司规定执行。
            <br/>
        
            <br/>
            2.上述费用甲乙双方按月结算。甲方应于产品成立后次月内，将乙方本月信息咨询服务费支付至乙方银行账户或乙方在金融工场网络平台的平台账户中。
            <br/>
        
            <br/>
            3.甲乙双方同意各自承担相应税费。
            <br/>
        
            <br/>
            第四条 双方义务
            <br/>
        
            <br/>
            1.乙方在向甲方提供信息咨询服务时，承担以下义务：
            <br/>
        
            <br/>
            （1）乙方应严格按照甲方发布的产品相关文件或条款及甲方介绍的情况向客户介绍甲方产品，并进行充分的风险揭示，确保向客户传递的有关产品的信息真实、准确、完整且不存在遗漏及令人误导之处；
            <br/>
        
            <br/>
            （2）根据本协议对在双方合作过程中所知悉的甲方及甲方产品等信息承担保密义务；
            <br/>
        
            <br/>
            （3）乙方应确保客户投资资金来源合法，且不得与客户串通用来源不合法的资金投资产品；
            <br/>
        
            <br/>
            （4）乙方不得因本合作关系的存在代替甲方向客户作出任何承诺；
            <br/>
        
            <br/>
            （5）乙方在提供信息咨询服务过程中所产生的费用，由乙方自行承担。
            <br/>
        
            <br/>
            2.甲方应当承担以下义务：
            <br/>
        
            <br/>
            （1）及时发布与产品有关的资料信息；
            <br/>
        
            <br/>
            （2）如与产品有关的情况和事实发生变化，应及时告知乙方；
            <br/>
        
            <br/>
            （3）按照约定支付本协议约定的费用；
            <br/>
        
            <br/>
            （4）根据本协议对在双方合作过程中所知悉的乙方信息承担保密义务；
            <br/>
        
            <br/>
            （5）提供安全、稳定的网络技术服务支持。
            <br/>
        
            <br/>
            第五条 特别约定
            <br/>
        
            <br/>
            1.客户服务与确认
            <br/>
        
            <br/>
            （1）对于乙方推荐的投资人，乙方应确保其所提供的客户资料的真实性、准确性、完整性。如因乙方提供虚假或错误的客户信息而导致甲方做出错误决策或判断，则乙方应承担由此产生的责任，且甲方有权拒绝支付服务费用。
            <br/>
        
            <br/>
            （2）乙方推荐的客户在平台注册或投资时按照平台的要求填写乙方工场码或乙方真实姓名、电话等个人信息，则视为该客户系由乙方推荐和介绍。该客户成功投资后，甲方需根据本协议约定及甲方公司相关规定向乙方支付相应的信息咨询服务费。
            <br/>
        
            <br/>
            2.不可抗力
            <br/>
        
            <br/>
            本协议项下的服务在相应程度内可能因无法控制的原因而被耽搁或被阻止，包括但不限于自然灾害、地震、台风、水灾、火灾、战争、暴乱、流行病、政府行为、罢工、停工、停电、通讯失败、联网系统故障或失灵、系统故障、设备故障等。发生不可抗力情形的一方在前述不可抗力事件发生后应运用一切合理努力消除、减轻该等不可抗力事件的影响，并应尽快通知另一方，并提供相应的书面证据，由本协议双方共同在诚信基础上协商解决问题，但遭遇上述事项的一方无需承担违约责任。若该等不可抗力事件的影响自发生之日起持续超过[10]日，且对本协议之履行产生重大不利影响的，协议各方通过协商不能达成一致意见的，协议各方均有权通知对方终止本协议。
            <br/>
        
            <br/>
            3.责任承担
            <br/>
        
            <br/>
            甲、乙双方均应遵守本协议的约定，任何一方对本协议构成违约给对方造成实际损失的，均应承担违约赔偿责任。
            <br/>
        
            <br/>
            4.保密承诺
            <br/>
        
            <br/>
            甲、乙双方对协议内容负有保密义务，但法律或行规法规要求或有关监管机构要求承担披露义务的除外。
            <br/>
        
            <br/>
            第六条 协议的期限、解除和终止
            <br/>
        
            <br/>
            1.本协议有效期为壹年，期满后双方未提出书面修改或终止意见，则本协议有效期自动顺延。
            <br/>
        
            <br/>
            2.如果本协议项下的服务内容被中华人民共和国有关法律、法规所禁止，则任何一方均有权随时书面通知另一方解除协议。
            <br/>
        
            <br/>
            3.双方协商一致，可书面终止本协议。
            <br/>
        
            <br/>
            第七条 其他
            <br/>
        
            <br/>
            1.甲方有权根据产品的实际情况对金融工场网络平台发布的产品信息、投资流程和规则、信息咨询服务费率等进行调整，乙方同意遵守甲方现行及日后修订的所有在金融工场网络平台上发布的相关规定。
            <br/>
        
            <br/>
            2.本协议中的任何条款如因任何原因导致全部或部分无效，本协议的其他条款仍保持原有的效力，应当予以履行。
            <br/>
        
            <br/>
            3.甲方和乙方经协商一致，可以书面方式对本协议进行修改。本协议未尽事宜，双方可以另行签订书面补充协议，书面补充协议与本协议具有同等法律效力。
            <br/>
        
            <br/>
            4.双方同意，有关本协议签订、履行和解释均适用中华人民共和国法律。因本协议签订、履行而发生的任何争议，在无法通过协商和调解方式解决的情况下，任何一方均可就争议向甲方所在地的法院提起诉讼。
            <br/>
        
            <br/>
            5.本协议经甲乙双方通过金融工场网络平台电子合同签署系统签署后生效。
            <br/>
        
            <br/>
        
            <br/>
            甲方：北京凤凰信用管理有限公司
            <br/>
            日期：
            <br/>
        
            <br/>
            乙方：
            <br/>
            日期：
            <br/>
        
            <br/>
        
            <br/>
        </div>

        </div>
    }
}

export default Counseling