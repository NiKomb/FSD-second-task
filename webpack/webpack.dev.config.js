const { merge } = require("webpack-merge");
const webpack = require("webpack");
const baseWebpackConfig = require("./webpack.base.config.js");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",

  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 4200,
    overlay: true,
    hot: true,
    openPage: [
      // 'rooms-page.html',
      "ui-kit.html",
    ],
  },

  devtool: "#@cheap-eval-source-map",

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
});

module.exports = new Promise((res, rej) => {
  res(devWebpackConfig);
});
