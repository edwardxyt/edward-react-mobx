const webpack_production_config = require("../config/webpack.production.config");
const webpack = require("webpack");
const path = require("path");
const debug = require("debug");
const R = require("ramda");
const echo = debug("production:bin");

let entry = process.env.npm_config_ENTRY;
let [cluster, project] = R.split("/", entry);
let env = process.env.npm_config_ENV;
let Vconsole = env === "production" ? false : true;
let consoleFile = path.join(__dirname, "../", "src", cluster, project, "console.js");

echo(`启动项目：${cluster} - ${project}`);
echo(`编译环境：${env}`);
echo(`启动调试：${Vconsole}`);
echo(`Vconsole文件：${consoleFile}`);

webpack_production_config().then(config => {
    echo("执行编译");
    if (Vconsole) {
        echo("启动Vconsole,source-map");
        config.entry.push(consoleFile);
    }
    webpack(config).run((err, stats) => {
        if (err) {
            console.log(err);
        }
        echo("webpack compile complete 编译完成");
    });
});
