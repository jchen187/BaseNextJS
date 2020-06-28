import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';

import styles from './Accordion.module.scss';

class Accordion extends React.Component {
  render() {
    const {
      header,
      content,
    } = this.props;

    return (
      <>
        <Collapse accordion>
          <Panel header={header} headerClass="my-header-class">{content}</Panel>
        </Collapse>
      </>
    );
  }
}

Accordion.propTypes = {
};

Accordion.defaultProps = {
  header: <p>Header</p>,
  content: <p>Panel Content</p>,
};

export default Accordion;
