const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.less'],
    modules: [path.resolve('.'), 'node_modules']
  },
  entry: {
    main: ['./src/index.js'],
    react: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-redux',
      'react-router-redux',
      'redux-observable',
      'redux'
    ],
    miscellaneous: ['isomorphic-fetch', 'ramda', 'immutable']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    chunkFilename: '[name]-[id].bundle.js'
  },
  optimization: {
    occurrenceOrder: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Haseo CI',
      filename: 'index.html',
      template: 'template/index.template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      production: process.env.NODE_ENV === 'production'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: process.env.NODE_ENV !== 'production'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                workerParallelJobs: 2
              }
            }
          ]
        })
      },
      {
        test: /.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      }
    ]
  }
};
