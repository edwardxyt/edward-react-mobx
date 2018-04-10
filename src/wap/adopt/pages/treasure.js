import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/treasure.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Treasure extends React.Component {
    state = {
        chanceLeft: '--',
        toNextTreasure: '--',
        record: []
    }

    componentDidMount() {
        this.setState({
            chanceLeft: 0,
            toNextTreasure: 20,
            record: [{
                time: '2018-12-12 00:01:02',
                treasure: '1000工分'
            }, {
                time: '2018-12-12 00:01:02',
                treasure: '1000工分'
            }, {
                time: '2018-12-12 00:01:02',
                treasure: '1000工分'
            }]
        })
    }

    render() {
        const { chanceLeft, toNextTreasure, record } = this.state;

        return <div styleName="bg">
            <div styleName="tip">
                <div styleName="tip-1">
                    剩余挖宝机会
                    <i />
                    ×
                    <span>{chanceLeft}</span>
                </div>
                <div styleName="tip-2">
                    距离下次挖宝还需要签到 <span>{toNextTreasure}</span> 天
                </div>
            </div>

            <div styleName="record-container">
                <div styleName="record">
                    { record.map((r, i) => <div styleName="record-item" key={i}>
                        <div styleName="record-time">{r.time}</div>
                        <div styleName="record-treasure">
                            挖出 <span>{r.treasure}</span>
                        </div>
                    </div> ) }
                </div>
            </div>
            <div styleName="record-title" />
        </div>
    }
}

export default Treasure