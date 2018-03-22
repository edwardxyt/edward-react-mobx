let webpack = require("webpack");
let path = require("path");

let entry = process.env.npm_config_ENTRY || "";

module.exports = {
  entry: {
    app: path.join(__dirname, "src", `${entry}`, "index.js")
  },
  mode: "development", //development' or 'production'
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  devServer: {
    // fake数据使用，如果接口是跨域的 这也可以使用
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",  //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
    //     secure: false
    //   }
    // },
    overlay: {
      warnings: true,
      errors: true
    },
    inline: true,
    hot: true,
    stats: "minimal",
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: process.env.npm_package_config_port || 3000,
    host: "0.0.0.0",
    historyApiFallback: true
  },
  plugins: [
    // 热启动
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __DEBUG__: process.env.NODE_ENV === "production" ? false : true,
      __PROJECT__: JSON.stringify(entry)
    })
  ]
};
