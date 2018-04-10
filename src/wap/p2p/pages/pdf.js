import React from 'react'
import {Utils} from 'fw-javascripts'

import {Header} from '../components'


class PDF extends React.Component {

    render() {

        let file = Utils.hashQuery.file

        return <div>
            {/*<Header title="法律法规" history={this.props.history}/>*/}
            <iframe style={{
                border: 0,
                width: '100%'
            }} src={`https://static.9888.cn/pdf/reader/index.html?file=${file}`}/>
        </div>
    }
}

export default PDF