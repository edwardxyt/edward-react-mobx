const path = require("path");
const debug = require("debug");
const R = require("ramda");
const isNotEmpty = R.complement(R.isEmpty);
const isNotNil = R.complement(R.isNil);
const echo = debug("development:bin");

let app_config = (rootDir = "/") => {
    let entry = process.env.npm_config_ENTRY;
    let env = process.env.NODE_ENV;

    if (isNotEmpty(entry) && isNotNil(entry)) {
        return {
            // ----------------------------------
            // Project Structure
            // 项目结构
            // ----------------------------------
            entry, // 启动时传入的参数，既项目目录
            main: path.join(rootDir, "src", `${entry}`, "index.js"), // 启动入口文件
            rootDir, // 项目根目录
            src: path.resolve(rootDir, "src"), // 源码目录
            dist: path.join(rootDir, "dist"), // 编译文件
            node_module_dir: path.resolve(rootDir, "node_module"), // 依赖模块目录
            template_path: path.join(rootDir, "src", `${entry}`, "index.hbs"),
            templates_dir: path.join(rootDir, "src", `${entry}`, "/templates"),

            // ----------------------------------
            // inject API
            // 注入前端页面 全局变量
            // ----------------------------------
            inject: {
                __ENV__: JSON.stringify(env),
                __DEBUG__: env === "production" ? false : true,
                __PROJECT__: JSON.stringify(entry)
            },

            // ----------------------------------
            // 其他配置
            // ----------------------------------
            PRESETS_ENV_BROWSERS: ["last 2 major versions"],

            // ----------------------------------
            // CDN 地址
            // ----------------------------------
            cdn_path: "",

            // ----------------------------------
            // server
            // webpack-dev服务器
            // ----------------------------------
            devServer: {
                port: process.env.npm_package_config_port || 3000,
                proxy: {
                    "/api": {
                        target: "https://cnodejs.org", //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
                        secure: false
                    }
                }
            }
        };
    } else {
        echo("缺少入口地址！");
    }
};

module.exports = app_config;
