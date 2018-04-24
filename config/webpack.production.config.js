const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const path = require("path");
const debug = require("debug");
const echo = debug("compile:webpack");

// 加载全局配置文件
echo("加载配置文件");
let app_config = require(".")(path.resolve(__dirname, "../"));

module.exports = function(CONFIG = {}) {
    return new Promise(function(resolve, reject) {
        resolve({
            entry: {
                app: ["whatwg-fetch", app_config.main]
            },
            mode: "production",
            output: {
                filename: "javascripts/[name].[chunkhash:5].js",
                chunkFilename: "javascripts/chunk.[name].[chunkhash:5].js",
                publicPath: app_config.cdn_path, // 需要cdn 就开启
                path: `${app_config.dist}/${app_config.entry}` // /static/PROJECT/
            },
            devtool: !!app_config.debug ? "source-map" : "eval-source-map",
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
                                    plugins: ["transform-decorators-legacy", app_config.antd]
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
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    modules: true,
                                    localIdentName: "src.[name]__[local]--[hash:base64:6]"
                                }
                            },
                            "resolve-url-loader",
                            "postcss-loader"
                        ],
                        include: [app_config.src]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    modules: false,
                                    localIdentName: "node_modules.[name]__[local]--[hash:base64:6]"
                                }
                            },
                            "postcss-loader"
                        ],
                        include: [app_config.node_module_dir]
                    },
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    hash: "sha512",
                                    digest: "hex",
                                    name: "images/[name]-[hash:5].[ext]"
                                }
                            }
                        ],
                        exclude: [app_config.node_module_dir],
                        include: [app_config.src]
                    }
                ]
            },
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: !!app_config.debug // set to true if you want JS source maps
                    }),
                    new OptimizeCSSAssetsPlugin({})
                ],
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            name: "commons",
                            priority: 10,
                            chunks: "initial"
                        },
                        styles: {
                            name: "styles",
                            test: /\.css$/,
                            chunks: "all",
                            minChunks: 2,
                            enforce: true
                        }
                    }
                }
            },
            plugins: [
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.LoaderOptionsPlugin({ minimize: true }),
                new webpack.DefinePlugin(app_config.inject),
                new MiniCssExtractPlugin({
                    filename: "[name].[contenthash].css",
                    chunkFilename: "[id].[contenthash].css"
                }),
                new HtmlWebpackPlugin({
                    filename: "index.html",
                    chunks: ["app", "commons"],
                    template: app_config.template_path,
                    COMPILED_AT: new Date().toString(),
                    CONFIG: {
                        env: app_config.inject.__ENV__,
                        debug: app_config.inject.__DEBUG__,
                        api_path: app_config.inject.__API__,
                        meta: ""
                    }
                })
            ]
        });
    });
};
