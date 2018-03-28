const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
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
                filename: "javascripts/[name].[chunkhash:5].js",
                chunkFilename: "javascripts/chunk.[name].[chunkhash:5].js",
                publicPath: app_config.cdn_path, // 需要cdn 就开启
                path: `${app_config.dist}/${app_config.entry}`
            },
            devtool: "eval-source-map",
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
                        return getPath(path.join("css", "[name].[chunkhash:5].css")).replace("css/js", "css");
                    },
                    allChunks: true
                }),
                new UglifyJsPlugin({
                    uglifyOptions: {
                        ie8: false,
                        warnings: false
                    }
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
