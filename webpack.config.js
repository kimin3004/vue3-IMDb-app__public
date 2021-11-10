const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/main.js', // webpack은 기본적으로 js파일만 해석, vue같은 다른 확장자 파일은 loader이 필요
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true, // dist내부 불필요한 파일 제거
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // exclude: /node_modules\/(?!(axios))/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './src/index.html', // path.resolve(__dirname, )자동으로 적용됨
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
  devServer: {
    port: 8079,
    historyApiFallback: true,
  },
};
