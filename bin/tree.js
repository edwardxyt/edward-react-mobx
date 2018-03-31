const glob = require("glob");
const path = require("path");
const fs = require("fs");
const debug = require("debug");
const echo = debug("tree:bin");

let src = path.join(__dirname, "../", "src");
let options = {
    nodir: true
};

// options is optional
glob(`${src}/**/*/main.js`, options, function(er, files) {
    let total = 0;
    files.map((item, index) => {
        total = index;
        echo(item);
    });
    echo(`总数：${total + 1}`);
});
