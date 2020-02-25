module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          configFile: './tsconfig.json'
        }
      },
      {
        loader: 'react-docgen-typescript-loader',
        options: {
          tsconfigPath: './tsconfig.json',
          setDisplayName: false
        }
      }
    ]
  });

  config.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
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
          plugins: function () {
            return [
              require('autoprefixer')
            ];
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
  });

  // remove svg files from the default file-loader rule as were using react-svg-loader
  config.module.rules.forEach(rule => {
    if (rule.test.source && rule.test.source.includes('svg|')) {
      const newTest = new RegExp(rule.test.source.replace('svg|', ''));
      rule.test = newTest;
    }
  });

  config.module.rules.push({
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
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
