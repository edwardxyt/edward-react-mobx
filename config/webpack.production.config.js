const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const debug = require("debug");
const echo = debug("production:webpack");

// 加载全局配置文件
let app_config = require(".")(path.resolve(__dirname, "../"));

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
                        use: ExtractTextPlugin.extract([
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    modules: true,
                                    localIdentName: "[name]__[local]--[hash:base64:6]"
                                }
                            },
                            "postcss-loader"
                        ]),
                        exclude: [app_config.node_module_dir],
                        include: [app_config.src]
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
                        exclude: [app_config.node_module_dir],
                        include: [app_config.src]
                    }
                ]
            },
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            chunks: "initial",
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0
                        },
                        vendor: {
                            test: /node_modules/,
                            chunks: "initial",
                            name: "vendor",
                            priority: 10,
                            enforce: true
                        }
                    }
                },
                runtimeChunk: true
            },
            plugins: [
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.LoaderOptionsPlugin({ minimize: true }),
                new webpack.DefinePlugin(app_config.inject),
                new ExtractTextPlugin({
                    filename: "all.[contenthash:8].css",
                    allChunks: true,
                    ignoreOrder: true
                }),
                new HtmlWebpackPlugin({
                    filename: "index.html",
                    template: app_config.template_path,
                    COMPILED_AT: new Date().toString(),
                    CONFIG: {
                        env: app_config.inject.__ENV__,
                        debug: app_config.inject.__DEBUG__,
                        api_path: "",
                        meta: ""
                    }
                })
            ]
        });
    });
};
