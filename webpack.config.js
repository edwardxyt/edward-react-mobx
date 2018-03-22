let webpack = require("webpack");
let path = require("path");
module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.js")
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    host: "0.0.0.0",
    historyApiFallback: true
  }
};
