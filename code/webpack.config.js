'use strict';

const path              = require('path');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let FaviconsWebpack     = require('favicons-webpack-plugin');
var sass                = require('sass');
const constants         = require("./constants");


const config = {
	mode: "development",
	entry:[
		'./src/js/index.js',
		'./src/scss/index.scss',
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/main.js'
	},
	devtool: "source-map",
	module: {
		rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						/**/loader: 'babel-loader',
						options: {presets: ['babel-preset-env']}
					}
				},{ 
					test: /\.(sa|sc|c)ss$/,
					include: path.resolve(__dirname, 'src/scss'),
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{loader: 'css-loader', options: {
								url: false,
								minimize: false,
								sourceMap: true
							}},{
							loader: 'sass-loader', options: {
								sourceMap: true
							}}
						],
						publicPath:'./css/'
					})
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
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
				},/*{
					test: /\.html$/,
					include: path.resolve(__dirname, 'src/html/includes'),
					use: ['raw-loader']
				  },*/
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
				},
			},
			title: constants.HTML_TITLE,
			author: constants.HTML_AUTHOR,
			//minify: {collapseWhitespace: true},
			filename: '../dist/index.html',
			template: './src/html/template/index.html'
        }),
	new FaviconsWebpack({
    logo: './src/favicon/favicon-2016.jpg', 
    prefix: 'favicon/',    
    emitStats: false,    
    statsFilename: 'iconstats-[hash].json',
    persistentCache: true,
    inject: true, 
	background: '#fff',
    title: 'Webpack App',
		icons: {
		  android: false,
		  appleIcon: false,
		  appleStartup: false,
		  coast: false,
		  favicons: true,
		  firefox: true,
		  opengraph: false,
		  twitter: false,
		  yandex: false,
		  windows: false
		}
	})
  ],
    devServer: {
    contentBase: path.join(__dirname, 'dist'),
	bonjour: true,
	    allowedHosts: [
      'dev__host.ude',
    ],
    compress: false,
    port: 9000
  }
};
module.exports = config;