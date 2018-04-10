import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import { Home, Pick, Collection, Treasure } from './pages'


export default () => {
    return <Router>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/pick' component={Pick}/>
            <Route exact path='/collection' component={Collection}/>
            <Route exact path='/treasure' component={Treasure}/>
        </Switch>
    </Router>
}