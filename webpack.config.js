const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';
const URL_LOADER_SIZE_LIMIT = 8 * 1024;

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'hidden-source-map' : 'eval-cheap-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    historyApiFallback: true,
    port: 3000,
    hot: true,
    publicPath: '/'
  },

  entry: './src/index.tsx',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.css$/,
        use: ['stlye-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: URL_LOADER_SIZE_LIMIT
            }
          }
        ]
      }
    ]
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
