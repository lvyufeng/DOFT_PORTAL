/*
* @Author: lvyufeng
* @Date:   2018-03-31 13:01:22
* @Last Modified by:   lvyufeng
* @Last Modified time: 2018-03-31 21:44:44
*/

'use strict';

const path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

var getHtmlConfig = function(name){
  return {
        template:'./src/view/'+ name +'.html',
        filename:'view/'+ name +'.html',
        inject:true,
        hash:true,
        chunks:['common',name]
      }
}

var config = {
  entry: {
  	'index':['./src/page/index/index.js'],
  	'login':['./src/page/login/login.js'],
    'common':['./src/page/common/index.js']
  },
  output: {
    filename: 'js/[name].js',
    publicPath:'/dist',
    path: path.resolve(__dirname, 'dist')
  },

  externals:{
  	'jquery':'window.jQuery',
  },
  module: {
      loaders: [
        { test: /\.css$/, loader: Ex.extract('css-loader')},
        { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'file-loader?limit=100&name=resource/[name].[ext]' },
      ]
  },
  plugins:[
  //独立通用模块
  	new webpack.optimize.CommonsChunkPlugin({
  		name:'common',
  		filename:'js/base.js'
  	}),
    //单独打包css
    new Ex("css/[name].css"),
    //html模版处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]

  

};

if (WEBPACK_ENV == 'dev') {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports = config;