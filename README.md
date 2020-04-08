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
- Makefile or yeoman?
    - rename the project (not have it called basejs)
    - regenerate index file within src/components
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

### Other
`eslint FILE --fix`
`eslint FILE --fix-dry-run`

### ESLINT issues
1. JSX not allowed in files with extensions '.js'
https://stackoverflow.com/questions/43031126/jsx-not-allowed-in-files-with-extension-js-with-eslint-config-airbnb
Option 1 -.eslintrc
"rules": {
  "react/jsx-filename-extension": [0] ,
  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
}

Option 2 - webpack.config.js
resolve: { extensions: ['.js', '.jsx'] },
2. module.css and module.scss files - unexpected token .
You cannot lint css with eslint. eslint is for js

3. 'React' is not defined and 'React' must be in scopt when using JSX
import React from 'react';

4. 'Component' is missing in props-validation AND propType "Component" is not required, but has no corresponding defaultProps declaration
https://stackoverflow.com/questions/38684925/react-eslint-error-missing-in-props-validation
https://github.com/yannickcr/eslint-plugin-react/issues/1433

`import PropTypes from 'prop-types'`

Add to the components proptypes
```
ReactComponent.propTypes = {
  Component: ...
};

ReactComponent.defaultProps = {
Component: null
}
```

5. Prop spreading is forbidden
https://stackoverflow.com/questions/58726028/how-to-solve-prop-spreading-is-forbidden-in-custom-route-component
https://eslint.org/docs/user-guide/configuring
Add to the top of the file
```
/* eslint-disable
  react/jsx-props-no-spreading,
  react/prop-types
*/
```

6. This line has a length of 131. Maximum allowed is 100
Break up the line

7. Prop type object is forbidden OR Prop type array is forbidden
Object is too vague.
https://github.com/yannickcr/eslint-plugin-react/issues/2079
https://github.com/facebook/prop-types/issues/212

// Bad
PropTypes.object
PropTypes.array

// Good
PropTypes.objectOf(PropTypes.object)
PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))

8. Component should be written as a pure function
If you are only using render and do not need items like ComponentDidMount, do that

## Setting Up Lint Watching
1. `npm install -g eslint-watch`
  - make sure you have eslint globally installed
  - `npm i -g eslint eslint-watch`
2. add line to package.json in scripts section
  - `"watchLint": "esw --color --watch --changed --ext-js,jsx src"`

## Setting Up Global CSS and SCSS
1. Create a new `pages/_app.js`
```
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
2. Import any additional global styles you need
```
import './prism.css'
```

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

#### Caveats
If you have a global scss file and want to access the globally defined variables, you have to import the global file in each of your scss files.

```
@import "../global.scss"
```

Ideally, we shouldn't have to do this. Another option would be to utilize the configs, but that does not look like something that Next plans on using in the future.
https://github.com/zeit/next.js/issues/10912

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

### Customizing PrismJS
https://ian.pvdindustrial.com/blog/prismjs-npm-webpack-wordpress-theme-20180920/
https://betterstack.dev/blog/code-highlighting-in-react-using-prismjs/
https://prismjs.com/plugins/
To enable features like line numbering, you need to do a bit more

#### STORYBOOK
1. `npm install --save-dev babel-plugin-prismjs`
2. Create a .babelrc at the root of your project
```
{
  "plugins": [
    ["prismjs", {
      // "languages": ["javascript", "css", "html"],
      "plugins": ["line-numbers", "show-language"],
      // "theme": "okaidia",
      "css": true
    }]
  ]
}
```
You need the css to be true to get the line numbers and to show language.

#### FRONTEND
1. You need to add an extra line to babel
```
  "presets": [ "next/babel" ],

```
https://nextjs.org/docs/advanced-features/customizing-babel-config

For some reason we cant get these features to work on the frontend
It complains that you need to put all your global css in '_app.js'. This might have to do with some of the plugins calling css files

https://github.com/zeit/next.js/issues/10059
https://github.com/PrismJS/prism/issues/2186
https://github.com/zeit/next-plugins/issues/70

## Babel
Babel is responsible for compiling new code es6 and transpiling to older code. The .babelrc file will be used in storybook and in regular dev
https://nextjs.org/docs/advanced-features/customizing-babel-config
https://storybook.js.org/docs/configurations/custom-babel-config/

## Setting Up CSS Linting
https://github.com/stylelint/stylelint/blob/HEAD/docs/user-guide/get-started.md

`npm install --save-dev stylelint stylelint-config-standard`

`.stylelintrc.json`
```
{
  "extends": "stylelint-config-standard"
}
```

`npx stylelint "**/*.css"`

### SCSS Linting
`npm install --save-dev stylelint-config-sass-guidelines`

`.stylelintrc.json`
```
{
  "extends": "stylelint-config-sass-guidelines"
  "rules": {
    "indentation": "tab",
    "number-leading-zero": null
  }
}
```
## Moving Essential Folders to Src
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

## Routing
https://nextjs.org/docs/routing/introduction

Nested files are supported.

## Process Management With PM2
https://pm2.keymetrics.io/docs/usage/quick-start/

1. `npm install pm2@latest -g`
2. `pm2 ecosystem` - create a config file that can get you started

## GSAP
They updated the library a bit so you will have to read the docs.
i.e. TimelineMax can accept {} but will error out if given null.
https://greensock.com/forums/topic/21908-v3-webpack-importing-error-module-not-found-gsapgsap/

1. `npm install --save gsap`

### If you could import at the very top

OLD
`import { TimelineMax, Power2 } from 'gsap/TweenMax';`

NEW
`import { TimelineMax, Power2 } from 'gsap';`

### If you cannot import at the very top

OLD
```
const repeatConfigs = repeat ? { repeat: -1, repeatDelay: 1 } : null;
const GSAP = require('gsap/TweenMax');
const { TimelineMax, Power2 } = GSAP;
const tl_1 = new TimelineMax(repeatConfigs);
```

NEW
```
const repeatConfigs = repeat ? { repeat: -1, repeatDelay: 1 } : {};
const GSAP = require('gsap');
const { TimelineMax, Power2 } = GSAP;
const tl = new TimelineMax(repeatConfigs);
```

## Acknowledgement
1.


