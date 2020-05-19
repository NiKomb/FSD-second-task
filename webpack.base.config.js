const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: './assets'
}

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const filename = (ext) => isDev
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
    filename: filename('js'),
    path: PATHS.dist,
    publicPath: '/'
  },

  devServer: {
    port: 4200,
    open: true,
    overlay: {
      warning: true,
      errors: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [{
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
              hmr: true
            }
          },
          'css-loader',
          'sass-loader'

        ]
      },
      {
        test: /\.(png|svg|gif|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: '[id].css',
    }),
    new HTMLWebpackPlugin({
      minify: {
        collapseWhitespace: isProd
      },
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
    }),
    // new CopyWebpackPlugin([
    //   { from: `${PATHS.src}/favicon`, to: '' },
    // ]),
    new CleanWebpackPlugin(),
  ],
}
