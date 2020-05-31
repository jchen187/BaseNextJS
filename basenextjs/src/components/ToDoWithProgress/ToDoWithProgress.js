import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './ToDoWithProgress.module.scss';

class ToDoWithProgress extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      done: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({done: !this.state.done});
  }

  render() {
    const {
      done,
    } = this.state;

    return (
      <div className={styles.grid}>
        <div className={classNames(styles.box, styles.statusIcon)}>
          <input type="checkbox" checked={done} onChange={(e) => {this.handleClick(e)}} />
        </div>
        <div className={classNames(styles.box, styles.tag)}>Tag</div>
        <div className={classNames(styles.box, styles.task)}>Task</div>
        <div className={classNames(styles.box, styles.date)}>Dates</div>

        <div className={classNames(styles.box, styles.progressLabel)}>ProgressLabel</div>
        <div className={classNames(styles.box, styles.progressBar)}>ProgressBar</div>

        <div className={classNames(styles.box, styles.dropdownIcon)}>Drop Down</div>

        <div className={classNames(styles.box, styles.comments)}>
          Date - Comment
        </div>
        <div className={classNames(styles.box, styles.insertComment)}>
          Insert Comment
        </div>
      </div>
    );
  }
}

ToDoWithProgress.propTypes = {
};

ToDoWithProgress.defaultProps = {
};

export default ToDoWithProgress;
