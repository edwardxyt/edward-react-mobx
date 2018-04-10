import React, {Component} from 'react'
import ReactDom from 'react-dom'
import {unmountComponentAtNode} from 'react-dom'
import PropTypes from 'prop-types'

let createTemporaryDOMNode = function (id) {
    let node = document.getElementById(id)
    if (!node) {
        node = document.createElement('div');
        node.id = id;
        document.body.appendChild(node);
    }
    return node
}

function getStyles() {

    return {
        root_panel: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.2)'
        },
        alert_panel: {
            display: "table",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: "-288px",
            marginTop: "-101px",
            width: "576px",
            borderRadius: "8px",
            background: "white"
        },
        text: {
            margin: "30px auto",
            lineHeight: "40px",
            color: "#555555",
            padding: "0 36px",
            maxWidth: "576px",
            fontSize: "28px",
            textAlign: "center"
        },
        confirm_btn: {
            display: "inline-block",
            width: "230px",
            height: "74px",
            lineHeight: "74px",
            textAlign: "center",
            color: "white",
            background: "#f9655a",
            borderRadius: '6px',
            margin: '0 30px 30px 0px',
            fontSize: "30px",
            float: "right"
        },
        negative_btn: {
            display: "inline-block",
            width: "230px",
            height: "74px",
            lineHeight: "74px",
            textAlign: "center",
            color: "white",
            background: "#7c9dc7",
            borderRadius: '6px',
            margin: '0px 30px 30px 30px',
            fontSize: "30px",
            float: "left"
        }
    }
}

class Confirm extends Component {
    static defaultProps = {
        text: '好像出了点问题!?',
        confirmBtnText: '确定',
        negaticeBtnText: '取消'
    }

    hideHandler = (cb) => {
        cb && cb()
        unmountComponentAtNode(this.props.mountedNode);
    }

    componentWillUnmount() {
        this.props.unMountAlert && this.props.unMountAlert();
    }

    render() {

        let styles = getStyles()

        return <div style={styles.root_panel}>
            <div style={styles.alert_panel}>
                <div className="_style_alert_text"
                     style={styles.text}>{this.props.text}</div>
                <a style={styles.confirm_btn}
                   onClick={() => this.hideHandler(this.props.cb)}>{this.props.confirmBtnText}</a>
                <a style={styles.negative_btn} onClick={() => {
                    this.hideHandler()
                }}>{this.props.negaticeBtnText}</a>
            </div>
        </div>
    }
}

let showConfirm = function (text, cb) {
    var id = 'pop',
        node = createTemporaryDOMNode(id);
    ReactDom.render(<Confirm mountedNode={node} unMountToast={() => node.parentNode.removeChild(node)} text={text}
                             cb={cb}/>, node)
}

Confirm.propTypes = {
    text: PropTypes.string, // 显示标题
    confirmBtnText: PropTypes.string, // 左按钮显示文案
    negaticeBtnText: PropTypes.string,//右按钮显示文案
    mountedNode: PropTypes.object, // document node to be mounted
    unMountAlert: PropTypes.func // 组件卸载时的回调函数
}
export default showConfirm