const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
//const TerserPlugin = require('terser-webpack-plugin');

var version = JSON.parse(fs.readFileSync('./package.json')).version;

module.exports = [{
  name: 'default',
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'koat-databinder.js',
    path: path.join(__dirname, 'dist'),
    library: 'DataBinder',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    //minimize: false
  },
  plugins: [
    new webpack.BannerPlugin(`Koat DataBinder v${version}\nCopyright (c) ${new Date().getFullYear()} Sarsa Murmu\nhttps://github.com/sarsamurmu/koat-databinder`)
  ],
  resolve: {
    enforceExtension: false,
    enforceModuleExtension: false,
    extensions: ['.js'],
    modules: ['node_modules']
  }
}]
