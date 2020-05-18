const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const paths = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist')
}

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.js'],
  },
  output: {
    filename: filename('js'),
    path: paths.dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.pug', '.scss', '.svg'],
    alias: {
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@': path.resolve(__dirname, '../src')
    }
  },

  devServer: {
    port: 4200,
    hot: isDev,
    open: true,
    overlay: {
      warning: true,
      errors: true,
    },
    // openPage: 'pages/colors-and-types/colors-and-types.pug'
  },

  devtool: isDev ? 'source-map' : '',

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/colors-and-types/colors-and-types.pug'),
      minify: {
        collapseWhitespace: isProd
      }
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
