const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
module.exports = {
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        public: process.env.PUBLIC_URL,
        watchOptions: {
            ignored: [/node_modules/, '/public/images/'],
        }
    },
    css: {
        extract: false,
    },
    configureWebpack: {
      optimization: {
        splitChunks: false // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
      },
      plugins: [
        new HtmlWebpackPlugin({
         
          template: 'public/index.html', // this is important - a template file to use for insertion
          inlineSource: '.(js|css)$' // embed all javascript and css inline
        }),
        new HtmlWebpackInlineSourcePlugin()
      ]
    }
}
