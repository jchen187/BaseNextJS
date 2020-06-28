import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import date from 'date-and-time';
import _ from 'lodash';

import Accordion from '../Accordion';

import styles from './ToRead.module.scss';

const pattern = date.compile('MMM D, YYYY h:mm:ssA');

class ToRead extends React.Component {
  constructor(props) {
    super(props);
    const {
      title,
    } = props;

    const dateAdded = date.format(new Date(), pattern);

    this.ref = React.createRef();
    this.state = {
      isDone: false,
      source: 'Source',
      title,
      url: 'www.yahoo.com',
      description: 'Sample Discription',
      notes: 'Your Notes Here',
      dateAdded,
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
      dateAdded,
    } = this.state;

    const header = (
        <div className={styles.toReadHeader}>
          <input type="checkbox" checked={isDone} onChange={(e) => {this.handleClick(e)}} />
          {source} <a href={url}>{title}</a> Tags Date Added {dateAdded}
          <p>{description}</p>
        </div>
    );

    const content = (
        <div className={styles.toReadCollapsibleSection}>
          <textarea name="message" rows="10" cols="30">
            {notes}
          </textarea>
        </div>
    );

    return (
      <div className={styles.toRead}>
        <Accordion header={header} content={content}/>
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
