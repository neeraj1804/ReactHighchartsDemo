const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry: "./src/index.js",
	output: {
		path: path.resolve( __dirname, "dist"),
		filename: "bundle.js",
		publicPath: "dist/"
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss']
	},
	module: {
		rules: [
			{
				use: "babel-loader",
				test: /\.jsx?$/,
				exclude: /node_modules/
			},
			{
				//use: ["style-loader", "css-loader"],
				loader: extractTextPlugin.extract({
					loader: "css-loader"
				}),
				test: /\.css$/
			},
			{
				test: /\.(jpe?g|png|svg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: { limit: 40000 }
					},
					"image-webpack-loader"
				]
			}
		]
	},
	plugins: [
		new extractTextPlugin("style.css"),
		new HtmlWebpackPlugin()
	]
};

module.exports = config;
