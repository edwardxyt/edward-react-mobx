import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/collection.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Collection extends React.Component {
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
            name: '超人'
        },
        '6': {
            name: '地主'
        }
    }

    state = {
        total: '--',
        info: {
            '1': '--',
            '2': '--',
            '3': '--',
            '4': '--',
            '5': '--',
            '6': '--',
        }
    }

    componentDidMount() {
        this.setState({
            total: 6,
            info: {
                '1': 3,
                '2': 2,
                '3': 1,
                '4': 0,
                '5': 0,
                '6': 0,
            }
        })
    }

    render() {
        const { total, info } = this.state;

        return <div styleName="bg">
            <div styleName="total">共养成 <b>{total}</b> 只</div>

            { Object.keys(this._CHARACTORS).map(ck => {
                const { name } = this._CHARACTORS[ck],
                    cnt = info[ck];
                return <div key={ck}
                    styleName={cnt > 0 ? `charactor-${ck}-adopted` : `charactor-${ck}`}>
                    <div styleName="name">
                        {`${name} × ${cnt}`}
                    </div>
                </div>
            }) }
        </div>
    }
}

export default Collection