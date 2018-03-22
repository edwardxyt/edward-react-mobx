let webpack = require("webpack");
let path = require("path");

console.log(process.env.NODE_ENV);
console.log(process.env.npm_config_CLUSTER);
console.log(process.env.npm_config_PROJECT);

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.js")
  },
  mode: "development", //development' or 'production'
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  devServer: {
    // fake数据使用
    // proxy: {
    //   "/api": {
    //     target: "https://xiayuting.cc",
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
      __CLUSTER__: JSON.stringify(process.env.npm_config_CLUSTER),
      __PROJECT__: JSON.stringify(process.env.npm_config_PROJECT)
    })
  ]
};
