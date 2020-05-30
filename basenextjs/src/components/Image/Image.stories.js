import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from './Image';

// This does not work
// import chinchilla from '/chinchilla1.jpg';
import chinchilla from '../../../public/chinchilla1.jpg';
import test from '../../../public/test.jpg';

const styles = {
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('Image', module)
  .addDecorator(CenterDecorator)
  .add('chinchilla', () => <Image defaultSrc={chinchilla}
    mobile={test}
    tablet={chinchilla}
    desktop={test}
  />)
  .add('Test', () => <Image defaultSrc={test} />);
