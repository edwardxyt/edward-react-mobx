import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/current/protocol.css'

@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class Protocol extends React.Component {
    render() {
        return <div>
            <Header title="协议" />
        </div>
    }
}

export default Protocol