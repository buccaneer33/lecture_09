'use strict';

const path              = require('path');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcss           = require('postcss');
let FaviconsPlugin      = require('favicons-webpack-plugin');
var sass                = require('sass');
const autoprefixer      = require('autoprefixer');
const constants         = require("./constants");

const config = {
	mode: "production",
	entry:
	entry:[
		'./src/js/index.js',
		'./src/scss/index.scss',
	],
	output: {path: path.resolve(__dirname, 'dist'),filename: 'js/main.js'},
	module: {
		rules: [
				{	test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {loader: 'babel-loader', options: {presets: ['babel-preset-env']}}
				},{ 
					test: /\.(sa|sc|c)ss$/,
					include: path.resolve(__dirname, 'src/scss'),
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{	loader: 'css-loader', options: {url: false, minimize: true, sourceMap: false}
							},{
								loader: 'sass-loader', options: {sourceMap: false}
							},{
							loader: 'postcss-loader'
							}
						],
						publicPath:'./css/'
					})
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						  {
							loader: 'file-loader',
							options: {
								name: './img/[name].[ext]',
								context: path.resolve(__dirname, "./img")
							}
						  }
						]
				},
				{
					  test: /\.(ttf|eot|woff|woff2)$/,
					  use:
					  {
						loader: "file-loader",
						options: {
						  name: "[name].[ext]",
						  context: path.resolve(__dirname, "./fonts")
						},
					  }
					  
					  
					}
		]
  },
  plugins: [
     new ExtractTextPlugin({
		 filename:'./css/index.css',
		 allChunks: true, 
		 }),      
	 new HtmlWebpackPlugin({
		files: {
			"css": [ "index.css" ],
			"js" : [ "js/main.js"],
				"chunks": {
					  "head": {
						"entry": "",
						"css": [ "css/index.css" ]
					  },
					  "main": {
						"entry": "js/main.js",
						"css": []
					  },
				}
			},
			title: 'Epam-Markup Http build',
			minify: {collapseWhitespace: true},
			filename: '../dist/index.html',
			template: './src/html/template/index.html'
        }),
	new FaviconsPlugin({
    logo: './src/favicon/favicon-2016.jpg',  
    prefix: 'favicon/',    
    emitStats: false,    
    statsFilename: 'iconstats-[hash].json',
    persistentCache: true,
    inject: true, 
	background: '#fff',
    title: 'Webpack App',
		icons: {
		  android: true,
		  appleIcon: true,
		  appleStartup: true,
		  coast: false,
		  favicons: true,
		  firefox: true,
		  opengraph: false,
		  twitter: false,
		  yandex: false,
		  windows: false
		}
	})
  ]
};
module.exports = config;