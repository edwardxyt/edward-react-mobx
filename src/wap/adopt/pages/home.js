import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import styles from '../css/home.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Home extends React.Component {
    state = {
        cnt: '-',
        toNextLevel: '-',
        treasureCnt: 0,
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            cnt: 33,
            toNextLevel: 27,
            treasureCnt: 1,
        }), 300)
    }

    calCntWidth = () => {
        const WIDTH_INITIAL = 38,
            GROW_MAX = 503 - WIDTH_INITIAL,
            CNT_MAX = 60;
        const { cnt } = this.state;
        return cnt == '-' ? '' : `${WIDTH_INITIAL + GROW_MAX * cnt / CNT_MAX}px`
    }

    render() {
        const { cnt, toNextLevel, treasureCnt } = this.state;

        return <div styleName="bg">
            <div styleName="cnt-container">
                <div styleName="cnt" style={{ width: this.calCntWidth() }} />
                <span>累计签到 {cnt} 天</span>
                <div styleName="to-next-level-tip">
                    距离成长到下个阶段还有 <b>{toNextLevel}</b> 天
                </div>
            </div>

            <div styleName="intro" />

            <div styleName="dou-ge">
                <div styleName="dou-ge-bubble">
                    <span styleName="dou-ge-bubble-text">
                        偷偷告诉你~连续7天喂豆哥，豆哥会陪你一起赚工分呦~
                    </span>
                </div>
                <img src="/" />
            </div>

            <div styleName="check-in-btn">
                <div styleName="check-in-bubble" />
            </div>

            <Link styleName="collection-entry" to="/collection" />

            <Link styleName="treasure-entry" to="/treasure" >
                { treasureCnt > 0 && <div styleName="treasure-cnt">{treasureCnt}</div> }
            </Link>

            <div styleName="notification">
                <i />
                签到提醒
                <span>连续签到7天可获得200工分</span>
                <div styleName="turn-on-notification">
                    <i />
                    <span>开启</span>
                </div>
            </div>
        </div>
    }
}

export default Home