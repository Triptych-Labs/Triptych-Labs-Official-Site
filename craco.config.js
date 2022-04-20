module.exports = {
  babel: {
    presets: ['@babel/preset-react'],
    // plugins: [],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      console.log('BABEL');
      console.log(babelLoaderOptions);
      return babelLoaderOptions;
    },
  },
};
