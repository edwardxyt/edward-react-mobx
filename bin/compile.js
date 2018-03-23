// const webpack_config = require("../config/webpack.production.config");
// const config = require('../config')
const webpack = require("webpack");
const webpack_config = require("../webpack.config");

webpack(webpack_config).run((err, stats) => {
  console.log(webpack);
});
