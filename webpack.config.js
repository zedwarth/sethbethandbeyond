const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/js/main.js', './src/scss/main.scss'],
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
    rules: [{
      test: /\.(sass|scss)$/,
      include: path.resolve(__dirname, './src/scss'),
      use: ExtractTextPlugin.extract([
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ])
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '/css/[name].css'
    })
  ]
};
