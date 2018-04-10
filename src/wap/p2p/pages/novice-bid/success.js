import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/novice-bid/success.css'
import Header from '../../components/header'
import {NativeBridge} from '../../helpers'
import {Utils} from 'fw-javascripts'


@inject('novice_bid')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class ReserveSuccess extends React.Component {
    state = {is_used: false}

    componentDidMount() {
        this.setState({is_used: Utils.hashQuery.is_used})
    }

    toRecordsHandler = () => {
        let {history} = this.props
        history.push('/reserve-bid/records')
    }

    render() {
        let {history, novice_bid} = this.props
        return <div styleName="successPanel">
            <Header noClose title="抢购成功" history={history}/>
            <div styleName="content">
                <div styleName="icon"></div>
                <div styleName="tips">新手标抢购成功</div>
                {this.state.is_used === 'true' &&
                <div><span styleName="colorRed">20元</span>现金奖励已经发放至您的账户，请查收</div>}
            </div>
            <div styleName="toRecords" onClick={this.toRecordsHandler}>查看记录</div>
            <div styleName="toHome" onClick={() => NativeBridge.close()}>返回首页</div>
        </div>

    }
}

export default ReserveSuccess