const webpack_production_config = require("../config/webpack.vendor.config");
const webpack = require("webpack");
const debug = require("debug");
const echo = debug("compile:vendor");

webpack_production_config().then(config => {
    webpack(config).run((err, stats) => {
        if (err) {
            echo("webpack compile vendor fail 编译错误！");
            console.log(err);
        } else {
            echo("webpack compile vendor complete 编译完成");
        }
    });
});
