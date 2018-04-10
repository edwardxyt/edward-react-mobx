import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../../css/notice/risk-prompt.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class RiskPrompt extends React.Component {
    render() {
        return <div styleName="bg">
            <div styleName="gap"></div>
            <div styleName="container">
                <div styleName="title">
                    风险揭示
    </div>
                <div styleName="item first">
                    <div styleName="itemTitle">
                        一、项目风险
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>该投资标的资金投向目标融资企业或自然人，其还款依赖于融资企业的营业收入或自然人的稳定收入。
        </div>
                </div>
                <div styleName="item">
                    <div styleName="itemTitle">
                        二、政策风险
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>
                        因国家法律、法规、行政规章或政策发生重大调整、变化或其他不可预知的意外事件，可能导致本定向委托投资的有效性发生变化，从而可能导致委托人无法实现预期收益乃至本金遭受损失.
        </div>
                </div>
                <div styleName="item">
                    <div styleName="itemTitle">
                        三、市场风险
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>
                        资金市场供求关系的变化、货币政策、财政政策、行业政策等因素的变化，以及整体经济形势的变化，可能会对利率、汇率、资金成本和商品价格等因素产生负面影响，从而不利于委托人实现预期收益乃至本金遭受损失。
        </div>
                </div>
                <div styleName="item">
                    <div styleName="itemTitle">
                        四、管理风险
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>
                        在委托财产管理运作过程中，受托人的管理能力可能会影响定向委托投资资金的收益水平，此外，受托人对定向委托投资盈利机会的判断是否准确、投资决策所需获取的信息是否完整、投资操作是否出现失误等，都会对定向委托投资资金的预期收益形成不利影响乃至本金遭受损失。
        </div>
                </div>

                <div styleName="item">
                    <div styleName="itemTitle">
                        五、信用风险
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>
                        无论何种原因，当最终使用定向委托投资资金并承担偿还责任的融资方不能按时偿付本金和收益，将导致委托人无法实现预期收益，甚至本金遭受损失。
        </div>
                </div>

                <div styleName="item">
                    <div styleName="itemTitle">
                        六、延期实现预期收益的风险
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>
                        定向委托投资到期时，若发生前述信用风险，受托人将根据委托人的授权或约定，使用受托人认为适当的方式对融资方进行追索，在此过程中，委托人有可能延期实现预期收益乃至本金遭受损失。
        </div>
                </div>


                <div styleName="item">
                    <div styleName="itemTitle">
                        七、操作风险：
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>1．不可预测或无法控制的系统故障、设备故障、通讯故障、停电等突发事故将有可能给委托人造成一定损失；<br />
                        <span styleName="space"></span>2．由于存在互联网和移动通讯网络的黑客恶意攻击可能性，委托人可能会遭受损失；<br />
                        <span styleName="space"></span>3．委托人的账号及密码信息有可能被盗，客户身份可能被仿冒，委托人可能遭受因此导致的损失；<br />
                        <span styleName="space"></span>4．委托人的网络终端设备及软件系统可能会受到非法攻击或病毒感染，导致电子签名合同数据无法传输或传输失败，从而遭受损失；<br />
                        <span styleName="space"></span>5．委托人操作不当等原因可能会造成委托人损失；<br />
                        <span styleName="space"></span>6．网上交易、热键操作完毕，未及时退出，他人进行恶意操作将可能造成委托人损失；<br />
                        <span styleName="space"></span>7．由于委托人未能及时主动了解定向委托投资标的资产的信息，或由于通信故障、系统故障以及其他不可抗力等因素的影响，可能导致委托人无法及时做出合理的决策，造成委托人损失；<br />
                        <span styleName="space"></span> 8．委托人交由他人代理交易，或长期不关注账户变化，可能致使他人恶意操作而造成委托人损失。
        </div>
                </div>

                <div styleName="item">
                    <div styleName="itemTitle">
                        八、其他风险：
        </div>
                    <div styleName="itemContent">
                        <span styleName="space"></span>1．由于自然灾害、战争、法律法规或者政策等无法避免或无法控制的因素出现，将影响市场的正常运行，从而导致定向委托投资标的损失，甚至影响该定向委托投资标的的受理、运行、偿付等的正常运行；<br />
                        <span styleName="space"></span>2．金融市场危机、行业竞争、代理商违约等超出受托人自身直接控制能力之外的风险，也可能导致委托人利益受损；<br />
                        <span styleName="space"></span>3．受托人或担任定向委托投资标的托管人的托管机构因停业、解散、撤销、破产，或者被监督机构撤销相关业务许可等原因不能履行职责时，可能导致委托资产的受损；<br />
                        <span styleName="space"></span>4．因其他意外因素和不可抗力而导致的风险。
        </div>
                </div>
            </div>
            <div styleName="gap"></div>
            <div styleName="container">
                <div styleName="title">
                    免责条款
    </div>
                <div styleName="item first">
                    <div styleName="itemContent">
                        <span styleName="space"></span>
                        金融工场作为交易中介服务平台进行信息发布，不对任何投资人及其选择的投资项目提供任何形式的投资担保。投资人应依其独立判断做出投资决策，投资人的投资风险由投资人自行承担，金融工场不承担任何责任。
        </div>
                </div>
            </div>
        </div>
    }
}

export default RiskPrompt