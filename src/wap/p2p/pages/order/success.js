import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../../css/order/success.css'
import {NativeBridge} from '../../helpers/'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'

@inject('order')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Success extends React.Component {
    state = {
        accountAmount: null
    }

    componentDidMount() {
        this.props.order.submitHandler().then(data => this.setState({accountAmount: data.appointInvestSuccessAmt}))
    }

    render() {
        let {accountAmount} = this.state
        return <div styleName="successPanel">
            <Header title="预约成功" history={this.props.history}/>
            <div styleName="main">
                <div styleName="pic"></div>
                <div styleName="text">转入成功</div>
                <div styleName="number">
                    <span styleName="numerName">预约金额：</span>
                    <span styleName="colorRed">{accountAmount}元</span>
                </div>
                <div styleName="tips">系统将根据交易情况，尽快为您匹配债券并起息。平台将依据最终匹配成功的总金额，发放优惠券返现、工分、贡献值、奖励加息。</div>
            </div>
            <div styleName="btn btnRed" onClick={() => this.props.history.push('/order/records')}>查看我的预约</div>
            <div styleName="btn btnBlue" onClick={() => NativeBridge.toNative('close')}>返回首页</div>
        </div>
    }
}

export default Success
