const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const PATHS = {
  src: path.resolve(__dirname, "../src"),
  dist: path.resolve(__dirname, "../dist"),
  assets: "assets/",
};

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR);

const createEntryPoints = (dir) => {
  const entryPoints = {};

  fs.readdirSync(dir)
    .filter((childDir) => childDir !== "template")
    .forEach((childDir) => {
      entryPoints[childDir] = [
        "@babel/polyfill",
        path.join(dir, childDir, `${childDir}.js`),
      ];
    });
  return entryPoints;
};

const filename = (ext) =>
  isDev ? `[name].${ext}` : `pages/[name].[hash].${ext}`;

module.exports = {
  externals: {
    paths: PATHS,
  },

  context: path.resolve(__dirname, "src"),

  entry: createEntryPoints(PAGES_DIR),

  output: {
    filename: filename("js"),
    path: PATHS.dist,
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".scss", ".pug", ".png", ".jpg"],
    alias: {
      "@": PATHS.src,
      "@components": `${PATHS.src}/components`,
      "@chunks": `${PATHS.src}/chunks`,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
              sourceMap: isDev,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                `${PATHS.src}/theme/variables.scss`,
                `${PATHS.src}/theme/mixins.scss`,
                `${PATHS.src}/theme/icons.scss`,
                `${PATHS.src}/theme/functions.scss`,
              ],
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: {
          loader: "pug-loader",
          options: {
            root: PATHS.src,
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        exclude: ["/node_modules/", /image?/, /img?/],
        options: {
          name: "[folder]/[name].[ext]",
          outputPath: "./assets/fonts",
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/fonts?/, "/node_modules/"],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/images",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: filename("css"),
      chunkFilename: "[id].css",
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
    }),

    ...PAGES.filter((value) => value !== "template").map(
      (page) =>
        new HTMLWebpackPlugin({
          template: `${PAGES_DIR}/${page}/${page}.pug`,
          filename: `pages/${page}.html`,
          minify: {
            collapseWhitespace: isProd,
            removeComments: isProd,
          },
          chunks: [page],
        })
    ),

    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/chunks/favicon`, to: `${PATHS.assets}/favicon` },
      ],
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: "md4",
      hashDigest: "base64",
      hashDigestLength: 8,
    }),
  ],
};
