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
  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __DEBUG__: process.env.NODE_ENV === "production" ? false : true,
      __PROJECT__: JSON.stringify(entry)
    })
  ]
};
