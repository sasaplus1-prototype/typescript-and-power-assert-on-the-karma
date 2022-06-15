module.exports = function(config) {
  const c = {};

  c.basePath = '.';
  c.client = {
    mocha: {
      reporter: 'html',
      ui: 'bdd',
    }
  };
  c.files = [
    {
      pattern: '*.ts',
      type: 'js',
    },
  ];
  c.frameworks = ['mocha'];
  c.mime = {
    'text/x-typescript': ['ts']
  };
  c.preprocessors = {
    '*.ts': ['webpack'],
  };
  c.reporters = ['dots'];

  const webpack = require('webpack');

  c.webpack = {
    devtool: 'inline-source-map',
    mode: 'development',
  };
  c.webpack.module = {
    rules: []
  };
  c.webpack.module.rules.push({
    test: /\.ts$/i,
    use: [
      {
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            module: 'ESNext',
            target: 'ES2015'
          },
          transpileOnly: true
        }
      }
    ]
  });
  c.webpack.module.rules.push({
    enforce: 'post',
    test: /\.test\.ts$/,
    use: ['webpack-espower-loader']
  });
  c.webpack.plugins = [
    // NOTE: util has `process.env.NODE_DEBUG`
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': false
    })
  ];
  c.webpack.resolve = {
    alias: {
      // NOTE: use built power-assert for the browser
      'power-assert-formatter': require.resolve(
        'power-assert-formatter/build/power-assert-formatter'
      ),
      // NOTE: use built power-assert for the browser
      assert: require.resolve('power-assert/build/power-assert'),
      // NOTE: power-assert depends to buffer and util
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/')
    },
    extensions: ['.ts', '...'],
  };

  config.set(c);
};
