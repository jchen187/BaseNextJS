import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import date from 'date-and-time';
import _ from 'lodash';

import styles from './ToDoWithProgress.module.scss';

const pattern = date.compile('MMM D, YYYY h:mm:ssA');

class ToDoDefault extends React.Component {
  constructor(props) {
    super(props);
    const dateCreated = date.format(new Date(), pattern);

    this.ref = React.createRef();
    this.state = {
      isDone: false,
      taskName: 'Temp Task Name',
      dateCompleted: '',
      dateCreated,
      dateRedo: '',
      frequency: 0,
      notes: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleFrequencySelect = this.handleFrequencySelect.bind(this);
    this.updateDateRedo = this.updateDateRedo.bind(this);
  }

  handleClick() {
    const {
      isDone,
      dateCompleted,
      frequency,
    } = this.state;

    this.setState({isDone: !isDone});

    if (!dateCompleted && !isDone) {
      const now = date.format(new Date(), pattern);
      this.setState({dateCompleted: now});
      this.updateDateRedo(now, frequency);
    } else {
      this.setState({
        dateCompleted: '',
        dateRedo: '',
      });
    }
  }

  handleTaskNameChange(e) {
    this.setState({taskName: e.target.value});
  }

  handleFrequencySelect(e) {
    // frequency is the same as the number of days till the you have to perform task again
    const frequency = parseInt(e.target.value);

    const {
      dateCompleted,
    } = this.state;

    this.updateDateRedo(dateCompleted, frequency);
  }

  updateDateRedo(dateCompleted, frequency) {
    if (frequency !== 0) {
      if (dateCompleted) {
        const dateCompletedObject = date.parse(dateCompleted, pattern);
        const dateRedo = date.format(date.addDays(dateCompletedObject, frequency), pattern);
        this.setState({dateRedo, frequency})
      } else {
        this.setState({frequency});
      }
    } else {
      this.setState({dateRedo: '', frequency: 0});
    }
  }

  render() {
    const {
      dateCompleted,
      dateCreated,
      dateRedo,
      frequency,
      isDone,
      notes,
      taskName,
    } = this.state;

    const frequencyMap = {
      0: 'One Time',
      3: 'Every 3 Days',
      7: 'Every 1 Week',
      14: 'Every 2 Weeks',
      30: 'Every 1 Month',
    }

    return (
      <div>
          <input type="checkbox" checked={isDone} onChange={(e) => {this.handleClick(e)}} />
          <input type="text" value={taskName} onInput={(e) => {this.handleTaskNameChange(e)}} />
            <span>{taskName}</span>
        <div className={classNames(styles.box, styles.tag)}>Tag</div>
          <p>Date Created - {dateCreated}</p>
          <p>Date Completed - {dateCompleted}</p>
            {/*
              Can we replace the values and make it int
              change the name and id
            <option value="0">One Time</option>
                */}
          <select id="cars" name="cars" onChange={(e) => {this.handleFrequencySelect(e)}}>
            { _.map(frequencyMap, (k, v) => (
              <option value={v}>{k}</option>
            ))}
          </select>
            <p>Next Time {dateRedo}</p>
            <textarea name="message" rows="10" cols="30" value={notes} />
      </div>
    );
  }
}

ToDoDefault.propTypes = {
};

ToDoDefault.defaultProps = {
};

export default ToDoDefault;
