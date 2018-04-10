import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { NativeBridge } from '../../helpers'
import { Header } from '../../components'
import styles from '../../css/fa-xian/about-us.css'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})
class Ourself extends React.Component {
    componentDidMount(){
        NativeBridge.setTitle('关于我们')
    }
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
                img: require("../../images/fa-xian/about-us/men9.png"),
                name: '盛佳',
                job: '金融科技专家',
                profile: '曾任Google中国产品经理，负责全球产品搜索及产品基础架构业务；云壤（北京）信息技术有限公司创办人之一。毕业于清华大学计算机科学与技术系，拥有加拿大多伦多大学计算机专业硕士学位。荣任中国证券业协会互联网证券专业委员会委员、中国人民银行研究局G20数字金融专家组专家。现任中新控股科技集团有限公司执行董事、中国网信金融集团有限公司首席执行官。'
            },
            {
                img: require("../../images/fa-xian/about-us/men10.png"),
                name: '赵梦琴 ',
                job: '小微金融业务专家',
                profile: '曾任包商银行小微金融部总经理，从2005年起从事小微金融的研究与实践，荣获“中国银监会全国银行业金融机构小企业金融服务先进个人”等多项荣誉。毕业于东北财经大学，工商管理硕士，参与编写了《微小企业贷款的研究与实践》等研究专著，是中国小微信贷、小微金融领域的理论研究者、技术传播者和实践领军者。现任北京锦源盛达信息技术咨询有限公司董事长。'
            }
        ]
        let chairman = [
            {
                img: require("../../images/fa-xian/about-us/men2.png"),
                name: '魏薇',
                job: '董事长兼CEO',
                profile: '毕业于中国人民大学。曾任北京联合开元投资担保有限公司副总经理和联合创业集团有限公司营运管理中心总经理。经过10余年金融行业管理岗位的历练，拥有丰富的网贷行业实战经验和全面而独到的行业视角及理念，是小微金融的领军人物，普惠金融体系的积极践行者。'
            },
            {
                img: require("../../images/fa-xian/about-us/men4.png"),
                name: '邹晓东',
                job: '首席风险官',
                profile: '毕业于东北财经大学，中国注册会计师（CICPA），英国特许公认会计师 （FCCA），曾任普华永道中天会计师事务所审计经理，联合创业担保集团辽宁公司首席风险官，拥有多年的风险管理经验。'
            },
            {
                img: require("../../images/fa-xian/about-us/men7.png"),
                name: '张锐',
                job: 'CTO 首席技术官',
                profile: '毕业于青岛理工大学，曾任人人(NYSE:RENN)高级技术经理，先锋支付技术基础架构负责人，去哪儿(NYSE: QUNR)国际机票(供应链)技术负责人。现任工场微金CTO，负责工场微金互联网产品与技术团队。对大规模复杂在线交易系统架构设计及互联网产品技术团队管理具备丰富经验。'
            },
            // {
            //     img: require("../../images/fa-xian/about-us/men8.png"),
            //     name: '段炼',
            //     job: 'CMO 首席营销官',
            //     profile: '毕业于北京交通大学，曾就职于中信国安集团和北京锐安科技有限公司，从事综合管理及互联网信息安全监管等相关工作，具备多年跨行业跨职能相关管理工作经验。对于营销管理、成本管理、团队管理具有丰富的工作经验，现任工场微金CMO,负责工场微金用户运营营销工作。'
            // }
        ]
        return <div styleName="bg">
            <div styleName="profileTitle">公司简介</div>
            <div styleName="profileBox">
                <img src={require("../../images/fa-xian/about-us/logo.png")}/>
                <div styleName="profileText">
                金融工场，品牌创立于2012年，是中国领先的综合金融信息服务平台。平台以金融全球化发展趋势为契机，融合信息技术创新手段，秉承安全、专业、透明的经营理念，为用户提供多样化高效智能的金融产品，为企业和个人提供定制化金融服务解决方案。平台在交易品种与交易组织模式上持续创新，优化金融资产配置，提供多样化金融产品，让每个用户都能平等、轻松、高效地享受互联网金融服务，享有高品质金融生活。
                </div>
            </div>
            <div styleName="chairmanRight">
                <div styleName="chairmanRightTitle">
                    专家顾问
                </div>
                <div styleName="chairmanRightTitleContent expertsContent">
                    {experts.map(chairmanFn)}
                </div>
            </div>
            <div styleName="spacing"></div>
            <div styleName="chairmanRight">
                <div styleName="chairmanRightTitle">
                管理团队（合作平台）
                </div>
                <div styleName="chairmanRightTitleContent">
                    {chairman.map(chairmanFn)}
                </div>
            </div>
        </div>
    }
}

export default Ourself