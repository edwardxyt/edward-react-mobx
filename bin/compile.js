const webpack_production_config = require("../config/webpack.production.config");
const webpack = require("webpack");
const debug = require("debug");
const echo = debug("production:webpack");

webpack_production_config().then(config => {
    echo("执行编译");
    webpack(config).run((err, stats) => {
        if (err) {
            console.log(err);
        }
        echo("webpack compile complete 编译完成");
    });
});
