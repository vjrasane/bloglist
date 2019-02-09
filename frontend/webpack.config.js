require('babel-polyfill')

// const webpack = require('webpack')
// const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.jsx')],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    compress: true,
    port: process.env.FRONTEND_PORT || 5000,
    proxy: {
      '/api': 'http://localhost:3000',
      '/socket.io': { target: 'ws://localhost:3000', secure: false, ws: true }
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [path.join(__dirname, 'src'), /node_modules/]
      }
    ]
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //   template: './public/index.html',
    //   filename: 'index.html'
    // }),
    new CopyWebpackPlugin([
      { from: './public/index.html', to: 'index.html' },
      { from: './public/manifest.json', to: 'manifest.json' },
      { from: './public/favicon.ico', to: 'favicon.ico' }
    ])
  ]
}
