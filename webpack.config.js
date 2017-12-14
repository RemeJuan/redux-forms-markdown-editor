const webpack = require('webpack');

const path = require('path');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    app: './src/index.js',
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },

  module: {
    rules: [
      {
        test: /^(?!.*\.test\.jsx?$).*\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   comments: false,
    //   sourceMap: false,
    //   minimize: true,
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
  ],

  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'index.js',
    library: 'react-mde',
    libraryTarget: 'umd'
  },
};
