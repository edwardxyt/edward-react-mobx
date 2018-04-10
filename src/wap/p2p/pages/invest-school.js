import React from 'react'
import CSSModules from 'react-css-modules'
import {Header} from '../components'
import styles from '../css/invest-school.css'
import {Browser, Ajax} from '../helpers'

const policy_list = [
    "1.中华人民共和国网络安全法",
    "2.中华人民共和国广告法",
    "3.中华人民共和国电子签名法",
    "4.中国人民共和国反洗钱法",
    "5.央行等十部委《关于促进互联网金融健康发展的指导意见》",
    "6.网络借贷信息中介机构业务活动管理暂行办法",
    "7.国务院办公厅互联网金融风险专项整治工作实施方案",
    "8.通过互联网开展资产管理及跨界从事金融业务风险专项整治工作实施方案",
    "9.工商总局等开展互联网金融广告及以投资理财名义从事金融活动风险专项整治工作实施方案",
    "10.北京市互联网金融风险专项整治工作实施方案",
    "11-1.中国互联网金融协会信息披露自律管理规范",
    "11-2.中国互联网金融信息披露标准：个人网络借贷",
    "12.P2P网络借贷风险专项整治工作实施方案",
    "13.网络借贷资金存管业务指引（正式版）",
    "14.关于规范整顿‘’现金贷“业务的通知",
    "15.关于开展“现金贷”业务活动清理整顿工作的通知",
    "16.网络借贷信息中介机构备案登记管理指引",
    "17.网络借贷信息中介机构业务活动信息披露指引"
]

const Encyclopedia_list = [
    "1.P2P借款人义务及禁止性行为",
    "2.何为网贷平台资金存管",
    "3.网贷平台13条禁止性红线",
    "4.网络借贷出借人资格及义务",
    "5.网络借贷信息中介平台的性质与定位"
]

const educate_list = [
    "1.如何识别互联网金融陷阱",
    '2.如何识别网贷平台的"自融自保"',
    "3.什么是流动性风险?",
    "4.网贷平台应披露哪些项目信息？",
    "5.网络借贷出借风险有哪些？",
    "6.正确认识与规范发展互联网金融"
]

@CSSModules(styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'})
class InvestSchool extends React.Component {
    state = {
        tab: '0',
        banner: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    toggleTabHandler = (t) => {
        this.setState({tab: t});
    }

    render() {
        let {history} = this.props
        let tabStyle = {
            paddingBottom: Browser.inIOS ? "23px" : "26px"
        };
        let tab = (t, i) => {
            let tab_style = this.state.tab == i ? styles["tabselected"] : styles['tab']
            return <div styleName="tabBlock" key={i} onClick={() => this.toggleTabHandler(i)}>
                <em style={tabStyle} className={tab_style}>{t}</em>
            </div>
        };
        let cell = (item, index) => {
            return <a styleName="cell" key={index}
                      onClick={() => history.push(`/invest-school/page?id=${index}&type=${this.state.tab}`)}>
                <div styleName="cellText">{item}</div>
                <img styleName="iconArrow" src={require("../images/invest-school/arrow.png")}/>
            </a>
        };
        return <div styleName="investSchool">
            {(!Browser.inApp) && <Header title='网贷学堂' history={this.props.history}/>}
            <div styleName="schoolBanner"></div>
            <div styleName="tabGroup">
                {["政策法规", "网贷百科", "出借人教育"].map(tab)}
                <i styleName="dashed1"></i>
                <i styleName="dashed2"></i>
            </div>
            <div styleName="space"></div>
            <div styleName="list">
                {this.state.tab == '0' && policy_list.map(cell)}
                {this.state.tab == '1' && Encyclopedia_list.map(cell)}
                {this.state.tab == '2' && educate_list.map(cell)}
            </div>
        </div>
    }

}


export default InvestSchool
