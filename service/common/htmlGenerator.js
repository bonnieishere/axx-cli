const path = require('path')
const getHtml = require(path.resolve(process.cwd(), 'axx-cli-config/custom/getHtml'))
const html = getHtml()
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
	return html.map(function(conf) {
		return new HtmlWebpackPlugin(conf)
	})
}