import "./a.js";
import "./b.js";

import React from "react";
import ReactDOM from "react-dom";
import CSSModules from "react-css-modules";
import { DatePicker } from "antd";

import styles from "./css.css";

const edward = {
    edward: "xiayuting"
};
console.log("我是index.js");
console.log(__API__, __ENV__, __DEBUG__, __MOBILE__, __PROJECT__);

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: "ignore" })
class App extends React.Component {
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
            </div>
        );
    }
}

let main = function() {
    ReactDOM.render(<App />, document.getElementById("main"));
};
window.onload = function() {
    main();
};
