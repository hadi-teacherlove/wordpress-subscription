const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const zipFiles = require('./zip.js');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isDevelopment = !isProduction;

    return {
		optimization: {
            minimize: isProduction, // Only minimize in production mode
        },
        entry: {
            frontend: './src/frontend.js',
            backend: './src/backend.js'
        },
        output: {
            path: path.resolve(__dirname, 'assets'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
						'cache-loader',
						'thread-loader',
						{
							loader: 'babel-loader',
							options: { cacheDirectory: true }
						}
					]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer'),
                                    ],
                                },
                            },
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            } ),

			new zipFiles( {
				option: true,
			} )
        ],
        externals: {
            jquery: 'jQuery',
            lodash: 'lodash',
            '@wordpress/i18n': 'wp.i18n',
            '@wpSubscription': 'wordpressSubscription',
        },
        watch: isDevelopment,
        devtool: isDevelopment ? 'eval-cheap-module-source-map' : false
    };
};