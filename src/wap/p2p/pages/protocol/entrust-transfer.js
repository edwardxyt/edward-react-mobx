import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components/'
import styles from '../../css/protocol/entrust-transfer.css'
import { NativeBridge } from '../../helpers'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore' 
})
class EntrustTransfer extends React.Component {
    render() {

        let { history } = this.props

        return <div styleName="bg">
            <Header title="出借人委托划款授权书" history={history} />

            <div styleName="content">
                鉴于您作为工场微金平台用户，将通过北京凤凰信用管理有限公司（以下简称“我司”）运营的工场微金平台进行资金出借，为我司更好的向您提供服务，您特此向我司进行如下授权

                <br /><br />1.授权事项
                <br /><br />您不可撤销地同意并授权北京凤凰信用管理有限公司指示其合作的存管银行，从您银行卡账户、存管银行电子账户内划转您应向相关方支付的款项，并直接支付给各相关方。
                <br /><br />2.授权委托期限 ；
                <br /><br />自您确认之日起至您在《出借人咨询服务协议》、《借款合同》、《债权转让协议》及相关的协议项下的支付义务履行完毕之日止。
                <br /><br />3.其他
                <br /><br />您在工场微金平台上以点击勾选方式签订本授权书，并认可该授权书的法律效力。
            </div>

        </div>
    }
}

export default EntrustTransfer