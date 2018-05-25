var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HappyPack = require('happypack');

var config = {
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/app/app.js')],
    resolve: {
        alias: {
            envConfig: path.resolve(__dirname, './src/app/config/dev-config.js'),
            config: path.resolve(__dirname, './src/app/config/app-config.js'),
            assets: path.resolve(__dirname, './src/app/assets'),
            components: path.resolve(__dirname, './src/app/components'),
            utils: path.resolve(__dirname, './src/app/utils'),
            services: path.resolve(__dirname, './src/app/services')
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-inline-source-map',
    devServer: {
        contentBase: 'build/',
        noInfo: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: {
            children: false,
            chunks: false
        }
    },
    eslint: {
        configFile: '.eslintrc'
    },
    cache: true,
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: path.resolve(__dirname, 'src')
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'happypack/loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!resolve-url!sass-loader?sourceMap')
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]',
                include: [
                    /assets[\\\/]fonts/
                ]
            },
            {
                test: /\.(svg|gif|png|jpe?g)$/,
                loader: 'file?name=images/[name].[ext]',
                include: [
                    /assets[\\\/]images/
                ]
            },
            {
                test: /\.ico$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new HappyPack({
            loaders: [
                {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            favicon: 'src/favicon.ico',
            template: './src/index.ejs'
        }),
        new ExtractTextPlugin('bundle.css', {
            allChunks: true
        })
    ],
    postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
    ]
};

module.exports = config;
