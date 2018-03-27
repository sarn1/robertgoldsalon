var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var ConcatPlugin = require('webpack-concat-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
      collapseWhitespace: true
  }
});

var HtmlWebpackPluginConfig2 = new HtmlWebpackPlugin({
  template: __dirname + '/app/index-type2.html',
  filename: 'index-type2.html',
  inject: 'body',
  minify: {
      collapseWhitespace: true
  }
});

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
    { from: 'images', to: 'images/', context: 'app/' },
    { from: 'js', to: 'js/', context: 'app/' }
]);

// var ConcatPluginConfig = new ConcatPlugin({
//     // examples
//     uglify: false,
//     sourceMap: false,
//     name: 'result',
//     outputPath: '/dist/',
//     fileName: '[name].[hash:8].js',
//     filesToConcat: ['./app/js/**'],
//     attributes: {
//         async: false
//     }
// });


var ExtractTextPluginConfig = new ExtractTextPlugin('style.css');

var entrypoint = process.env.npm_lifecycle_event === 'dev' ?
  'webpack-dev-server/client?http://localhost:8080' :
  './app/index.js';

module.exports = {
  entry: entrypoint,
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname + '/app',
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        include: __dirname + '/app',
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist']), HtmlWebpackPluginConfig, HtmlWebpackPluginConfig2, ExtractTextPluginConfig, CopyWebpackPluginConfig]
}
