var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: 'source-map',
    devServer: {
      port: 8080,
      disableHostCheck: true,
      contentBase: path.join(__dirname, "dist"),
    },
    module: {
      loaders: [
        { loader: 'script-loader', test: /(pixi|phaser).js/ },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader?presets[]=es2015"
        }, {
          test: /\.html$/,
          exclude: /index/,
          use: [
            'ngtemplate-loader',
            { loader: 'html-loader', options: { minimize: true, removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true } },
          ],
        },
      ]
    },
    resolve: {
      modules: [__dirname + "/src", "node_modules"], // preceed looking in node_modules with loking in root
    },
    plugins: [new HtmlWebpackPlugin({
      title: 'Colonide',
      filename: 'index.html',
      template: 'src/index.html',
    })]
};