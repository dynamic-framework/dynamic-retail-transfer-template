const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = (isProduction = false) => {
  if (isProduction) {
    return [
      new HtmlWebpackPlugin(
        ({
          inject: true,
          template: path.resolve(__dirname, '../public/index.html'),
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }),
      ),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[contenthash:8].chunk.css'
      }),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
    ];
  }

  return [
    new HtmlWebpackPlugin(
      ({

        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
      }),
    ),
  ];
};
