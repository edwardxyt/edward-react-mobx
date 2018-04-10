import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/components/header.css'
import { Browser, NativeBridge } from '../helpers'

/*
 parameters
 <Header title={} history={} show_back={} sub_title={} sub_link={} />
 */

function goBack(props) {

    // 如果传入自定义返回方法, 直接调用并结束
    if (props.backArrowHandler) {
        return props.backArrowHandler()
    }

    // 写了一大堆, 其实是为了兼容在App中点击返回箭头的时候, 关闭当前webviwe
    let old_pop = window.onpopstate

    let moved = false
    window.onpopstate = () => moved = true

    props.history && props.history.goBack()

    setTimeout(() => {
        window.onpopstate = old_pop
        !moved && NativeBridge.close()
    }, 100)
}

const Header = CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})(props => {

    let back = !props.noBack &&
        <a styleName="btn btn-back" onClick={() => goBack(props)}></a>

    let close = !props.noClose &&
        <a styleName="btn btn-close" onClick={NativeBridge.close}></a>

    let sub_title = props.sub_title &&
        <Link to={props.sub_link} styleName="sub-title">{props.sub_title}</Link>

    let cn_a = 'header-placeholder', cn_b = 'header'
    if (Browser.inIOSApp) {
        cn_a += ' iosapp-header-placeholder'
        cn_b += ' iosapp-header'
    }

    return <div styleName={cn_a} >
        <div styleName={cn_b}>
            {back}{close}{props.title}{sub_title}
        </div>
    </div >
})

Header.defaultProps = {
    noClose: true,
    noBack: false,
    backArrowHandler: null
}

export default Header
