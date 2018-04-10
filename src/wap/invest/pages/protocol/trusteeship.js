import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components/'
import styles from '../../css/protocol/trusteeship.css'
import { NativeBridge } from '../../helpers'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore' 
})
export default class Trusteeship extends React.Component {
    render() {

        let { history } = this.props

        return <div styleName="bg">
            {/*<Header title="徽商银行网络交易资金账户服务三方协议" history={history} />*/}

            <div styleName="content">

            甲方为在乙方平台已注册用户 。

            <br /><br />甲方声明：
            <br /><br />兹声明甲方在申请办理客户交易结算资金账户服务业务前已仔细阅读并理解《徽商银行网络交易资金账户服务三方协议》，甲方已明确知晓丙方仅负责网络交易资金账户服务，即丙方按照甲方或甲方通过乙方提交的申请或指令办理充值、转账、提现等资金划转业务；丙方不负责审核乙方平台所提供投资产品的真实性和合法性、不保障投资产品必然能给甲方带来预期收益。甲方完全同意和接受本协议的全部条款和内容，愿意履行和承担本协议中约定的权利和义务。
            <br /><br />乙方(工场尊享运营平台)：北京联合常春藤资产管理有限公司
            <br /><br />丙方：徽商银行股份有限公司

            <br /><br />鉴于：
                <br /><br />工场尊享网络平台（www.gongchangzx.com/ cn）为由乙方倾力打造的，专注于投资产品的介绍、发布、中介服务的互联网金融服务平台。甲方为在乙方平台成功注册的用户，乙方和丙方连通网络交易账户管理平台，乙方和丙方已签订《徽商银行账户交易资金保管服务合作协议》（以下称“《合作协议》”）。
                <br /><br />为此，甲、乙、丙三方依据《中华人民共和国合同法》、《中华人民共和国商业银行法》、《中华人民共和国证券投资基金法》、结合乙方交易及结算规则、丙方账户交易资金保管及结算规则和其他有关法律、法规、规章以及相关规定，就甲方通过乙方网站的服务进行产品投资，丙方为乙方客户开立电子账户（以下称“账户”），提供交易结算资金账户服务，及其他相关事宜达成《徽商银行网络交易资金账户服务三方协议》（以下称“本协议”），供三方共同遵守，如乙丙双方签署的《合作协议》与本协议不一致的，以本协议为准。
                <br /><br />为了保障甲方的合法权益，请甲方在注册或使用丙方账户服务前，详细阅读本协议。甲方注册或使用账户时，即表示甲方已充分知晓并理解本协议之含义，并在此基础上接受本协议之全部内容。
                <br /><br />一、开立账户
                <br /><br />1、甲方应具有法律规定的完全民事权利能力和行为能力，且为能够独立承担民事责任的自然人，若甲方不具备前述条件，应立即停止注册和使用账户。
                <br /><br />2、“电子账户”指甲方通过乙方网络平台自助申请，经丙方核准后为甲方开立的，仅供甲方通过乙方渠道办理网络交易资金账户服务的个人人民币银行结算账户，电子账户必须绑定甲方名下任意一张银行卡，支持绑定的银行卡种类以乙方网站公告为准。
                <br /><br />3、密码：指乙方用以识别甲方身份与指令要求甲方提供的代码或口令。包括登录密码、交易密码、动态密码等多个种类，具体业务中使用的密码类别以丙方要求为准。
                <br /><br />4、绑定手机号码：是指甲方在申请开立电子账户时，指定的关联电子账户的手机号码，用于接收授权码、短信验证码以及交易提示短信等。丙方认为必要时，可通过此手机号码向甲方核实身份信息和交易信息。
                <br /><br />5、电子账户只限甲方本人使用，不得出借、转让或出租。否则，由此产生的损失由甲方自行承担。
                <br /><br />二、账户服务
                <br /><br />甲方通过乙方渠道进行充值、提现、转账等各类交易时，必须输入正确的已经在丙方设置的客户交易结算资金管理账户交易密码。
                <br /><br />1、充值：注册完成后，甲方即可通过账户进行充值，充值方式包括但不限于通过充值网关转入、绑定卡转入、跨行汇款转入，丙方有权根据风险情况对充值交易开关进行调整,并保留对种类和限额进行无需预告地调整的权利。
                <br /><br />2、支付：甲方可使用其电子账户中的余额直接在乙方网站进行支付，系统将自动从甲方对应的电子账户中扣除已支付金额。在甲方作为投资人进行投资环节，甲方应确保其电子账户中具有充足的可投资金，如因甲方电子账户可投资金不足而使得投资不成功的，丙方不承担任何责任。如甲方投资时，乙方需进行审核的，因乙方审核不通过而使得投资不成功的，丙方不承担任何责任。
                <br /><br />3、取现：甲方可对电子账户进行取现操作。在符合丙方规定或产品规则的情况下，甲方可以请求将电子账户中的资金提取到甲方名下的有效中国大陆银行账户内,该银行账户必须是甲方电子账户绑定的银行卡，取现交易资金限额、到账时间因银行机构不同会有所差异，具体标准以乙方或丙方在乙方网站平台公告为准。
                <br /><br />4、在甲方使用相关服务时，丙方有权向甲方收取服务费。具体收费方式及收费标准以乙方网站所列或与甲方的其他约定为准。丙方保留制订及调整收费方式及收费标准之权利。
                <br /><br />三、甲方声明
                <br /><br />1、甲方具有相应合法的投资资格，不存在法律、法规、规章、其他规范性文件和乙方交易规则禁止或限制其通过乙方进行投资的情形。
                <br /><br />2、甲方保证其向乙方、丙方提供的所有证件、资料均合法、真实、准确、完整和有效。甲方资料发生变化时，甲方必须按照约定的要求，及时通知乙方和丙方。
                <br /><br />3、甲方保证其资金来源合法合规、且允许进行投资性交易。
                <br /><br />4、乙方已向甲方清楚揭示投资产品的风险，甲方已明确知晓并愿意承担投资产品的风险。
                <br /><br />5、甲方已明确知晓丙方仅负责交易资金账户服务，即按照甲方或乙方申请或指令办理账户开立、绑卡、解绑卡、充值、转账、提现等业务；丙方不负责审核乙方所提供投资产品的真实性和合法性、不保障甲方能够获得投资产品的预期收益。
                <br /><br />6、甲方同意遵守有关的法律、法规及乙方交易规则，甲方已详细阅读本协议所有条款，准确理解其含义。
                <br /><br />7、甲方确认知晓用户号和密码、电子账户和密码的重要性。任何使用甲方密码进行的交易委托或资金划转均视为甲方本人所为和有效的甲方指令。由于甲方未尽到防范风险的义务造成其用户号及密码失密及其他非乙方、丙方原因而导致的甲方损失，乙方、丙方不承担任何责任。
                <br /><br />四、乙方声明
                <br /><br />1、乙方是依法设立的互联网金融服务平台的运营商，具有相应的资格开展互联网金融服务相关业务。
                <br /><br />2、乙方根据乙方平台规则对投资人进行审核， 乙方按乙方与投资人约定承担因在乙方平台进行投资可能引发的法律责任。
                <br /><br />3、乙方承诺其通过自身服务系统向丙方系统所提交的任何支付指令和推送的任何数据均为投资人提交的指令或提供的数据，或根据乙方平台必须作出的指令或推送相关信息；如因乙方故意操作不准确、不真实、不完整、不合法的该类指令或数据信息而导致甲方或丙方等相关方损失的，乙方承诺承担过错责任。
                <br /><br />4、乙方遵守有关的法律、法规及交易和结算规则。
                <br /><br />5、乙方已详细阅读本协议所有条款，准确理解其含义，特别是其中有关丙方的责任条款，并同意本协议所有条款。
                <br /><br />6、乙方依据国家相关规定承担需其承担的反洗钱的职责，根据人民银行相关规定做好客户身份识别、资料保存及其他相关工作。
                <br /><br />五、丙方声明
                <br /><br />1、丙方是依法设立的商业银行，能够履行客户网络交易结算资金的账户服务及清算职责。丙方仅按照本协议条款规定的内容承担资金划转和清算职责。丙方按照办理电子账户要求对甲方或乙方提交资料进行审核，不负责审核甲方资金来源的合法合规性，不负责对乙方平台项目合法性、合规性进行审查，不对乙方平台项目收益提供任何承诺和担保。
                <br /><br />2、丙方具有开展客户交易结算资金账户服务的必要条件，能够按照甲方或甲方通过乙方发送的交易指令办理电子账户开立、绑卡、解绑卡、充值、转账、提现等交易。
                <br /><br />3、丙方在严格遵循国家有关法律、法规以及规章的前提下，办理乙方的客户交易结算资金账户服务业务。
                <br /><br />4、丙方承诺其通过自身服务系统执行乙方的指令，并确保执行行为的及时、准确、有效；如因执行行为不及时、不准确、未生效而导致甲方或乙方等相关方损失的，丙方按照其过错承担相应责任。
                <br /><br />六、附则
                <br /><br />1、本协议由甲方通过乙方服务渠道界面操作阅读，各方在该服务界面进行的任何形式的确认，包括但不限于数字证书、密码、点击确认等形式均视为各方的可靠电子签名。本协议经甲方通过上述方式确认同意签署并于系统记录的签约日期之日起发生法律效力。
                <br /><br />2、甲方使用电子账户时，如非丙方过错而发生的数据电文错误或者对甲方指令识别、处理或执行错误时，丙方对因该项错误的发生所导致的损失和其他不利后果不承担责任。
                <br /><br />3、对于不可抗力(包括但不限于战争、自然灾害、电力供应中断、火灾、地震等)、意外事件或乙方无法控制的其他情况所造成的损失，丙方不承担责任。
                <br /><br />4、本协议生效后，若有关法律法规、规章制度出台或修订，相关条款按新出台或修订的法律法规、规章制度办理；本协议中如有与未来出台或修订的法律法规、规章制度存在冲突或不一致的条款，自相关法律法规、规章制度生效之日起即可确认此类条款自始无效，但本协议其他条款继续有效。
                <br /><br />5、本协议引起的或与本协议有关的任何争议，由协议签订各方协商解决；协商不成的，应向丙方所在地法院起诉。争议期间，各方仍应履行未涉争议的条款.

            </div>

        </div>
    }
}
