import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../components'
import styles from '../css/not-found.css'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore' 
})
class NotFound extends React.Component {

    render() {
        return <div styleName="bg">
            <Header title="404" history={this.props.history} />
            <img styleName="img" src={require('../images/not-found/404bg.png')} />
            <div styleName="txt">404</div>
            <div styleName="txt">找不到页面了</div>
            <div styleName="txt">react router miss match</div>
        </div>
    }
}

export default NotFound