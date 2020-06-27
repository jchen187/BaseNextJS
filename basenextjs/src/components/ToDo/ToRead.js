import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './ToDoWithProgress.module.scss';

class ToRead extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isDone: false,
      source: 'Source',
      title: 'Title',
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
      <div>
          <input type="checkbox" checked={isDone} onChange={(e) => {this.handleClick(e)}} />
          Tags Added
          <p>{source} <a href={url}>{title}</a></p>
          <p>{description}</p>
          <textarea name="message" rows="10" cols="30">
            {notes}
          </textarea>
      </div>
    );
  }
}

ToRead.propTypes = {
};

ToRead.defaultProps = {
};

export default ToRead;
