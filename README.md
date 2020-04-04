# BaseNextJS

## Summary
This repo intends to be a starting point for future projects

Included with be
- nextjs
- react
- scss modules
- storybook
  - scss in storybook
- eslint
- pm2 to manage processes
- yeoman to easily create components
- mongodb for search and database related items
- firebase
- redux

### Current Setup
1. nextjs
2. react
3. eslint
4. prismjs
5. scss modules
6. storybook
  - scss in storybook

### Future Considerations
- pm2 to manage processes
- yeoman to easily create components
- mongodb for search and database related items
- firebase
- redux

## Getting Started
Unless you want the name to stay as BaseNextJS and basenextjs, you will have to rename all occurrences of the name.

basenextjs
package.json

## Setting Up NextJS
1. `npm init next-app - NEWER`
   `npx create-next-app`
  - make sure name is all lowercase

## Checking Node Modules
1. `npm install -g npm-check-updates`
2. add line to `package.json` in scripts section
  - `"checkModules": "ncu"`

## Setting Up Linting
1. `npm install eslint --save-dev`
2. `npm audit fix`
  - You might have some packages with low
3. `npx eslint --init`
4. `npx eslint yourfile.js`
  - manually lint your file
5. add line to package.json in scripts section
  - `"lint": "./node_modules/.bin/eslint ./pages"`

      OR

1. add line to package.json in scripts section
  - `"lint": "npx eslint ./pages"`

## Setting Up Lint Watching
1. `npm install -g eslint-watch`
  - make sure you have eslint globally installed
  - `npm i -g eslint eslint-watch`
2. add line to package.json in scripts section
  - `"watchLint": "esw --color --watch --changed --ext-js,jsx src"`

## Setting Up Global CSS
1. Create a new `pages/_app.js`
```
import './prism.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
2. import any additional global styles you need

## Setting Up SCSS
There is now built in support for scss
https://nextjs.org/blog/next-9-3
https://nextjs.org/docs/basic-features/built-in-css-support

### NEW
1. `npm install --save sass`
2. Make sure restart your server if you have it running
3. Very similar to regular CSS components
  - Component File
    `import styles from 'Button.module.scss'`
  - SCSS File called `Button.module.scss`

### OLD
Back then you had to install packages to import .css and .scss files
https://github.com/zeit/next-plugins/tree/master/packages/next-css
https://github.com/zeit/next-plugins/tree/master/packages/next-sass

1. Install the relevant packages
  - `npm install --save @zeit/next-css`
  - `npm install --save @zeit/next-sass node-sass`
2. Add a next.config.js to project root
3. If you need to import both css and scss, you will need another package.

Only CSS Modules
```
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  /* config options here */
  })
```

Both CSS and SCSS
```
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  [sass, {cssModules: true}],
  [css, {cssModules: false}],
]);
```

## Setting Up PrismJS

1. `npm install prismjs`
2. Download the css file from https://prismjs.com
  - it seems like we need this file for actual color
  - https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript
3. Import the global css file in `pages/_app.js`
Regardless of how you choose to do it, it is recommended to wrap the code in a pre tag

### Option 1
Add this code where necessary
```
const Prism = require('prismjs');

const code = `var data = 1;`;
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

<pre>
  <code dangerouslySetInnerHTML={ {__html: html} }/>
</pre>

```

### Option 2
Add this code where necessary

I have noticed that if you have Prism.highlightAll() in the same file where you have <pre><code class="....">...</code></pre>, you will run into some weird code styles
```
// Page File
import Prism from 'prismjs';

componentDidMount() {
  Prism.highlightAll();
}

// Component File
<pre><code class="language-css">p { color: red }</code></pre>
```
## Move Essential Folders to Src
By default, all pages are under the page directory. You can now have it nested under `src`
https://nextjs.org/blog/next-9-1

## Setting Up Storybook
https://storybook.js.org/docs/guides/guide-react/
The process has been streamlined compared to last year in 2019. While you can still do it manually, it is easier if you follow the step below

1. `npx -p @storybook/cli sb init`
2. `npm run storybook`
3. In `.storybook/main.js`, update the path such that you can pull in stories from `src/components`
```
  stories: [
    '../stories/**/*.stories.js',
    '../src/components/**/*.stories.js',
  ],
```

### Issues
1. React is not defined when import a component.
  - in the component, add `import React from 'react';`
2. You cannot `import styles from "./styles.scss"` within the stories directory. You can do `import './styles.scss'` though.
https://stackoverflow.com/questions/48273019/storybook-webpack-will-not-load-scss-files

### Setting Up CSS Modules
By default, you can import regular css files. I could not figure out how to get CSS Modules working. It worked with previous versions of storybook. So it is likely due to new versions of some node modules.

However we can set up Scss modules. If you can have scss modules, do you need css modules? Not really.

### Setting Up Scss Modules
You need to customize the webpack config. Otherwise you will get this issue if you try to use SCSS Modules. `You may need an appropriate loader to handle this file type`

#### Option 1 - Did Not Work
https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
1. `npm install --save-dev css-loader sass-loader style-loader`
2. Provide a webpack field in main.js -.storybook/main.js
```
const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
};
```
3. Restart your storybook process

#### Option 2 - Did Not Work
https://github.com/storybookjs/presets/tree/master/packages/preset-scss

This only worked for regular css and scss files within the stories directory
1. `npm install --save @storybook/preset-scss css-loader sass-loader style-loader`
2. Edit .storybook/main.js
```
module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/preset-scss'
    /*
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOption: {
          modules: true,
        },
      },
    },
    */
  ],
```

#### Option 3 - Allowed Scss Modules in Components Only
1. `npm install --save-dev css-loader sass-loader style-loader`
2. Create a new file - .storybook/webpack.config.js
```
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
      // include: path.resolve(__dirname, '../'),
      include: /\.module\.scss$/
    }
  );

  return config;
};
```

## Process Management With PM2
1.

## Acknowledgement
1.


