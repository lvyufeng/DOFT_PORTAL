/*
* @Author: lvyufeng
* @Date:   2018-03-31 13:01:22
* @Last Modified by:   lvyufeng
* @Last Modified time: 2018-03-31 14:06:39
*/

'use strict';/*
* @Author: lvyufeng
* @Date:   2018-03-31 11:00:08
* @Last Modified by:   lvyufeng
* @Last Modified time: 2018-03-31 13:01:22
*/
const path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');

var config = {
  entry: {
  	'index':['./src/page/index/index.js'],
  	'login':['./src/page/login/login.js'],
    'common':['./src/page/common/index.js']
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  externals:{
  	'jquery':'window.jQuery',
  },
  module: {
      loaders: [
        { test: /\.css$/, loader: Ex.extract('css-loader')}
      ]
  },
  plugins:[
  	new webpack.optimize.CommonsChunkPlugin({
  		name:'common',
  		filename:'js/base.js'
  	}),
    new Ex("css/[name].css")
  ]

  

};

module.exports = config;