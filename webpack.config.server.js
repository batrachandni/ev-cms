const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const historyFallback = require('connect-history-api-fallback');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    // Building for node not broser
    target: 'node',
    context: path.resolve('./src'),
    // entry file
    entry: './server/index.js',
    //output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_SERVER: true,
            IS_CLIENT: false,
            'process.env.BROWSER': JSON.stringify(true),
        }),
        new BrowserSyncPlugin({
            server: {
                baseDir: ['build'],
                middleware: [historyFallback()]
            },
            port: 3000,
            host: 'localhost',
            open: false,
        }),
        new CleanWebpackPlugin(['build']),
        new ExtractTextPlugin({
            filename: "css/style.css",
            allChunks: true
        })
    ]
}

module.exports = merge(baseConfig, config);