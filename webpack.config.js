var webpack = require('webpack');
var ET = require('extract-text-webpack-plugin');
module.exports = {
	entry:__dirname + '/src/js/app.js',
	output:{
		path:__dirname + '/prd/',
		filename:'bundle.js'
		//版本号控制开发过程中不常用
		//filename:'[name]-[hash].js'
	},
	devtool:'source-map',
	
	//loader
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style!css'
			},
			
			//es6解析
//			{
//				test:/\.js$/,
//				loader:'babel-loader?presets[]=es2015'
//			},
            {
            	test:/\.js/,
            	loader:'jsx'
            },
			
			{
				test:/\.scss$/,
				//loader:'style!css!sass'//loader的解析从后向前
				loader:ET.extract('style','css!sass')
				//串行!和并行,
			}
		]
	},
	devServer:{
		contentBase:__dirname + "/prd",
		port:80,
		host:'localhost',
		inline:true,
		proxy:{
			'/api':{
				target:'http://localhost:9000',
				pathRewrite:{
					'^/api':''
				}
			}
		}
		
	}
	,
	
	plugins:[
		//最后一步再压缩
		//new webpack.optimize.UglifyJsPlugin(),
		new ET('bundle.css')
	]

}
