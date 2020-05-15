const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`



module.exports = {
  context: path.resolve(__dirname, '../src'),
  mode: 'development',
  entry: {
    main: ['./entry.js'],
  },
  output: {
    filename: filename('js'),
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['js', 'pug', 'scss', 'svg'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../src/pages')
    }
  },

  devServer: {
    port: 4200,
    hot: isDev,
    open: true,
    overlay: {
      warning: true,
      errors: true,
    }
  },

  devtool: isDev ? 'source-map' : '',

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HTMLWebpackPlugin({
      template: 'pages/colors-and-types/colors-and-types.pug'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.css$i/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
}
