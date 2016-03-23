var url = require('url');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'knockout-validation-example.js',
    devtoolModuleFilenameTemplate: function (info) {
      var comps = url.parse(info.absoluteResourcePath);

      if (comps.protocol) {
        return info.absoluteResourcePath;
      }

      return 'webpack-src:///knockout-validation-example/' + path.relative('.', info.absoluteResourcePath);
    },
  },
  devtool: 'source-map',
};
