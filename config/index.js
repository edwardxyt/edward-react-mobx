const path = require("path");
const debug = require("debug");
const R = require("ramda");
const projects = require("./project");
const isNotEmpty = R.complement(R.isEmpty);
const isNotNil = R.complement(R.isNil);
const echo = debug("development:config");

let app_config = (rootDir = "/") => {
    let entry = process.env.npm_config_ENTRY;
    let env = process.env.npm_config_ENV || process.env.NODE_ENV;
    let [cluster, project] = R.split("/", entry);
    let api_path = projects[cluster][project].api_path;
    let y_api_path = projects[cluster][project].y_api_path;
    let cdn_path = projects[cluster][project].cdn_path;
    let project_library = projects[cluster][project].library;
    let debugging = env === "production" ? false : true;
    let Vconsole = projects[cluster][project].console;
    let mobile = projects[cluster][project].mobile;

    if (isNotEmpty(entry) && isNotNil(entry)) {
        echo(`根路径：${rootDir}`);
        echo(`VConsole：${Vconsole}`);
        echo(`是否移动开发：${mobile}`);
        echo(`启动项目：${cluster} - ${project}`);
        echo(`API_PATH：${api_path}`);
        echo(`Y_API_PATH：${y_api_path}`);
        echo(`CDN_PATH：${cdn_path}`);
        echo(`环境：${env}`);
        echo(`启动调试：${debugging}`);
        echo(`第三方库：${project_library}`);

        return {
            // ----------------------------------
            // Project Structure
            // 项目结构
            // ----------------------------------
            rootDir, // 项目根目录
            entry, // 启动时传入的参数，既项目目录
            env,
            main: path.join(rootDir, "src", `${entry}`, "main.js"), // 启动入口文件
            antd: mobile
                ? [
                      "import",
                      {
                          libraryName: "antd-mobile",
                          style: "css"
                      }
                  ]
                : [
                      "import",
                      {
                          libraryName: "antd",
                          libraryDirectory: "es",
                          style: "css"
                      }
                  ],
            console: Vconsole
                ? path.join(rootDir, "config", "console.js")
                : Vconsole, // console入口文件
            debug: debugging,
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
                __API__: JSON.stringify(api_path),
                __Y__: JSON.stringify(y_api_path),
                __CDN__: JSON.stringify(cdn_path),
                __ENV__: JSON.stringify(env),
                __DEBUG__: JSON.stringify(debugging),
                __MOBILE__: JSON.stringify(mobile),
                __PROJECT__: JSON.stringify(entry)
            },

            // ----------------------------------
            // library
            // 提取第三方库
            // ----------------------------------
            library: [
                "mobx",
                "mobx-react",
                "react",
                "react-dom",
                "react-css-modules",
                "react-router-dom",
                "axios",
                "ramda",
                "lodash",
                "ua-parser-js",
                ...project_library
            ],

            // ----------------------------------
            // 其他配置
            // ----------------------------------
            PRESETS_ENV_BROWSERS: ["last 2 major versions"],

            // ----------------------------------
            // CDN 地址
            //
            // 如果只有一个cdn服务器 那么写下如下
            // cdn_path: `http://cdn.example.com/static/${cluster}/${project}/`,
            // ----------------------------------
            cdn_path: cdn_path,

            // ----------------------------------
            // server
            // webpack-dev服务器
            // ----------------------------------
            devServer: {
                port: process.env.npm_package_config_port || 3000
                // proxy: {
                //     "/api/*": {
                //         target: "http://ed.9888.cn", //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
                //         secure: false
                //     },
                //     "/mpwap/*": {
                //         target: "http://ed.9888.cn", //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
                //         secure: false
                //     }
                // }
            }
        };
    } else {
        echo("缺少入口地址！");
    }
};

module.exports = app_config;
