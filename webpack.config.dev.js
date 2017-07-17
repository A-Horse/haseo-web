var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [path.resolve('.'), 'node_modules']
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    proxy: {
      // NOTITE: // order is important
      '/api': 'http://localhost:8075'
    }
  },
  entry: ['babel-polyfill', './index'],
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'autoprefixer-loader'
          }
        ],
        include: [path.resolve(__dirname, './style')]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  }
};
