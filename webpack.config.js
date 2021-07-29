var path = require('path');

module.exports = {
  entry: './src/background/background.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './background.js'
  },
  mode: 'production',
  optimization: {
    minimize: true
  },
};