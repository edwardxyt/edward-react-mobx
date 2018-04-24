import React from "react";
import ReactDOM from "react-dom";
import App from "./router";
import UAParser from "ua-parser-js";

let parser = new UAParser();
console.log(parser.getResult());
console.log(__API__, __CDN__, __ENV__, __DEBUG__, __MOBILE__, __PROJECT__);

let main = function() {
    ReactDOM.render(<App />, document.getElementById("main"));
};
window.onload = function() {
    main();
};
