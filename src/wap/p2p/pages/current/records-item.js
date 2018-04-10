import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/current/records-item.css'
import { Utils } from 'fw-javascripts'

@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class RecordsItem extends React.Component {
    componentDidMount() {
        console.log(Utils.hashQuery.itemId)
    }

    render() {
        let history = this.props.history
        let info_section = () => {
            return <div styleName="info">
                <div styleName="number">+3,000.00</div>
                <div styleName="name">转入金额(元)</div>
            </div>
        }
        let detail_section = () => {
            return <div styleName="detailWrapper">
                <div styleName="detailItem">
                    <div styleName="itemLeft">交易类型</div>
                    <div styleName="itemRight">智存宝转入</div>
                </div>
                <div styleName="detailItem">
                    <div styleName="itemLeft">交易时间</div>
                    <div styleName="itemRight">2017-10-18 10:00:00</div>
                </div>
                <div styleName="detailItem">
                    <div styleName="itemLeft">资金状态</div>
                    <div styleName="itemRight colorBlue">已起息</div>
                </div>
                <div styleName="detailItem">
                    <div styleName="itemLeft">起息金额</div>
                    <div styleName="itemRight colorRed">3,000.00元</div>
                </div>
                <div styleName="detailItem">
                    <div styleName="itemLeft">智存宝服务协议</div>
                    <div styleName="itemRight"><span styleName="iconArrow"></span></div>
                </div>
            </div>
        }
        return <div styleName="detailBg">
            <Header title="转入详情" history={history} />
            {info_section()}
            {detail_section()}
        </div>
    }
}

export default RecordsItem