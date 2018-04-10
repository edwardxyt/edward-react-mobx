import { render } from 'react-dom'
import React from 'react'

import './css/index.css'

import AppRouter from './router'


window.addEventListener('load', () => {
    render(AppRouter(), document.getElementById('cnt'))
})