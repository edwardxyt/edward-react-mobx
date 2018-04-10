import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../../css/topic/school.css'
import { Ajax, Browser } from '../../helpers'


function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if (Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

const TABS = [
    ["出借百科", 34], ["出借人技巧", 35], ["出借讲堂", 36]
]

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class School extends React.Component {

    state = {
        tab: '出借百科',
        banner: '', // not used
        items_34: [],
        items_35: [],
        items_36: [],
        items: {}
    }

    componentDidMount = () => {
        this.fetchBanner()
        TABS.forEach(i => {
            this.fetchItems(i[0], i[1])
        })
    }

    fetchBanner() {
        Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: 37 // 37
            },
            silence: true,
            loading: false
        }).catch(data => this.setState({ banner: data[0].thumb }))
    }

    switchTabHandler = t => {
        this.setState({ tab: t })
    }

    fetchItems = (tab, id) => {
        Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: id
            },
            silence: true,
            loading: false
        }).catch(data => {

            let items = this.state.items
            items[tab] = data

            this.setState({ items: items })

        })
    }

    render() {

        let tab_item = (i, index) => {
            let title = i[0], id = i[1]
            let cn = this.state.tab == title ? "tab selected" : 'tab'

            return <div styleName="tabBlock" key={index}
                onClick={() => this.switchTabHandler(title)}>
                <div styleName={cn}>{title}</div>
            </div>
        }

        let qa_item = (item, index) => {
            return <a styleName="cell" key={index} href={item.url}>
                <div styleName="cellText">{item.title}</div>
                <img styleName="iconArrow" src={require("../../images/topic/school/arrow.png")} />
            </a>
        }

        let data = this.state.items[this.state.tab] || []
        // if (!(data instanceof Array)) data = []

        return <div styleName="bg">
            <img styleName="banner" src={require('../../images/topic/school/banner.jpg')} />

            <div styleName="tabGroup">
                {TABS.map(tab_item)}
                <i styleName="dashed1"></i>
                <i styleName="dashed2"></i>
            </div>
            <div styleName="space"></div>
            <div styleName="list"> {data.map(qa_item)}</div>

        </div>
    }
}

export default School