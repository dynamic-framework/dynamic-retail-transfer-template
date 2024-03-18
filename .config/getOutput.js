const path = require('node:path');

module.exports = (isProduction = false) => {
  if (isProduction) {
    return {
      path: path.resolve(__dirname, '../build'),
      pathinfo: false,
      filename: '[name].js',
      chunkFilename: '[name].[contenthash:8].chunk.js',
      assetModuleFilename: '[name].[hash][ext]',
    };
  }

  return {
    path: path.resolve(__dirname, '../build'),
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    assetModuleFilename: '[name].[hash][ext]',
    crossOriginLoading: false,
  };
}
