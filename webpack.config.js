/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: ['./src/client/index'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			template: './src/Client/index.html',
			filename: './index.html',
			//favicon: './src/Client/assets/favicon.ico',
			minify: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?ts$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.png'],
	},
	devtool: `inline-source-map`,
	devServer: {
		contentBase: ['./dist', './src/client/assets'],
		port: 3000,
		host: '0.0.0.0',
		historyApiFallback: true,
		overlay: true,
		compress: true,
		allowedHosts: ['.joshh.moe'],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: true,
				terserOptions: {
					mangle: { keep_classnames: true },
					compress: { ecma: 2015, passes: 1, unsafe: true },
				},
			}),
		],
		minimize: false,
	},
};
