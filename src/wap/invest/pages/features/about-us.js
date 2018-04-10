import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../components'
import styles from '../../css/features/about-us.css'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore' 
})
class AboutUs extends React.Component {

    render() {
        return <div styleName="bg">
            <Header noClose title="关于我们" history={this.props.history} />

            <div styleName="title">平台简介</div>
            <div styleName="desc">
                <div>
                    金融工场，品牌创立于2012年，是中国领先的综合金融信息服务平台。平台以金融全球化发展趋势为契机，融合信息技术创新手段，秉承安全、专业、透明的经营理念，为用户提供多样化高效智能的金融产品，为企业和个人提供定制化金融服务解决方案。平台在交易品种与交易组织模式上持续创新，优化金融资产配置，提供多样化金融产品,让每个用户都能平等、轻松、高效地享受互联网金融服务，享有高品质金融生活。
                </div>
                <img src={require("../../images/features/about-us/part2.jpg")} width="720" height="auto" />
            </div>


            <div styleName="title">客服电话</div>
            <div styleName="desc">
                <a href="tel:400-0322-988">400-0322-988</a>
                周一至周日 9:00-18:00 </div>
            <div styleName="title">公司地址</div>
            <div styleName="desc"> 北京市朝阳区朝阳门外大街18号11层1105内008号</div>

            <div styleName="footer">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <a href='https://www.9888.cn/top/index.do?pc=1'>PC首页</a>
                            </td>
                            <td>
                                <a href='https://bbs.9888.cn'>工友之家</a>
                            </td>
                            <td>
                                <a href="/static/wap/app-download/index.html">下载App</a>
                            </td>
                            <td>
                                <a href="/static/wap/about-us/index.html">关于我们</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div styleName="copyright">©2017 金融工场版权所有</div>
                <div styleName="copyright">北京凤凰信用管理有限公司</div>
            </div>

            <a styleName="app-download-link" href="/static/wap/app-download/index.html">
                <img src={require("../../images/features/about-us/ico-loadapp.png")} />
            </a>
        </div>
    }
}

export default AboutUs