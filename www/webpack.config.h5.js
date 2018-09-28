const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SyntaxDynamicImport = require("babel-plugin-syntax-dynamic-import");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
const stringReplace = new StringReplacePlugin();
module.exports = {
    entry: {
        app: ["babel-polyfill", "./src/App.js"]
    },
    output: {
        path: path.join(__dirname, "../dist"),//输出路径
        filename: "[name].js"//输出文件名
    },
    module: {
        rules: [
            {
                test: /config\.js$/,
                loader: StringReplacePlugin.replace({
                    replacements: [{
                        pattern: /owI24wrQnjOM6MDLCNtamLbRlVd8/ig,
                        replacement: function (match) {
                            return ''
                        }
                    }]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-3'],
                    plugins: ['syntax-dynamic-import']
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            vwx: path.resolve(__dirname, './vwx/index.js'),
            lessBase: path.resolve(__dirname, './src/assets/css/base.less')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        host: "192.168.0.103",
        port: 8080
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.tpl',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/*', to: '../dist/src' }
        ], {
            ignore: [],
                copyUnmodified: true,
                debug: "debug"
            }),
        extractLess
    ]
}

if (process.env.NODE_ENV != 'development') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
