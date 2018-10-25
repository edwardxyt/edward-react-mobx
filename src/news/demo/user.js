import React from "react";
import { observer, inject } from "mobx-react";
import CSSModules from "react-css-modules";
import { DatePicker } from "antd";

import styles from "./css.css";

const edward = {
    edward: "xiayuting"
};
console.log("我是index.js");
console.log(__API__, __CDN__, __ENV__, __DEBUG__, __MOBILE__, __PROJECT__);

@inject("fetchData")
@observer
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: "ignore" })
class User extends React.Component {
    _AjaxHandle() {
        let { fetchAjax } = this.props.fetchData;
        fetchAjax();
    }
    _renderData() {
        let { fetchData } = this.props;
        let { data, state } = fetchData;

        if (state == 0) {
            return "点击发送请求";
        } else if (state == 1) {
            return "正在请求";
        } else if (state == 2 && data != null) {
            return data;
        } else if (state == -1) {
            return "请求出错";
        }
    }
    render() {
        let data = { a: 10, ...edward };
        return (
            <div>
                <div styleName="table">
                    <div styleName="row">
                        <div styleName="cell">A0</div>
                        <div styleName="cell">B0</div>
                    </div>
                </div>
                <div className={this.props.styles["title"]}>
                    <ul>
                        <li>{data.edward}</li>
                    </ul>
                    <DatePicker />
                </div>
                <div
                    onClick={() => {
                        this._AjaxHandle();
                    }}
                >
                    fetchAjax
                </div>
                <ul>{this._renderData()}</ul>
            </div>
        );
    }
}

export default User;
