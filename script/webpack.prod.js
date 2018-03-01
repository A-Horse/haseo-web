const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

const BaseConfig = require('./webpack.base.js');

module.exports = Merge(BaseConfig, {
  mode: 'production',
  performance: {
    hints: 'warning'
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name]-[id].[chunkhash].js'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      { from: 'favicon.ico', to: 'favicon.ico' },
      { from: 'assets', to: 'assets' }
    ]),
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], {
      root: path.join(__dirname, '..'),
      verbose: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new VisualizerPlugin({
      filename: path.join('./statistics.html')
    })
  ]
});
