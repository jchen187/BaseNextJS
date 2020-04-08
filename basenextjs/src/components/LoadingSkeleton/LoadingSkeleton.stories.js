import React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingSkeleton from './LoadingSkeleton';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('LoadingSkeleton', module)
  .addDecorator(CenterDecorator)
  .add('Translation', () => <LoadingSkeleton />)
  .add('Search Result', () => <LoadingSkeleton />);
