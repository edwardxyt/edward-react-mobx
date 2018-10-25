const webpack_production_config = require("../config/webpack.production.config");
const webpack = require("webpack");
const path = require("path");
const debug = require("debug");
const R = require("ramda");
const fs = require("fs-extra");
const echo = debug("compile:bin");
const projects = require("../config/project");

let entry = process.env.npm_config_ENTRY;
let [cluster, project] = R.split("/", entry);
let env = process.env.npm_config_ENV;
let consoleFile = path.join(__dirname, "../", "config", "console.js");
let distHtml = path.join(
    __dirname,
    "../",
    "dist",
    cluster,
    project,
    "index.html"
);
let Vconsole = projects[cluster][project].console;

echo(`启动项目：${cluster} - ${project}`);
echo(`VConsole：${Vconsole}---${consoleFile}`);
echo(`编译环境：${env}`);
echo(`目标文件：${distHtml}`);

webpack_production_config().then(config => {
    echo("执行编译,根据环境覆盖配置文件！");

    if (env !== "production" && Vconsole) {
        echo("Enable Vconsole,source-map");
        echo(`Vconsole文件：${consoleFile}`);
        config.entry.app.push(consoleFile);
    } else {
        echo("Disable Vconsole");
    }

    webpack(config).run((err, stats) => {
        if (err) {
            echo("webpack compile fail 编译错误！");
            echo(err);
            return;
        }

        fs.pathExists(distHtml).then(exists => {
            if (!exists) {
                echo(
                    `status is ${exists}!!!! "webpack compile fail 编译错误！"`
                );
            } else {
                echo("webpack compile complete 编译完成");
            }
        });
    });
});
