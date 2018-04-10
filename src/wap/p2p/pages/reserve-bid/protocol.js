import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/reserve-bid/protocol.css'
import Header from '../../components/header'
import {NativeBridge} from '../../helpers'


@inject('reserve_bid')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class ReserveProtocol extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve_bid.getContractHandler().then(data => {
            this.props.reserve_bid.bid_data.contractMsg = data.contractMsg
        })
    }

    render() {
        let {history, reserve_bid} = this.props

        return <div styleName="protocol-box">
            <Header noClose title="预约出借服务协议" history={history}/>
            <div styleName="contractText" dangerouslySetInnerHTML={{__html: reserve_bid.bid_data.contractMsg}}>
            </div>
        </div>
    }
}

export default ReserveProtocol