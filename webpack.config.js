var _ = require('underscore');
var path = require('path');
var pkg = require('./package');

var webpackAlias = pkg.webpackAlias || {};

try {
  webpackAlias = require('./webpack.alias');
} catch (e) { }

module.exports = {
  entry: path.resolve(pkg.main),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bingads-ko-validation.js',
    library: 'bingads-ko-validation',
    libraryTarget: 'umd',
    umdNamedDefine: false,
    devtoolModuleFilenameTemplate: 'webpack:///bingads-ko-validation/[resource-path]',
  },
  externals: _.keys(pkg.peerDependencies),
  resolve: { alias: webpackAlias },
  devtool: 'source-map',
};
