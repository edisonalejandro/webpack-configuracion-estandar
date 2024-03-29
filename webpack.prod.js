const HtmlWebPack       = require('html-webpack-plugin');
const MiniCssExtract    = require("mini-css-extract-plugin");
const CopyPlugin        = require("copy-webpack-plugin");
const Terser            = require("terser-webpack-plugin");
const CssMinimizer      = require("css-minimizer-webpack-plugin");

module.exports = {
    mode : 'production',

    output : {
        clean : true,
    },

    module: {
        rules : [
            {
                test: /\.html$/,
                loader : 'html-loader',
                options : {
                    sources : false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/, 
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [ 'style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                      loader: 'file-loader',
                    },
                  ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser({
              include: /\/includes/,
            }),
          ],
    },

    plugins: [
        new HtmlWebPack({
            title : 'Mi WebPack APP',
            filename : 'index.html',
            template : './src/index.html',
        }),
        
        new MiniCssExtract({
            filename : '[name].css',
            ignoreOrder: false,
        }),

        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ],
}