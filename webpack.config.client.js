const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    target : 'web',
    node: {
        fs: "empty"
    },
    context: path.resolve('./src'),
    // entry file
    entry: './client/index.js',
    //output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default']
        }),
        new webpack.DefinePlugin({
            IS_SERVER: false,
            IS_CLIENT: true,
            'process.env.BROWSER': JSON.stringify(true),
        }),
        new CleanWebpackPlugin(['public']),
        new CopyWebpackPlugin([
            {
                from: './client/assets',
                to: './'
            }
        ]),
        new ExtractTextPlugin({
            filename: "css/style.css",
            allChunks: true
        })
    ]
}



module.exports = merge(baseConfig, config);