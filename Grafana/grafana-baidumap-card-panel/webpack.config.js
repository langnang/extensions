const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    module: './src/module.ts',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'amd',
  },
  externals: [
    'lodash',
    'moment',
    'jquery',
    function (context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    },
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        query: {
          outputPath: './images/',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.tsx?$/,
        loaders: [{
            loader: 'babel-loader',
            options: {
              presets: ['env']
            },
          },
          'ts-loader',
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          }
        ],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin('./dist'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 原因未知：CopyWebpackPlugin无法执行，因此注释clean&&copy插件
    // new CopyWebpackPlugin([{
    //   from: 'src/plugin.json',
    //   to: 'dist'
    // }]),
  ],

};