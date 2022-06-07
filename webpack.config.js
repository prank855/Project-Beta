/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


pages = ['index','editor']
module.exports = {
	mode: 'development',
	entry: pages.reduce((config, page) => {
		config[page] = `./src/pages/${page}.ts`;
		return config;
	  }, {}),
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	plugins: [].concat(
		pages.map(
		  (page) =>
			new HtmlWebPackPlugin({
			  inject: true,
			  template: `./src/pages/${page}.html`,
			  filename: `${page}.html`,
			  chunks: [page],
			})
		),
		new CleanWebpackPlugin(),
	  ),
	  module: {
		rules: [
		  {
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: [
			  {
				loader: 'ts-loader',
			  },
			  
		   ]
		 }
	   ]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.png', '.html'],
	},
	devtool: `inline-source-map`,
	devServer: {
		static: ['./dist', './src/pages/assets'],
		client: {
			progress: true
		},
		port: 3000,
		server: 'http',
		host: '0.0.0.0',
		historyApiFallback: true,
		compress: true,
		hot: true,
		allowedHosts: "all",
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			chunks: "all",
		  },
		minimizer: [
			new TerserPlugin({
				extractComments: true,
				terserOptions: {
					mangle: { keep_classnames: true },
					compress: { ecma: 2015, passes: 1, unsafe: true },
				},
			}),
		],
		minimize: true,
	},
};
