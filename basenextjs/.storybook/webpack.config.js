const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      // Allows for Regular SCSS
      // use: ['style-loader', 'css-loader', 'sass-loader'],

      // Allows for SCSS Modules
      use: [
              { loader: 'style-loader' },
              {
                  loader: 'css-loader',
                  options: {
                      modules: true,
                  }
              },
              {loader:"sass-loader"}
          ],
      include: /\.module\.scss$/
    }
  );

  return config;
};
