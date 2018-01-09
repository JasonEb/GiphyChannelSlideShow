var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./entry.jsx",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};