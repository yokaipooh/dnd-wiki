const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		extensions: ['.tsx', '.jsx', '.ts', '.js'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@constants': path.resolve(__dirname, 'src/constants'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@enum': path.resolve(__dirname, 'src/enum'),
			'@interfaces': path.resolve(__dirname, 'src/interfaces'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@contexts': path.resolve(__dirname, 'src/contexts'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},
	devServer: {
		hot: true,
		port: process.env.PORT || 8081,
		historyApiFallback: true,
		static: {
			directory: path.resolve(__dirname, 'public', 'index.html'),
			serveIndex: true,
			watch: true,
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['ts-loader'],
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public',
					to: '.',
					filter: (name) => {
						return !name.endsWith('index.html');
					},
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
			favicon: './public/favicon.ico',
			filename: 'index.html',
			manifest: './public/manifest.json',
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env),
		}),
	],
};
