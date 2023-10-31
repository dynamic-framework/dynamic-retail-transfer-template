const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (isProduction = false, isProductionProfile = false) => {
  if (isProduction) {
    return {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isProductionProfile,
            keep_fnames: isProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'initial',
        cacheGroups: {
          default: {
            name: 'raw',
            priority: 1,
            test: /[\\/](date-fns|react-datepicker|i18next|react-i18next)[\\/]/,
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'app-modules',
            priority: 0,
          },
          defaultChunks: {
            test: /.*/,
            name: 'app-chunks',
            priority: -1,
          },
        },
      },
    };
  }

  return {
    minimize: false,
  };
}
