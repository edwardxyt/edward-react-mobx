import React from 'react'
import CSSModules from 'react-css-modules'

// import { showAdoptSuccess } from '../components'

import styles from '../css/pick.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Pick extends React.Component {

    _CHARACTORS = {
        '1': {
            name: '绅士'
        },
        '2': {
            name: '巫师'
        },
        '3': {
            name: '武侠'
        },
        '4': {
            name: '小丑'
        },
        '5': {
            name: '超人',
            locked: true
        },
        '6': {
            name: '地主',
            locked: true
        }
    }

    state = {
        pick: null
    }

    handlePick = no => () => this.setState({ pick: no })

    handleAdopt = () => {
        const { pick } = this.state;
        if (!pick) return

        // request
        Promise.resolve()
        // .then(showAdoptSuccess)
    }

    render() {
        const { pick } = this.state;

        return <div styleName="bg">
            <div styleName="banner" />

            { Object.keys(this._CHARACTORS).map(ck => {
                const { name, locked } = this._CHARACTORS[ck],
                    picked = this.state.pick === ck;
                return <div key={ck} onClick={this.handlePick(ck)}
                    styleName={ locked ? `charactor-${ck}-locked` : (picked ? `charactor-${ck}-picked` : `charactor-${ck}`)}>
                    <div styleName="name" style={{ backgroundColor: picked ? '#fd4d4c' : '#9a98f3'}}>
                        {name}
                    </div>
                </div>
            }) }

            <div styleName="next-btn-placeholder">
                <div styleName="next-btn-area">
                    <div styleName={ pick ? "next-btn" : "next-btn-disabled"}
                        onClick={this.handleAdopt}>
                        { pick ? '确认领养' : '请选择领养形象'}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Pick