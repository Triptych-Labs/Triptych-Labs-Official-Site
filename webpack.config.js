// webpack needs to be explicitly required
const webpack = require('webpack');

module.exports = {
  /* ... rest of the config here ... */

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  babelrc: true,
};
