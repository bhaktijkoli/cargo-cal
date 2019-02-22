const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
  context: __dirname + '/client/js',
  entry: {
    app: './app.js',
    core: './core.js',
  },
  output: {
    path: path.join(__dirname, "public/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
   new WebpackNotifierPlugin(),
 ]
};
