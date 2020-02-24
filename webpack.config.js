const path = require('path');
const ExtractCSSChunksPlugin = require('extract-css-chunks-webpack-plugin');

const publicDir = path.resolve(__dirname, 'public');
const assetsDir = path.resolve(publicDir, 'assets');
const publicPath = '/assets/';

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: assetsDir,
    publicPath,
    filename: 'index.js'
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    contentBase: publicDir,
    publicPath,
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  stats: {
    colors: true
  },
  plugins: [
    new ExtractCSSChunksPlugin({
      path: assetsDir,
      filename: 'index.css',
      hmr: true
    }),
    require('webpack-fail-plugin')
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.loader.json'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          ExtractCSSChunksPlugin.loader,
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              localIdentName: '[local]__[hash:base64]',
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [require('autoprefixer')];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|tff|otf)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      }
    ]
  }
};
