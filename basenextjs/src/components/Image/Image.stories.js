import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from './Image';

// This does not work
// import chenchen from '/chenchen1.jpg';
import chenchen from '../../../public/chenchen1.jpg';
import test from '../../../public/test.jpg';

const styles = {
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

storiesOf('Image', module)
  .addDecorator(CenterDecorator)
  .add('Chenchen', () => <Image defaultSrc={chenchen}
    mobile={test}
    tablet={chenchen}
    desktop={test}
  />)
  .add('Test', () => <Image defaultSrc={test} />);
