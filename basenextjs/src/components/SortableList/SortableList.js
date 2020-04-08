import React from 'react';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';

import styles from './SortableList.module.scss';

class SortableList extends React.Component {
  componentDidMount() {
    const { id, options } = this.props;
    const el = document.getElementById(id);
    const sortable = Sortable.create(el, options);
    // TODO - make options more customizable
  }

  render() {
    const { id, children, enclosingComponent } = this.props;

    const Component = enclosingComponent;

    return (
      <Component id={id}>
        { children }
      </Component>
    );
  }
}

SortableList.propTypes = {
  id: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.string, PropTypes.number),
  enclosingComponent: PropTypes.oneOf(['div', 'ul']),
};

SortableList.defaultProps = {
  id: 'items',
  options: { animation: 150 },
  enclosingComponent: 'div',
};

export default SortableList;
