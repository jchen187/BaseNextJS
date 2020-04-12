
import React from 'react';
import { storiesOf } from '@storybook/react';

import TemplateToCopy from './TemplateToCopy';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('TemplateToCopy', module)
  .addDecorator(CenterDecorator)
  .add('Example 1', () => <TemplateToCopy />)
  .add('Example 2', () => <TemplateToCopy />);
