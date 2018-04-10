import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/current/records.css'
import {Utils, Event, Components} from 'fw-javascripts'

@inject('current')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Records extends React.Component {

    componentDidMount() {
        this.props.current.resetPageNo();
        this.props.current.fetchRecords()
        Event.touchBottom(this.props.current.fetchRecords)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    toggleTabHandler = (item) => {
        let {type} = this.props.current.data.records
        if (item == type) return
        this.props.current.resetType(item)
    }

    render() {
        let {current, history} = this.props
        let {type, tab} = this.props.current.data.records
        let {list} = current.data.records.tab[type]
        let tab_section = () => {
            let tab_func = (item, index) => {
                return <div styleName={item == type ? "tabItemOn" : "tabItem"} key={index}
                            onClick={() => this.toggleTabHandler(item)}>
                    {tab[item].name}
                </div>
            }
            return <div styleName="tabSection">
                {['0', '1', '2', '3'].map(tab_func)}
            </div>
        }

        let content_section = () => {
            let content_func = (item, index) => {
                let type_name, status_name
                if (item.orderStatus === '01') {
                    type_name = '转入'
                    if (item.orderStatus === '01') {
                        status_name = '申请成功'
                    } else if (item.orderStatus === '02') {
                        status_name = '部分起息'
                    } else {
                        status_name = '已起息'
                    }
                } else if (item.orderStatus === '02') {
                    type_name = '转出'
                    if (item.orderStatus === '01') {
                        status_name = '申请成功'
                    } else if (item.orderStatus === '02') {
                        status_name = '赎回成功'
                    } else if (item.orderStatus === '03') {
                        status_name = '部分赎回'
                    }
                } else if (item.orderStatus === '03') {
                    type_name = '收益'
                    if (item.orderStatus === '01') {
                        status_name = '待发'
                    } else if (item.orderStatus === '02') {
                        status_name = '已发'
                    }
                }
                return <div styleName="contentItem" key={index}
                            onClick={() => history.push(`/current/records/item?itemId=${item.id}`)}>
                    <div styleName="itemLine">
                        <div styleName="itemLeft itemTitle">{type_name}</div>
                        <div styleName="itemRight colorRed">{item.orderFund}</div>
                    </div>
                    <div styleName="itemLine itemDown">
                        <div styleName="itemLeft itemTime">{item.orderTime}</div>
                        <div styleName="itemRight itemDes">{status_name}</div>
                    </div>
                </div>
            }
            return <div styleName="content">
                {list.map(content_func)}
            </div>
        }
        return <div styleName="recordsBg">
            <Header title="交易详情" history={history}/>
            {tab_section()}
            {content_section()}
        </div>
    }
}

export default Records