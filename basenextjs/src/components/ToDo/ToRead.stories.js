
import React from 'react';
import { storiesOf } from '@storybook/react';

import ToDoWithProgress from './ToDoWithProgress';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('ToDoWithProgress', module)
  .addDecorator(CenterDecorator)
  .add('Example 1', () => <ToDoWithProgress />)
  .add('Example 2', () => <ToDoWithProgress />);
