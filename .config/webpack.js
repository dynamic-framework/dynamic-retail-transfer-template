const path = require('node:path');

const getIsProduction = require('./getIsProduction');
const getOutput = require('./getOutput');
const getOptimization = require('./getOptimization');
const getPlugins = require('./getPlugins');
const getModule = require('./getModule');

module.exports = (env, argv) => {
  const isProduction = getIsProduction(argv);
  const isProductionProfile = isProduction && argv.profile;

  return {
    stats: {
      assets: true,
      modules: true,
      providedExports: true,
      usedExports: true,
      optimizationBailout: true,
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      },
      allowedHosts: [
        '.modyo.cloud'
      ],
      client: {
        webSocketURL: {
          hostname: '127.0.0.1',
          pathname: '/ws',
          protocol: 'ws'
        },
      },
    },
    target: ['browserslist'],
    mode: isProduction ? 'production' : 'development',
    bail: isProduction,
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: getOutput(isProduction),
    optimization: getOptimization(isProduction, isProductionProfile),
    module: getModule(isProduction),
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: getPlugins(isProduction),
  };
};
