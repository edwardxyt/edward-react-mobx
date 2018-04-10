import { Request, Components } from 'fw-javascripts'

import Browser from './browser.js'
import NativeBridge from './native-bridge.js'

let API_PATH = document.querySelector("meta[name=api-path]").getAttribute('content');

const Ajax = options => {
    // add default url prefix
    options.url = `${API_PATH}/mpwap${options.url}`
    if (options.fullUrl) options.url = options.fullUrl

    return Request(options).catch(error => {
        /*
        result : {
            code: xxxx,
            data: ...
            message: ...
        }
        */
        return new Promise((_, reject) => {
            if (error.code == 40101) {
                // 处理用户登录功能
                Browser.inApp ?
                    NativeBridge.login() :
                    location.href = 'https://m.9888.cn/mpwap/orderuser/toLogin.shtml'
            } else {
                options.silence ? reject(error) : setTimeout(() => reject(error), 1700)
            }
        })
    })
}

const Get = (url, params, silence = false) => {
    return Ajax({
        url: url,
        method: 'GET',
        data: params,
        silence: silence
    })
}

const Post = (url, params, options) => {
    return Ajax(Object.assign({
        url: url,
        method: 'POST',
        data: params
    }, options))
}

export {
    Ajax,
    Get,
    Post
}
