'use strict';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { resolveRoot } = require('./helpers');

module.exports = {
  entry: {
    main: resolveRoot('src/main.ts'),
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@c': resolveRoot('src/app/core'),
      '@m': resolveRoot('src/app/modules'),
      '@s': resolveRoot('src/app/shared'),
      '@': resolveRoot('src'),
    },
    extensions: ['.vue', '.js', '.jsx', '.tsx', '.ts', '.json', '.mjs', '.wasm'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      // static assets -----------------------------------------------------------

      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset',
        // TODO: Re-enable after this bug is fixed https://github.com/vuejs/vue-loader/issues/1729
        // generator: {
        //   filename: 'img/[hash][ext][query]',
        // },
      },

      // do not base64-inline SVGs.
      // https://github.com/facebookincubator/create-react-app/pull/1180
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        // TODO: Re-enable after this bug is fixed https://github.com/vuejs/vue-loader/issues/1729
        // generator: {
        //   filename: 'img/[hash][ext][query]',
        // },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        // TODO: Re-enable after this bug is fixed https://github.com/vuejs/vue-loader/issues/1729
        // generator: {
        //   filename: 'media/[hash][ext][query]',
        // },
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        // TODO: Re-enable after this bug is fixed https://github.com/vuejs/vue-loader/issues/1729
        // generator: {
        //   filename: 'fonts/[hash][ext][query]',
        // },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      showErrors: true,
      cache: true,
      template: resolveRoot('public/index.html'),
      filename: resolveRoot('dist/index.html'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: resolveRoot('dist/stats.json'),
      statsOptions: { source: false },
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};
