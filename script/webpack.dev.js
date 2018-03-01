const Merge = require('webpack-merge');
const webpack = require('webpack');

const BaseConfig = require('./webpack.base.js');

module.exports = Merge(BaseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 8010,
    publicPath: '/',
    proxy: {
      // NOTITE: // order is important
      '/api': 'http://localhost:8075',
      '/ws': {
        target: 'ws://localhost:8075',
        ws: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
