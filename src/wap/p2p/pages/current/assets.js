import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/current/assets.css'
import { Utils, Event, Components } from 'fw-javascripts'

@inject('current')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class Assets extends React.Component {
    _timer = null

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.current.fetchProduct()
        this.props.current.fetchAssets().then(data => {
            const chart_data = {
                title: data.dates,
                data: data.profitRecords
            }
            this._timer = setTimeout(() => {
                window.frames[0].postMessage(chart_data, '*')
            }, 1000)
        })

    }

    componentWillUnmount() {
        clearTimeout(this._timer)
    }

    render() {
        let history = this.props.history
        let { productInfo } = this.props.current.data
        let banner_section = () => {
            return <div styleName="banner">
                <div styleName="bannerTop">
                    <div styleName="topDes">总资产(元)</div>
                    <div styleName="topNum">{productInfo.totalMoney}</div>
                </div>
                <div styleName="bannerBottom">
                    <div styleName="downLeft">
                        <div styleName="leftUp">昨日收益(元)</div>
                        <div styleName="leftDown">{productInfo.lastProfit}</div>
                    </div>
                    <div styleName="downRight">
                        <div styleName="leftUp">累计收益(元)</div>
                        <div styleName="leftDown">{productInfo.totalInteret}</div>
                    </div>
                </div>
            </div>
        }
        let chart_section = () => {
            return <div styleName="chartWrapper">
                <div styleName="sectionTitle">近7日收益</div>
                <iframe src="https://static.9888.cn/pages/wap/chart-current/" width="100%" height="400"
                    frameborder="no" border="0" scrolling="no"></iframe>
            </div>
        }
        let links_section = () => {
            return <div styleName="links">
                <div styleName="linksItem" onClick={() => history.push('/current/records')}>
                    <div styleName="itemLeft">
                        <span styleName="icon iconDetail"></span>
                        <span>交易详情</span>
                    </div>
                    <div styleName="itemRight"></div>
                </div>
                <div styleName="linksItem">
                    <div styleName="itemLeft">
                        <span styleName="icon iconPro"></span>
                        <span>在投项目</span>
                    </div>
                    <div styleName="itemRight"></div>
                </div>
            </div>
        }

        return <div styleName="assetsBg">
            <Header title="智存宝资产" />
            {banner_section()}
            {chart_section()}
            {links_section()}

            <div styleName="bottom">
                <div styleName="bItem">债权转出</div>
                <div styleName="bItem bItem2">转入</div>
            </div>
        </div>
    }
}

export default Assets