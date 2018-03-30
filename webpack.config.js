const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const debug = require("debug");
const ip = require("ip");
const echo = debug("development:webpack");

// 加载全局配置文件
echo("加载配置文件");
let app_config = require("./config")(__dirname);

// 加载本地配置文件
let settings = {};
try {
    settings = require("./config/localhost.settings.js");
    echo("加载本地地配置。");
    echo("合并本地地配置。");
} catch (e) {
    echo("无本地配置文件可用！");
}
// 合并本地与全局
const CONSTANTS = Object.assign({}, app_config, settings);

echo("启动webpack-dev-server");
echo(`服务器运行在 http://${ip.address()}:${CONSTANTS.devServer.port}`);

module.exports = {
    entry: ["babel-polyfill", "whatwg-fetch", CONSTANTS.console, CONSTANTS.main],
    mode: "development",
    output: {
        filename: "bundle.js",
        publicPath: "/",
        path: CONSTANTS.dist
    },
    devtool: "source-map",
    devServer: {
        // fake数据使用，如果接口是跨域的 这也可以使用
        proxy: CONSTANTS.devServer.proxy,
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        inline: true,
        hot: true,
        stats: "minimal",
        contentBase: CONSTANTS.dist,
        compress: true,
        port: CONSTANTS.devServer.port,
        host: "0.0.0.0",
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "env",
                                    {
                                        targets: {
                                            browsers: CONSTANTS.PRESETS_ENV_BROWSERS,
                                            useBuiltIns: true,
                                            uglify: false,
                                            include: ["transform-es2015-arrow-functions"],
                                            debug: true
                                        }
                                    }
                                ],
                                "react",
                                "stage-2"
                            ],
                            plugins: [
                                "transform-decorators-legacy",
                                ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
                            ]
                        }
                    }
                ],
                exclude: [CONSTANTS.node_module_dir],
                include: [CONSTANTS.src]
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader",
                options: {
                    partialDirs: [CONSTANTS.templates_dir]
                },
                exclude: [CONSTANTS.node_module_dir],
                include: [CONSTANTS.src]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[name]__[local]--[hash:base64:6]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                include: [CONSTANTS.src]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: false,
                            localIdentName: "[name]__[local]--[hash:base64:6]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                include: [CONSTANTS.node_module_dir]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            hash: "sha512",
                            digest: "hex",
                            name: "images/[name]-[hash:8].[ext]"
                        }
                    }
                ],
                exclude: [CONSTANTS.node_module_dir],
                include: [CONSTANTS.src]
            }
        ]
    },
    plugins: [
        // 热启动
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(CONSTANTS.inject),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: CONSTANTS.template_path,
            COMPILED_AT: new Date().toString(),
            CONFIG: {
                env: CONSTANTS.inject.__ENV__,
                debug: CONSTANTS.inject.__DEBUG__,
                api_path: CONSTANTS.inject.__API__,
                meta: ""
            }
        }),
        new webpack.NamedModulesPlugin()
    ]
};
