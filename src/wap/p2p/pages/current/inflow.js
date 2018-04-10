import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/current/inflow.css'
import {Utils, Event, Components} from 'fw-javascripts'

@inject('current')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Inflow extends React.Component {

    componentDidMount() {
        this.props.current.fetchInflowInfo()
    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")
        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.current.setFormData(name, `${v[0]}.${v[1]}`, 'data')
        } else {
            this.props.current.setFormData(name, e.target.value, 'data')
        }

    }

    submitHandler = () => {
        let {inflowInfo, inflowAmount} = this.props.current.data
        if (inflowAmount === '') {
            Components.showToast('转入金额不能为空')
        } else if (inflowAmount < inflowInfo.minAmount) {
            Components.showToast('转入金额不能低于100')
        } else if (inflowAmount > inflowInfo.maxAmount) {
            Components.showToast('余额不足，请充值')
        } else {
            this.props.current.submitInflow().then(data => {
                console.log(data)
            })
            Components.showToast('转入成功')
            //next step
            // this.props.history.push('/current/')
        }
    }

    render() {
        let {inflowInfo, inflowAmount} = this.props.current.data
        let info_section = () => {
            return <div styleName="info">
                <div styleName="infoItem">
                    <div styleName="itemTop">个人投资上限(元)</div>
                    <div styleName="itemDown">{inflowInfo.maxAmount}</div>
                </div>
                <div styleName="infoItem">
                    <div styleName="itemTop">剩余可投金额(元)</div>
                    <div styleName="itemDown">{inflowInfo.amount}</div>
                </div>
            </div>
        }
        let content_section = () => {
            return <div styleName="content">
                <div styleName="title">转入金额</div>
                <div styleName="entrance">
                    <span styleName="rmb">&yen;</span>
                    <input type="number" placeholder="请输入转入金额，100元起" styleName="input"
                           onChange={this.inputChangeHandler('inflowAmount')}
                           value={inflowAmount}
                    />
                </div>
                <div styleName="line">
                    <div styleName="lineLeft">
                        <span styleName="balanceDes">可用余额：</span>
                        <span styleName="balanceNum">{inflowInfo.cashBalance}元</span>
                    </div>
                    <div styleName="lineRight">充值</div>
                </div>
                <div styleName="line">
                    <div styleName="lineLeft">
                        <span styleName="balanceDes">预期每日收益：</span>
                        <span styleName="balanceNum colorRed">{inflowAmount}元</span>
                    </div>
                </div>
            </div>
        }
        let pro_section = () => {
            return <div styleName="protocol">
                <span styleName="checkBtn"></span>
                <span styleName="proText">同意<span styleName="colorBlue">《智存宝服务协议》</span></span>
            </div>
        }
        let submit_section = () => {
            return <div styleName="submit" onClick={this.submitHandler}>
                确认转入
            </div>
        }
        let des_section = () => {
            return <div styleName="rulerDes">
                <span styleName="icon"></span>
                <span styleName="text">智存宝规则说明</span>
            </div>
        }
        return <div styleName="inflowBg">
            <Header title="转入"/>
            {info_section()}
            {content_section()}
            {pro_section()}
            {submit_section()}
            {des_section()}
        </div>
    }
}

export default Inflow