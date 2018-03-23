const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const debug = require("debug");
const path = require("path");
const ip = require("ip");
const echo = debug("development:webpack");

let entry = process.env.npm_config_ENTRY || "";
let port = process.env.npm_package_config_port || 3000;
let PRESETS_ENV_BROWSERS = ["last 2 major versions"];
PRESETS_ENV_BROWSERS.push("ie 9");

let template_path = path.join(__dirname, "src", `${entry}`, "index.hbs");

echo("启动webpack-dev-server");
echo(`服务器运行在 http://${ip.address()}:${port}`);

module.exports = {
    entry: ["babel-polyfill", "whatwg-fetch", path.join(__dirname, "src", `${entry}`, "index.js")],
    mode: "development", //development' or 'production'
    output: {
        filename: "bundle.js",
        chunkFilename: "[name].[chunkhash:5].chunk.js",
        publicPath: "/",
        path: path.join(__dirname, "dist")
    },
    devtool: "eval-source-map",
    devServer: {
        // fake数据使用，如果接口是跨域的 这也可以使用
        proxy: {
            "/api": {
                target: "https://cnodejs.org", //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
                secure: false
            }
        },
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        inline: true,
        hot: true,
        stats: "minimal",
        contentBase: path.join(__dirname, "src", "dist"),
        compress: true,
        port: port,
        host: "0.0.0.0",
        historyApiFallback: true
    },
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
                                            browsers: PRESETS_ENV_BROWSERS,
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
                            plugins: ["transform-decorators-legacy"]
                        }
                    }
                ],
                include: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader",
                options: {
                    partialDirs: [entry + "/templates"]
                }
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
                ]
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
                ]
            }
        ]
    },
    plugins: [
        // 热启动
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(process.env.NODE_ENV),
            __DEBUG__: process.env.NODE_ENV === "production" ? false : true,
            __PROJECT__: JSON.stringify(entry)
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: template_path,
            COMPILED_AT: new Date().toString(),
            CONFIG: {
                env: process.env.NODE_ENV,
                debug: true,
                api_path: "",
                meta: ""
            }
        }),
        new webpack.NamedModulesPlugin()
    ]
};
