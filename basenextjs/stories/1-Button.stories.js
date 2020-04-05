import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import Prism from 'prismjs';

import ButtonWithSCSS from '../src/components/Button/ButtonWithSCSS';
// import ButtonWithCSS from "../src/components/Button/ButtonWithCSS";
import { SearchResult } from '../src/components/SearchResult';

import '../src/styles/prism.css';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const PrismEx = () => (
  <div>
    <pre className="asdasd">
      <code className="language-javascript">
        var data = 12
      </code>
    </pre>
    <pre className="asdasd">
      <code className="">
        var data = 12
      </code>
    </pre>
    -----
    {/*
    */}
    <p className="orange">Using Regular CSS</p>
    <p className="blue">Using Regular SCSS</p>
    -----
    <ButtonWithSCSS />
    {/*
    <ButtonWithCSS />
    */}
    <SearchResult
      question="what is this"
      answer="the answer"
      code="some code"
    />
  </div>
);
