import React from 'react'
import CSSModules from 'react-css-modules'
import { getJSONP } from 'fw-javascripts'

import { Header } from '../../components'
import { Browser, NativeBridge, Get } from '../../helpers'
import styles from '../../css/topic/rewarding.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class Rewarding extends React.Component {

    state = {
        user_level: '',
        level_rewardings: []
    }

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        getJSONP('https://www.gongchangzx.com/api/userLevel/v1/giftVO.json')
            .then(data => {
                if (data.code != 10000)
                    throw new Error('接口异常, 无法获取等级反息信息')

                let level_rewardings = []

                var rule = data.data.levelGiftRule;

                for (var i = 0; i < rule.length; i++) {
                    var interest = rule[i].addInterest;
                    var n = parseFloat(interest && interest.describe);
                    level_rewardings.push(n || null)
                }

                this.setState({ level_rewardings: level_rewardings })

            })

        Get('/api/v1/user/level-info.shtml')
            .then(data => {
                let level = data.userLevel - 1;
                let txt = level > 0 ? 'VIP' + level : '普通会员';
                this.setState({ user_level: data.userLevel - 1 })
            })
    }

    gotoInvest = () => {
        Browser.inApp ?
            NativeBridge.close() :
            location.href = 'https://m.9888.cn/mpwap'
    }

    render() {

        let { user_level, level_rewardings } = this.state

        let reward = level => {
            let v = level_rewardings[level]
            return v ? `${v}%` : '-'
        }

        let user_reward = level_rewardings[user_level]

        return <div styleName="bg">
            <Header title="年化加息奖励" history={this.props.history} />

            <div styleName="user-level">
                <div styleName="text">您当前的会员等级是</div>
                <span styleName="level">{
                    user_level > 0 ? `VIP${user_level}` : '普通会员'
                }</span>
                <div styleName="interest">
                    <div styleName="interest-text">年化加息奖励为</div>
                    <div styleName="interest-value">
                        <b>{user_reward || '无'}</b>
                        {user_reward && <span>%</span>}
                    </div>
                </div>
            </div>
            <img styleName="img" src="images/img-2.png" />

            <div styleName="table">
                <div>
                    <span styleName="yellow">年化加息奖励</span> 是一项VIP特权。用户投资时，根据用户投资后的VIP等级，来给用户加息。 </div>

                <div styleName="row row-a row-first">
                    等级 <div>年化加息奖励</div>
                </div>
                <div styleName="row row-b">
                    普通会员
                    <div>{reward(0)}</div>
                </div>
                <div styleName="row row-c">
                    VIP1
                    <div>{reward(1)}</div>
                </div>
                <div styleName="row row-b">
                    VIP2
                    <div>{reward(2)}</div>
                </div>
                <div styleName="row row-c">
                    VIP3
                    <div>{reward(3)}</div>
                </div>
                <div styleName="row row-b row-last">
                    VIP4
                    <div>{reward(4)}</div>
                </div>

            </div>
            <img styleName="img"
                src={require("../../images/topic/rewarding/img-3.png")} />

            <a styleName="invest" onClick={this.gotoInvest}>
                <img src={require("../../images/topic/rewarding/img-4.png")} />
            </a>

        </div>
    }
}

export default Rewarding