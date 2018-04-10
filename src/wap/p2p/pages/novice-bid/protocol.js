import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/novice-bid/protocol.css'
import Header from '../../components/header'
import {NativeBridge} from '../../helpers'


@inject('novice_bid')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class ReserveProtocolNovice extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.novice_bid.getContractHandler().then(data => {
            this.props.novice_bid.novice_bid_data.contractMsg = data.contractMsg
        })
    }

    render() {
        let {history, novice_bid} = this.props

        return <div styleName="protocol-box">
            <Header noClose title="预约出借服务协议" history={history}/>
            <div styleName="contractText" dangerouslySetInnerHTML={{__html: novice_bid.novice_bid_data.contractMsg}}>
            </div>
        </div>
    }
}

export default ReserveProtocolNovice