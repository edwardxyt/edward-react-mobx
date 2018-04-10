import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components, Utils, Event } from 'fw-javascripts'

import { Header } from '../../components'
import { Get, NativeBridge } from '../../helpers'
import styles from '../../css/user/contribute.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class Contribute extends React.Component {

    state = {
        basic: {},
        tab: 'invest',
        invest_page: 1,
        invest_list: [],
        invite_page: 1,
        invite_list: []
    }

    componentDidMount() {
        NativeBridge.trigger('hide_header')

        Get('/api/v1/user/contribute.shtml?page=1&rows=1&type=0').then(data => {
            this.setState({ basic: data })
        })

        this.loadMore()
        setTimeout(() => Event.touchBottom(this.loadMore), 3000)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    switchTab = tab => {
        if (this.state.tab == tab) return

        this.setState({ tab: tab }, this.loadMore)
    }

    loadMore = () => {
        let { tab, invest_page, invite_page } = this.state

        if (tab == 'invest' && invest_page != 0)
            this.loadMoreInvest()

        if (tab == 'invite' && invite_page != 0)
            this.loadMoreInvite()
    }

    loadMoreInvest = () => {
        const PAGE_COUNT = 20

        Get('/api/v1/user/contribute/invest.shtml', {
            page: this.state.invest_page,
            type: 0,
            rows: PAGE_COUNT
        }).then(data => {
            let page = data.data.length >= PAGE_COUNT ? this.state.invest_page++ : 0

            this.setState({
                invest_page: page,
                invest_list: this.state.invest_list.concat(data.data)
            })
        })
    }

    loadMoreInvite = () => {
        const PAGE_COUNT = 20

        Get('/api/v1/user/contribute/invite.shtml', {
            page: this.state.invite_page,
            type: 1,
            rows: PAGE_COUNT
        }).then(data => {
            let page = data.data.length >= PAGE_COUNT ? this.state.invite_page++ : 0

            this.setState({
                invite_page: page,
                invite_list: this.state.invite_list.concat(data.data)
            })
        })
    }

    render() {

        let { basic, tab, invest_page, invest_list, invite_page, invite_list } = this.state

        let empty_txt
        if (tab == 'invest' && invest_page == 0 && invest_list.length == 0)
            empty_txt = '暂无投资贡献值'

        if (tab == 'invite' && invite_page == 0 && invite_list.length == 0)
            empty_txt = '暂无邀友贡献值'

        let empty_holder = empty_txt && <div styleName="empty-holder">{empty_txt}</div>

        let list_item = (i, index) => {
            return <div key={index + i.title} styleName="list-item">
                <div styleName="title">{i.title}
                    <div styleName="pull-right">贡献值: <b>{i.contributeValue}</b></div>
                </div>

                <div styleName="detail">
                    <div>本金: ¥{i.money}</div>
                    <div styleName="pull-right">年化投资额度: ¥{i.earn_money}</div>
                    <div>投资日期{i.apply_date}</div>
                    <div styleName="pull-right">计划回款日{i.returned_date}</div>
                </div>
            </div>
        }

        return <div styleName="bg">
            <Header title="我的贡献值" history={this.props.history} />

            <div styleName="basic">
                <div styleName={`user-level user-level-${basic.userLevel - 1}`}>会员等级</div>
                总贡献值
                <div styleName="goals">{basic.contributeValue}</div>
                投资贡献值{basic.investmentContribution}
                + 邀友贡献值{basic.inviteContributeValue}
            </div>
            <div styleName="tab">
                <a styleName={tab == 'invest' && 'active'}
                    onClick={() => this.switchTab('invest')}>投资贡献值</a>
                <a styleName={tab == 'invite' && 'active'}
                    onClick={() => this.switchTab('invite')}>邀友贡献值</a>
            </div>

            {tab == 'invest' && invest_list.map(list_item)}
            {tab == 'invite' && invite_list.map(list_item)}

            {empty_holder}

        </div >
    }
}

export default Contribute