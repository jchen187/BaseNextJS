import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import { SearchResult } from '.';
import '../../styles/prism.css'; // NEED THIS TO GET HIGHLIGHINT WORKING IN STORYBOOK

const question = 'Orbitkey Why do some things happen and not others';
const answer = 'Connected Near Your Current Locations This is the answer';
const code = 'npm install test';
const tags = ['git', 'css', 'bash'];

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('SearchResult', module)
// .addDecorator(CenterDecorator)
  .add('Default', () => <SearchResult question={question} answer={answer} />)
  .add('Question only', () => <SearchResult question={question} />)
  .add('Answer only', () => <SearchResult answer={answer} />)
  .add('Question with Answer', () => <SearchResult question={question} answer={answer} />)
  .add('Question with Answer and Tags', () => <SearchResult question={question} tags={tags} answer={answer} />)
  .add('Question with Answer and Code', () => <SearchResult question={question} answer={answer} code="npm install" />)
  .add('2 Questions with Answer and Code', () => (
    <>
      <SearchResult question={question} answer={answer} code="npm install" />
      <SearchResult question={question} answer={answer} code="npm install" />
    </>
  ));
