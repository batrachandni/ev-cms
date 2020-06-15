const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //run babel on everyfile
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [
                    'react',
                    'es2015',
                    'stage-0'
                ]
            }
        },
        {
            test: /\.jsx?$/, 
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [
                    'react',
                    'es2015',
                    'stage-0'
                ]
            }
        },
        {
            test: /\.(css|sass|scss)$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            }]
        }, {
            test: /\.(ttf|eot|svg|ttc)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }]
        }, {
            test: /\.(jpe?g|png|gif)$/,
            use: [{
                loader: 'file-loader',

                options: {
                    name: 'images/[name].[ext]'
                }
            }]
        },
        {
            test: /\.(mp4|ogg|webm)$/,
            use: [{
                loader: 'file-loader',

                options: {
                    name: 'videos/[name].[ext]'
                }
            }]
        },
        {
            test: /\.modernizrrc.js$/,
            use: [ 'modernizr-loader' ]
        },
        {
            test: /\.modernizrrc(\.json)?$/,
            use: [ 'modernizr-loader', 'json-loader' ]
        }]
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, ".modernizrrc")
        }
    }
}