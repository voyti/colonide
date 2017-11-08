var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

// var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
// var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
// var pixi = path.join(phaserModule, 'build/custom/pixi.js');
// var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    devtool: 'eval',
    module: {
      loaders: [
        { loader: 'script-loader', test: /(pixi|phaser).js/ },
        { test: /\.css$/, loader: "style!css" },
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