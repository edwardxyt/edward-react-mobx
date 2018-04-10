import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../components'
import styles from '../../css/features/big-deal.css'

@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})
class BigDeal extends React.Component {

    render() {
        return <div styleName="bg">
            <img src={require('../../images/features/big-deal/1.jpg')} />
            <img src={require('../../images/features/big-deal/2.jpg')} />
            <img src={require('../../images/features/big-deal/3.jpg')} />
            <img src={require('../../images/features/big-deal/4.jpg')} />
            <img src={require('../../images/features/big-deal/5.jpg')} />
            <img src={require('../../images/features/big-deal/6.jpg')} />
            <img src={require('../../images/features/big-deal/7.jpg')} />
        </div>
    }
}

export default BigDeal