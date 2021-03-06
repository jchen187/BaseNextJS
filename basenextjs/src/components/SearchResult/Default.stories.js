import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import { SearchResult } from '.';

const question = 'Orbitkey Why do some things happen and not others';
const answerOLD = 'Connected Near Your Current Locations This is the answer';
const answer1 = [
  { text: 'Connected Near Your Current Locations This is the answer' },
];
const answer2 = [
  {
    text: 'Connected Near Your Current Locations This is the answer',
    code: 'var = 1',
  },
  {
    code: 'npm install test',
  },
  {
    text: 'NO Code attached',
  },
  {
    code: `onSubmit(e) {
  e.preventDefault();
  const job = {
    title: 'Developer',
    company: 'Facebook'
  };`,
  },
];
const tags = ['git', 'css', 'bash'];
const links = [
  'www.yahoo.com',
  'https://swapps.com/blog/creating-animations-with-gsap-greensock/',
];

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('SearchResult - Default', module)
// .addDecorator(CenterDecorator)
  .add('Default', () => <SearchResult question={question} answer={answer1} />)
  .add('Question only', () => <SearchResult question={question} />)
  .add('Answer only', () => <SearchResult answer={answer1} />)
  .add('Simple - Question with Answer', () => <SearchResult question={question} answer={answer1} />)
  .add('Simple - Question with Answer and Tags', () => <SearchResult question={question} tags={tags} answer={answer1} />)
  .add('Simple - Question with Answer and Code', () => <SearchResult question={question} answer={answer1} />)
  .add('Hard - Question with Answer', () => <SearchResult question={question} answer={answer2} />)
  .add('Hard - Question with Answer and Tags', () => <SearchResult question={question} tags={tags} answer={answer2} />)
  .add('Hard - Question with Answer and Code', () => <SearchResult question={question} answer={answer2} links={links} />)
  .add('2 Questions with Answer and Code', () => (
    <>
      <SearchResult question={question} answer={answer1} tags={tags} links={links} />
      <SearchResult question={question} answer={answer2} tags={tags} />
    </>
  ));
