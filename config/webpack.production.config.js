const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const debug = require("debug");
const echo = debug("compile:webpack");

// 加载全局配置文件
echo("加载配置文件");
let app_config = require(".")(path.resolve(__dirname, "../"));

module.exports = function(CONFIG = {}) {
    return new Promise(function(resolve, reject) {
        resolve({
            entry: ["babel-polyfill", "whatwg-fetch", app_config.main],
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
                        use: ExtractTextPlugin.extract([
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    modules: true,
                                    localIdentName: "src.[name]__[local]--[hash:base64:6]"
                                }
                            },
                            "postcss-loader"
                        ]),
                        include: [app_config.src]
                    },
                    {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract([
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    modules: false,
                                    localIdentName: "node_modules.[name]__[local]--[hash:base64:6]"
                                }
                            },
                            "postcss-loader"
                        ]),
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
                minimize: true,
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendor",
                            chunks: "all"
                        }
                    }
                }
            },
            plugins: [
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.LoaderOptionsPlugin({ minimize: true }),
                new webpack.DefinePlugin(app_config.inject),
                new ExtractTextPlugin({
                    filename: getPath => {
                        return getPath(path.join("css", "e.[name].[chunkhash:5].css"));
                    },
                    allChunks: true
                }),
                new HtmlWebpackPlugin({
                    filename: "index.html",
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
