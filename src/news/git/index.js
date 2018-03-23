"use strict";
import React from "react";
import { render } from "react-dom";
import App from "./router";
import UAParser from "ua-parser-js";

let parser = new UAParser();
console.log(parser.getOS());

let main = function() {
    render(<App />, document.getElementById("main"));
};
window.onload = function() {
    main();
};
