import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/interest-reward.css'
import {observer, inject} from 'mobx-react'
import {Header} from '../components'
import {Get, Browser, NativeBridge} from '../helpers'
import {getJSONP} from 'fw-javascripts'

@CSSModules(styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class InterestRewords extends React.Component {
    state = {
        user_level: '',
        year_reward: '',
        level_list: []
    }

    componentDidMount() {
        getJSONP('https://www.gongchangzx.com/api/userLevel/v1/giftVO.json')
            .then(data => {
                if (data.code != 10000) throw new Error('接口异常, 无法获取等级反息信息');
                let rule = data.data.levelGiftRule, interest_list = [], result_list = [];
                for (let i = 0; i < rule.length; i++) {
                    let interest = rule[i].addInterest;
                    interest_list.push(rule[i].addInterest);
                    let n = parseFloat(interest && interest.describe);
                    result_list.push(n)
                }
                this.setState({level_list: result_list})
                Get('/api/v1/user/level-info.shtml')
                    .then(data => {
                        let level = data.userLevel - 1;
                        let data_level = level > 0 ? 'VIP' + level : '普通会员'
                        let n = parseFloat(interest_list[level] && interest_list[level].describe);
                        let v = n ? n : "无";
                        let data_year = (v == "无" ? "无" : `${v}%`)
                        this.setState({user_level: data_level, year_reward: data_year})
                    })
            })

    }

    gotoInvestHandler = () => {
        if (Browser.inApp) {
            NativeBridge.close();
        } else {
            location.href = location.protocol + '//m.9888.cn/mpwap'
        }
    }

    render() {
        let {user_level, year_reward, level_list} = this.state
        let level_line = (item, index) => {
            let odd_style = index % 2 == 0 ? 'row-b' : 'row-c'
            return <div styleName={`row ${odd_style}`} key={index}>
                {index == 0 ? '普通会员' : `VIP${index}`}
                <div id="add-interest-text-0" styleName="div">{item ? `${item}%` : '-'}</div>
            </div>
        }

        let header_section = () => {
            if (Browser.inApp) {
                return NativeBridge.setTitle('年化加息奖励')
            } else {
                return <Header title='年化加息奖励' history={this.props.history}/>
            }
        }
        return <div styleName="interest-box">
            {header_section()}
            <div styleName="user-level">
                <div styleName="text"> 您当前的会员等级是</div>
                <span styleName="level" id="level">{user_level}</span>
                <div styleName="interest">
                    <div styleName="interest-text">年化加息奖励为</div>
                    <div styleName="interest-value">
                        <b id="interest">{year_reward}</b>
                        <span id="percent" style={{"visibility": "hidden"}}>%</span>
                    </div>
                </div>
            </div>
            <img styleName="img" src={require("../images/interest-reward/img-2.png")}/>
            <div styleName="table">
                <div>
                    <span styleName="yellow">年化加息奖励</span> 是一项VIP特权。用户出借时，根据用户出借后的VIP等级，来给用户加息。
                </div>

                <div styleName="row row-a row-first">
                    等级
                    <div styleName="div">年化加息奖励</div>
                </div>
                {level_list.map(level_line)}
            </div>
            <img styleName="img" src={require("../images/interest-reward/img-3.png")}/>
            <a styleName="invest" onClick={this.gotoInvestHandler}>
                <img src={require("../images/interest-reward/img-4.png")}/>
            </a>
        </div>
    }
}

export default InterestRewords

