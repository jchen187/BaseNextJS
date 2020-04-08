
import React from 'react';
import { storiesOf } from '@storybook/react';

import SortableList from './SortableList';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('SortableList', module)
  .addDecorator(CenterDecorator)
  .add('Example 1 - Div', () => (
    <SortableList>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </SortableList>
  ))
  .add('Example 1 - Ul', () => (
    <SortableList enclosingComponent="li">
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </SortableList>
  ))
  .add('Example 1 - Ul With Border', () => (
    <SortableList enclosingComponent="li">
      <div>Item With Border</div>
      <div>Item With Border</div>
    </SortableList>
  ))
  .add('Empty List', () => <SortableList />);
