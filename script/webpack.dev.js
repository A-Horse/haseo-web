const Merge = require('webpack-merge');
const webpack = require('webpack');

const BaseConfig = require('./webpack.base.js');

module.exports = Merge(BaseConfig, {
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
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name]-[id].bundle.js.map',
      exclude: ['vendor.miscellaneous.js']
    })
  ]
});
