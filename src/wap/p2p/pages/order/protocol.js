import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/order/protocol.css'
import Header from '../../components/header'
import {NativeBridge} from '../../helpers'


@inject('order')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Protocol extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.order.getContractHandler().then(data => {
            this.props.order.contractMsg = data.contractMsg
        })
    }

    render() {
        let {history, order} = this.props

        return <div styleName="protocol-box">
            <Header noClose title="预约出借服务协议" history={history}/>
            <div styleName="contractText" dangerouslySetInnerHTML={{__html: order.contractMsg}}>
            </div>
        </div>
    }
}

export default Protocol