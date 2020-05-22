const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR)

const createEntry = (pagesDir) => {
  const entryPoints = {}

  fs.readdirSync(pagesDir)
    .forEach(pageSubDir => {
      entryPoints[pageSubDir] = ['@babel/polyfill', path.join(pagesDir, pageSubDir, `${pageSubDir}.js`)]
    })
  return entryPoints
}

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {

  externals: {
    paths: PATHS
  },

  context: path.resolve(__dirname, 'src'),

  entry: createEntry(PAGES_DIR),

  output: {
    filename: filename('js'),
    path: PATHS.dist,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.pug', 'png'],
    alias: {
      '@': PATHS.src,
      '@components': `${PATHS.src}/components`,
      '@layouts': `${PATHS.src}/layouts`,
      '@fonts': `${PATHS.src}/fonts`,
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
              sourceMap: isDev
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          },
        ]
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            root: PATHS.src,
          }
        },
      },
      {
        test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
        exclude: '/node_modules/',
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
        },
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: '[id].css',
    }),

    ...PAGES.map(page => new HTMLWebpackPlugin({
      template: `${PAGES_DIR}/${page}/${page}.pug`,
      filename: `./${page}.html`,
      favicon: `${PATHS.src}/favicon/favicon.ico`,
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      },
      chunks: [page],
    })),

    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/images`, to: `${PATHS.assets}/images` },
      ]
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 8,
    }),
  ],
}
