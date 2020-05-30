import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import <%= componentName %> from './<%= componentName %>';
import globalStyles from './styles.scss';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

storiesOf('<%= componentName %>', module)
  .addDecorator(CenterDecorator)
  .add('Default with Global Styles', () => <div className={globalStyles.test}><<%= componentName %> /></div>)
  .add('Version 1', () => <<%= componentName %> />)
  .add('Version 2', () => <<%= componentName %> />);
