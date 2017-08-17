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
      ])},
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: [{
          loader: 'file-loader', 
          options: {
            outputPath: '/css/'
          }
        }]
      }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '/css/[name].css'
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
}
};
