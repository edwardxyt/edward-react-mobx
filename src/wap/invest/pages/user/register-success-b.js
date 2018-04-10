import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import { Header } from '../../components'
import { Get } from '../../helpers'
import styles from '../../css/user/register-success-b.css'


@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore' 
})
class RegisterSuccess extends React.Component {

    state = {
        /*
        result : [
            {
                restype: "",
                resvalue: ""
            }, ...
        ]
        */
        result: []
    }

    componentDidMount() {
        document.title = '注册成功'

        Get('/new/userLogin/registResult.shtml').then(data => {
            let r = this.state.result;
            data.registResult.forEach(i => r.push(i))
            this.setState({ result: r })
        })
    }

    render() {

        const TYPE_TEXT = {
            'A': '元返现券',
            'B': '返息券已经转入您的账户中',
            'C': '工分已经转入您的账户中',
            '1': '工豆已经转入您的账户中',
            'G': '克 返金券已转入您的账户中'
        }

        return <div styleName="bg">
            <Header noBack noClose title={"注册成功"} />
            <img styleName="banner" src={require("../../images/user/register-success-b/b.png")} />
            <div styleName="success-title">注册成功</div>
            <div styleName="desc">恭喜您获得</div>
            {this.state.result.map((i, index) => {
                return <div styleName="desc" key={index}>
                    <span>{i.resvalue}</span>
                    {TYPE_TEXT[i.restype]}
                </div>
            })}
            <a styleName="btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.eten.myriches">立即赚收益</a>
        </div>
    }
}

export default RegisterSuccess