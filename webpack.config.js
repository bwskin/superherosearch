const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

var config = {
    context: __dirname + '/src',
    entry: {
        app: ['babel-polyfill', './main.ts'],
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                    esModule: false,
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json', ".ts"]
    },
    devtool: "sourcemap",
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Superhero Search!',
            filename: 'index.html',
            template: 'main.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        proxy: {
            "/api" : {
                target:"http://superheroapi.com",
                headers: {
                    'Host' : "superheroapi.com"
                }
            }
        }
    }
};


module.exports = config;