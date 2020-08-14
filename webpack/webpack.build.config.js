const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",

  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()],
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  plugins: [],
});

module.exports = new Promise((res, rej) => {
  res(buildWebpackConfig);
});
