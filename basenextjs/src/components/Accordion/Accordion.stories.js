
import React from 'react';
import { storiesOf } from '@storybook/react';

import Accordion from './Accordion';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('Accordion', module)
  .addDecorator(CenterDecorator)
  .add('Example 1', () => <Accordion />)
  .add('Example 2', () => <Accordion />);
