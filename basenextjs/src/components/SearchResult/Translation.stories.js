import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import { Translation } from '.';
import '../../styles/prism.css'; // NEED THIS TO GET HIGHLIGHINT WORKING IN STORYBOOK

const from1 = 'how are you';
const to1 = 'como estas';
const tags1 = ['Greeting','Directions'];

const from2 = 'this is _________';
const to2 = 'ella es ________';
const options2 = [{
  english: 'red',
  spanish: 'rojo',
}];

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('SearchResult - Translation', module)
// .addDecorator(CenterDecorator)
  .add('1 - From Only', () => <Translation from={from1} />)
  .add('1 - From and To only', () => <Translation from={from1} to={to1} />)
  .add('1 - With Tags Too', () => <Translation from={from1} to={to1} tags={tags1}/>)
  .add('2 - From Only', () => <Translation from={from2} />)
  .add('2 - From and To only', () => <Translation from={from2} to={to2} />)
  .add('2 - With Options Too', () => <Translation from={from2} to={to2} options={options2}/>);
