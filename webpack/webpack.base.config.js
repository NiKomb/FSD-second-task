const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/'
}

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const createDistPath = (ext) => isDev
  ? `${PATHS.assets}/${ext}/[name].${ext}`
  : `${PATHS.assets}/${ext}/[name].[hash].${ext}`

module.exports = {

  externals: {
    paths: PATHS
  },

  context: path.resolve(__dirname, 'src'),

  entry: {
    main: ['@babel/polyfill', PATHS.src]
  },

  output: {
    filename: createDistPath('js'),
    path: PATHS.dist,
    publicPath: '/'
  },

  optimization: {
    // runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          }
        }]
      },
      {
        test: /\.scss$/,
        exclude: '/node_modules/',
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: isDev }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDev }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|png)$/i,
        exclude: '/node_modules/',
        loader: 'file-loader',
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: createDistPath('css'),
      chunkFilename: '[id].css',
    }),
    new HTMLWebpackPlugin({
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd
      },
      template: `${PATHS.src}/index.html`,
      favicon: `${PATHS.src}/favicon/favicon.ico`,
      filename: './index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/images`, to: `${PATHS.assets}images` },
      ]
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 8,
    }),
  ],
}
