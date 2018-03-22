let webpack = require("webpack");
let path = require("path");
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
    proxy: {
      "/api": {
        target: "https://xiayuting.cc",
        secure: false
      }
    },
    overlay: {
      warnings: true,
      errors: true
    },
    inline: true,
    hot: true,
    stats: "minimal",
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    host: "0.0.0.0",
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
