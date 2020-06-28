import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './ToRead.module.scss';

class ToRead extends React.Component {
  constructor(props) {
    super(props);
    const {
      title,
    } = props;

    this.ref = React.createRef();
    this.state = {
      isDone: false,
      source: 'Source',
      title,
      url: 'www.yahoo.com',
      description: 'Sample Discription',
      notes: 'Your Notes Here',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({isDone: !this.state.isDone});
  }

  refreshMetaInfo() {
    // hit url again to fetch meta
    // does not affect isDone and notes
  }

  render() {
    const {
      isDone,
      source,
      title,
      url,
      description,
      notes,
    } = this.state;

    return (
      <div className={styles.toRead}>
        <div className={styles.toReadHeader}>
          <input type="checkbox" checked={isDone} onChange={(e) => {this.handleClick(e)}} />
          {source} <a href={url}>{title}</a> Tags Date Added
          <p>{description}</p>
        </div>
        <div className={styles.toReadCollapsibleSection}>
          <textarea name="message" rows="10" cols="30">
            {notes}
          </textarea>
        </div>
      </div>
    );
  }
}

ToRead.propTypes = {
};

ToRead.defaultProps = {
  title: 'Default Title',
};

export default ToRead;
