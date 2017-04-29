const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './js/index.js',
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'js')
  },
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin(),
//     new HtmlWebpackPlugin({template: './index.html'}),
//     new CopyWebpackPlugin([
//             { from: {
//                     glob:'css/**/*',
//                     dot: true
//                 },
//                 to: 'dist/css' },
//             { from: {
//                     glob:'extras/**/*',
//                     dot: true
//                 },
//                 to: 'dist/extras' },
//             { from: 'fonts' },
//             { from: {
//                     glob:'images/**/*',
//                     dot: true
//                 },
//                 to: 'dist/images' },
//             { from: 'js' },
//             { from: 'lib' },
//             { from: {
//                     glob:'pages/**/*',
//                     dot: true
//                 },
//                 to: 'dist/pages' },
//             { from: 'pics' }
//         ])
//   ]
};

module.exports = config;
