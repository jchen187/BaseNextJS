/* eslint-disable
 react/jsx-props-no-spreading,
 react/prop-types,
 react/require-default-props,
 react/forbid-prop-types
*/

import React from 'react';

// import '../styles/global.scss';

/*
 * Because we cannot use .babelrc for Next, we have to manually import the css and js files
 * If you download from the site
 *  import '../styles/prism.css';
 * If you pull from node_modules
 *  import 'prismjs/themes/prism-<theme>.css'
 */

// Prism CSS
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/command-line/prism-command-line.css';
// import 'prismjs/plugins/previewers/prism-previewers.css';
// import 'prismjs/plugins/match-braces/prism-match-braces.css';

// Prism Plugins
// You need the toolbar to get the show-lang, copy, and command line to work
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/download-button/prism-download-button';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/command-line/prism-command-line';
import 'prismjs/plugins/previewers/prism-previewers';
import 'prismjs/plugins/match-braces/prism-match-braces';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
