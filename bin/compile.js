const webpack_production_config = require("../config/webpack.production.config");
const webpack = require("webpack");
const debug = require("debug");
const echo = debug("production:webpack");

echo("执行编译");
webpack_production_config().then(config => {
    // webpack(config).run((err, stats) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     echo("webpack compile complete");
    // });
});
