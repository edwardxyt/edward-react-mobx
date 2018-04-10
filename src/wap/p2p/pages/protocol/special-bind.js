import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components/'
import styles from '../../css/protocol/special-bind.css'
import { NativeBridge } from '../../helpers'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore' 
})
export default class SpecialBind extends React.Component {
    render() {

        let { history } = this.props

        return <div styleName="bg">
            <Header title="绑定银行卡" history={history} />

            <div styleName="content">
            
            由于您的身份信息无法通过系统验证，为了保证您的账户资金安全，您当前无法进行线上充值、投资、更换银行卡等交易。您当前的账户资金安全无虞，若有可用余额，可自行发起提现申请。
            
            <br /><br />有任何问题，请联系客服：400-0322-988
            
            </div>

        </div>
    }
}
