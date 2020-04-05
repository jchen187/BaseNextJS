import React from 'react';
import { storiesOf } from '@storybook/react';

import LinePatternAnimation from './LinePatternAnimation';
import SolidPatternAnimation from './SolidPatternAnimation';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('Animation', module)
  .addDecorator(CenterDecorator)
  .add('Line', () => <LinePatternAnimation />)
  .add('Line on Repeat', () => <LinePatternAnimation repeat />)
  .add('Solid', () => <SolidPatternAnimation />)
  .add('Solid on Repeat', () => <SolidPatternAnimation repeat />)
  .add('Multiple', () => (
    <>
      <SolidPatternAnimation repeat />
      <SolidPatternAnimation repeat />
      <LinePatternAnimation repeat />
    </>
  ))
  .add('ToDo - Multiple Animating At Different Times - Maybe Add Scrolling?', () => (
    <>
      <SolidPatternAnimation repeat />
      <LinePatternAnimation repeat />
    </>
  ));
