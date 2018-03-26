const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const debug = require("debug");
const echo = debug("production:webpack");

// 加载全局配置文件
let app_config = require(".")(path.resolve(__dirname, "../"));
console.log(app_config);

echo("加载配置文件");

module.exports = function(CONFIG = {}) {
    return new Promise(function(resolve, reject) {
        resolve({
            entry: ["babel-polyfill", "whatwg-fetch", app_config.main],
            mode: "development", //development' or 'production'
            output: {
                filename: "bundle.js",
                chunkFilename: "[name].[chunkhash:5].chunk.js",
                publicPath: app_config.cdn_path,
                path: app_config.dist
            },
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        // exclude: /node_modules/,
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        [
                                            "env",
                                            {
                                                targets: {
                                                    browsers: app_config.PRESETS_ENV_BROWSERS,
                                                    useBuiltIns: true,
                                                    uglify: false,
                                                    include: ["transform-es2015-arrow-functions"],
                                                    debug: false
                                                }
                                            }
                                        ],
                                        "react",
                                        "stage-2"
                                    ],
                                    plugins: ["transform-decorators-legacy"]
                                }
                            }
                        ],
                        exclude: [app_config.node_module_dir],
                        include: [app_config.src]
                    },
                    {
                        test: /\.hbs/,
                        loader: "handlebars-loader",
                        options: {
                            partialDirs: [app_config.templates_dir]
                        },
                        exclude: [app_config.node_module_dir],
                        include: [app_config.src]
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
                        exclude: [CONSTANTS.node_module_dir],
                        include: [CONSTANTS.src]
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
            }
        });
    });
};
