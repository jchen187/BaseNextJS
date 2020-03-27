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

### Future Considerations
- scss modules
- storybook
  - scss in storybook
- eslint
- pm2 to manage processes
- yeoman to easily create components
- mongodb for search and database related items
- firebase
- redux
- prismjs

## Setting Up NextJS
1. npm init next-app - NEWER
   npx create-next-app
  - make sure name is all lowercase

## Checking Node Modules
1. npm install -g npm-check-updates
2. add line to package.json in scripts section
  - `"checkModules": "ncu"`

## Setting Up Linting
1. npm install eslint --save-dev
2. npm audit fix
  - You might have some packages with low
3. npx eslint --init
4. npx eslint yourfile.js
  - manually lint your file
5. add line to package.json in scripts section
  - `"lint": "./node_modules/.bin/eslint ./pages"`

      OR

1. add line to package.json in scripts section
  - `"lint": "npx eslint ./pages"`

## Setting Up Linting
1. npm install -g eslint-watch
  - make sure you have eslint globally installed
  - npm i -g eslint eslint-watch
2. add line to package.json in scripts section
  - `"watchLint": "esw --color --watch --changed --ext-js,jsx src"`

## Setting Up SCSS
There is now built in support for scss
https://nextjs.org/blog/next-9-3
https://nextjs.org/docs/basic-features/built-in-css-support

### NEW
1. npm install sass (doesnt need to be global)
2. Make sure restart your server if you have it running
3. Very similar to regular CSS components
Component
import styles from 'Button.module.scss'

SCSS
Button.module.scss

### OLD
Back then you had to install packages to import .css and .scss files
https://github.com/zeit/next-plugins/tree/master/packages/next-css
https://github.com/zeit/next-plugins/tree/master/packages/next-sass

1. Install the relevant packages
  - npm install --save @zeit/next-css
  - npm install --save @zeit/next-sass node-sass
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

## Setting Up Storybook
1.

## Process Management With PM2
1.

## Acknowledgement
1.


