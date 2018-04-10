import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../../css/notice/safeguard.css'

@CSSModules(styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Safeguard extends React.Component {
    render() {
        let safeBox1 = <div styleName="safe-box1">
            <img src={require("../../images/notice/safeguard/img1@safe.png")}/>
        </div>
        let safeBox2 = <div styleName="safe-box2">
            <div styleName="safe-h1">
                <img src={require("../../images/notice/safeguard/h1@safe.png")}/>
            </div>
            <ul styleName="safe-list1">
                <li styleName="clearfix">
                    <div styleName="safe-img1">
                        <img src={require("../../images/notice/safeguard/list11@safe.png")}/>
                    </div>
                    <div styleName="safe-text1">
                        <div styleName="safe-t11">贷前机构评估</div>
                        <div styleName="safe-t12">以定性评估和定量评估对合作对象进行360°全方位审核。</div>
                    </div>
                </li>
                <li styleName="clearfix">
                    <div styleName="safe-img1">
                        <img src={require("../../images/notice/safeguard/list12@safe.png")}/>
                    </div>
                    <div styleName="safe-text1">
                        <div styleName="safe-t11">贷中担保机制</div>
                        <div styleName="safe-t12">平台引入第三方担保机制，担保每笔出借项目。</div>
                    </div>
                </li>
                <li styleName="clearfix">
                    <div styleName="safe-img1">
                        <img src={require("../../images/notice/safeguard/list13@safe.png")}/>
                    </div>
                    <div styleName="safe-text1">
                        <div styleName="safe-t11">贷后项目管理</div>
                        <div styleName="safe-t12">实行不定期电话回访、定期下户调查的全方位贷后跟踪管理。</div>
                    </div>
                </li>
            </ul>
        </div>
        let safeBox3 = <div styleName="safe-box3">
            <div styleName="safe-h2"><img src={require("../../images/notice/safeguard/h2@safe.png")}/></div>
            <div styleName="safe-box31">
                <div styleName="safeBox31-t1">机构初审接入</div>
                <ul styleName="safeBox31-ul clearfix">
                    <li>
                        <div styleName="safeBox31-img">
                            <img src={require("../../images/notice/safeguard/list21@safe.png")}/>
                        </div>
                        <div styleName="safeBox31-text">企业经营审核</div>
                    </li>
                    <li>
                        <div styleName="safeBox31-img">
                            <img src={require("../../images/notice/safeguard/list22@safe.png")}/>
                        </div>
                        <div styleName="safeBox31-text">企业信用状况</div>
                    </li>
                    <li>
                        <div styleName="safeBox31-img">
                            <img src={require("../../images/notice/safeguard/list23@safe.png")}/>
                        </div>
                        <div styleName="safeBox31-text">企业担保审核</div>
                    </li>
                </ul>
            </div>
            <div styleName="safe-box32">
                <div styleName="safeBox32-t1">平台复审上线</div>
                <ul styleName="safeBox32-ul clearfix">
                    <li>
                        <div styleName="safeBox32-img">
                            <img src={require("../../images/notice/safeguard/list31@safe.png")}/>
                        </div>
                        <div styleName="safeBox32-text">信息复审</div>
                    </li>
                    <li>
                        <div styleName="safeBox32-img">
                            <img src={require("../../images/notice/safeguard/list32@safe.png")}/>
                        </div>
                        <div styleName="safeBox32-text">审批管理</div>
                    </li>
                    <li>
                        <div styleName="safeBox32-img">
                            <img src={require("../../images/notice/safeguard/list33@safe.png")}/>
                        </div>
                        <div styleName="safeBox32-text">贷后管理</div>
                    </li>
                </ul>
            </div>
        </div>
        let safeBox4 = <div styleName="safe-box4">
            <div styleName="safe-h3">
                <img src={require("../../images/notice/safeguard/h3@safe.png")}/>
            </div>
            <div styleName="safe-box41">
                <ul styleName="safeBox41-ul clearfix">
                    <li>
                        <div styleName="safeBox41-img">
                            <img src={require("../../images/notice/safeguard/list41@safe.png")}/>
                        </div>
                        <div styleName="safeBox41-text1">资金安全</div>
                        <div styleName="safeBox41-text2">签约徽商银行<br/>资金存管</div>
                    </li>
                    <li>
                        <div styleName="safeBox41-img">
                            <img src={require("../../images/notice/safeguard/list42@safe.png")}/>
                        </div>
                        <div styleName="safeBox41-text1">信息安全</div>
                        <div styleName="safeBox41-text2">隐私信息MD5加密<br/>遵守法律规则</div>
                    </li>
                    <li>
                        <div styleName="safeBox41-img">
                            <img src={require("../../images/notice/safeguard/list43@safe.png")}/>
                        </div>
                        <div styleName="safeBox41-text1">安全认证</div>
                        <div styleName="safeBox41-text2">网上交易保障<br/>中心平台认证</div>
                    </li>
                </ul>
            </div>
        </div>
        return <div styleName="saftcontainer appRemoveHead safe">
            {safeBox1}
            {safeBox2}
            {safeBox3}
            {safeBox4}
        </div>
    }
}

export default Safeguard