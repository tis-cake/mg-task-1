const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const NotifierWebpackPlugin = require('webpack-notifier');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const isDevTool = isDev ? 'source-map' : false;
const EXCLUDED_FOLDER = /(node_modules|bower_components)/;

const filename = (extension) => {
  return isProd ? `[name].[hash].${extension}` : `[name].${extension}`;
};

const cssLoaders = (loaderExtra) => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
  ];

  if (loaderExtra) {
    loaders.push(loaderExtra)
  }

  return loaders;
};

const getBabelOptions = (presetExtra) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: [],
  };

  if (presetExtra) {
    options.presets.push(...presetExtra);
  }

  return options;
};

const jsLoaders = (...loaderExtra) => ({
  loader: 'babel-loader',
  options: getBabelOptions(loaderExtra),
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/index.tsx',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    watchContentBase: true,
    port: 8082,
    open: true,
    writeToDisk: isProd,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new NotifierWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.js$/,
        exclude: EXCLUDED_FOLDER,
        use: jsLoaders(),
      },
      {
        test: /\.jsx$/,
        exclude: EXCLUDED_FOLDER,
        use: jsLoaders('@babel/preset-react'),
      },
      {
        test: /\.ts$/,
        exclude: EXCLUDED_FOLDER,
        use: jsLoaders('@babel/preset-typescript'),
      },
      {
        test: /\.tsx$/,
        exclude: EXCLUDED_FOLDER,
        use: jsLoaders('@babel/preset-react', '@babel/preset-typescript'),
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
  devtool: isDevTool,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  performance: {
    assetFilter(assetFilename) {
      return !/\.(map|png|jpe?g|webp)$/.test(assetFilename);
    },
  },
};
