const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: [
    '../stories/**/*.stories.js',
    '../src/components/**/*.stories.js',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  /*
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
  */
};
