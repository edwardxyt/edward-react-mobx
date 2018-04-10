import React from 'react'
import CSSModules from 'react-css-modules'

import { Get } from '../../helpers'

import { Header } from '../../components'

import styles from '../../css/user/level.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class Level extends React.Component {


    state = {
        cardOrder: [4, 0, 1, 2, 3], // second element to be the 'foremost'
        userLevel: 0,
        badges: [],
        tip: '',
        contributeValue: '',
        contributePercent: '',
        touchX: [],
    }

    componentDidMount() {
        document.title = '会员等级';

        // Get('/mpwap/api/v1/user/level-info.shtml').then(data => {
        //     const level = Number(data.userLevel) - 1;
        //     this.setState({
        //         cardOrder: [level]
        //         level: level,
        //         badges: data.levelGifts.sort((a, b) => a.level - b.level),
        //         tip: data.leveHint,
        //         contributeValue: data.contributeValue,
        //         contributePercent: data.contributePercent,
        //     });
        // })
    }

    updatecardOrder = foremost => {
        this.setState({ cardOrder: [
            (foremost + 4) % 5,
            (foremost    ) % 5,
            (foremost + 1) % 5,
            (foremost + 2) % 5,
            (foremost + 3) % 5
        ] })
    }

    handleCardScroll = e => {
        const touchClientX = e.changedTouches[0].clientX,
            touchX = [...this.state.touchX];
        touchX.push(touchClientX);
        this.setState({ touchX: touchX })
    }

    handleTouchMove = e => {
        const { touchX } = this.state,
            touchClientX = e.changedTouches[0].clientX,
            foremost = this.state.cardOrder[1],
            touchMoveDeltaX = touchClientX - touchX[0];
        if (Math.abs(touchMoveDeltaX) > 360) {
            const newForemost = foremost + Number(touchMoveDeltaX < 0);
            this.updatecardOrder(newForemost)
        }
    }

    _genCardGrp = cardNo => <div key={`card-${cardNo}`} styleName={`card-${cardNo}`}></div>


    render() {
        const { cardOrder } = this.state;
        return <div>
            <Header title="会员等级" history={this.props.history} />

            <div styleName="card-grp" onTouchMove={this.handleTouchMove} onTouchStart={this.handleCardScroll} onTouchEnd={this.handleCardScroll}>
                { cardOrder.map(this._genCardGrp) }
            </div>

        </div>
    }

}

export default Level