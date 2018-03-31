import "./a.js";
import "./b.js";

import React from "react";
import ReactDOM from "react-dom";
import { DatePicker } from "antd";

import style from "./css.css";

const edward = {
    edward: "xiayuting"
};
console.log("我是index.js");
console.log(__API__, __ENV__, __DEBUG__, __MOBILE__, __PROJECT__);

class App extends React.Component {
    render() {
        let data = { a: 10, ...edward };
        return (
            <div className={style.title}>
                <ul>
                    <li>{data.edward}</li>
                </ul>
                <DatePicker />
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
