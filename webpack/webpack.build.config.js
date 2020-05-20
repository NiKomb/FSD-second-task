const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  },

  plugins: []
})


module.exports = new Promise((res, rej) => {
  res(buildWebpackConfig)
})
