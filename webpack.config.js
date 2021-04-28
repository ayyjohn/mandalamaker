const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

module.exports = {
  entry: './lib/mandala_maker.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [new Serve({
    port: 8000
  })],
  resolve: {
    extensions: ['.js', '*']
  },
};
