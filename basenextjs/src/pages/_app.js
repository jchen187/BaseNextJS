/* eslint-disable
 react/jsx-props-no-spreading,
 react/prop-types,
 react/require-default-props,
 react/forbid-prop-types
*/

import React from 'react';

import '../styles/prism.css';
import '../styles/global.scss';
// import "prismjs/themes/prism.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
