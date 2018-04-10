import { render } from 'react-dom'
import React from 'react'

import Withdraw from './router'
import { Request } from 'fw-javascripts'
import { Post } from './helpers'

import * as Stores from './stores'

import './css/index.css'
import AppRouter from './router'

let stores = {
    reserve_bid: new Stores.ReserveBid(Post),
    novice_bid: new Stores.NoviceBid(Post),
    current: new Stores.Current(),
    order: new Stores.Order(Post)
}

// new StoreSpy(stores).wiretap()

window.addEventListener('load', () => {
    render(AppRouter(stores), document.getElementById('cnt'))
})