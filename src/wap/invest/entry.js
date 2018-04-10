
import { render } from 'react-dom'
import { Post, Get, Ajax, StoreSpy } from './helpers'

import './css/index.css'
import AppRouter from './router'

import * as Stores from './stores'

let stores = {
    faxian: new Stores.FaXian(Ajax, Post),
    features: new Stores.Features(Get),
}

// new StoreSpy(stores).wiretap()

window.addEventListener('load', () => {
    render(AppRouter(stores), document.getElementById('cnt'))
})