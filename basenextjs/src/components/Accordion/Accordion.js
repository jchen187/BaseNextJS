import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';

import styles from './Accordion.module.scss';
import 'rc-collapse/assets/index.css';

class Accordion extends React.Component {
  render() {
    return (
      <>
        <Collapse accordion>
          <Panel header="hello" headerClass="my-header-class">this is panel content</Panel>
          <Panel header="title2">this is panel content2 or other</Panel>
        </Collapse>
      </>
    );
  }
}

Accordion.propTypes = {
};

Accordion.defaultProps = {
};

export default Accordion;
