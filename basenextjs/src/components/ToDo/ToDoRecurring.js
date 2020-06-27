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
      notes: 'sample notes',
      history: [ `Created ${dateCreated}` ],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleFrequencySelect = this.handleFrequencySelect.bind(this);
    this.getDateRedo = this.getDateRedo.bind(this);
  }

  handleClick() {
    const {
      isDone,
      dateCompleted,
      frequency,
      history,
    } = this.state;

    const now = date.format(new Date(), pattern);

    if (frequency !== 0) {
      const futureDate = date.format(date.addDays(new Date(), frequency), pattern);
      const eventEntry = [ `Completed ${now} - Revisit ${futureDate}`];
      const updatedHistory = _.concat(eventEntry, history);

      this.setState({
        history: updatedHistory,
        dateRedo: futureDate,
        dateCompleted: now,
      });

      alert(`The next time you have to do is ${futureDate}`);
    } else {
      const eventEntry = !isDone ? [`Completed ${now}`] : [ `Undo ${now}` ];
      const updatedHistory = _.concat(eventEntry, history);

      this.setState({
        history: updatedHistory,
        dateCompleted: now,
        isDone: !isDone,
      });
    }

    // TODO: should i prevent you from clicking it
  }

  handleTaskNameChange(e) {
    this.setState({taskName: e.target.value});
  }

  handleNotesChange(e) {
    this.setState({notes: e.target.value});
  }

  handleFrequencySelect(e) {
    // frequency is the same as the number of days till the you have to perform task again
    const newFrequency = parseInt(e.target.value);

    const {
      dateCompleted,
      frequency,
      history,
    } = this.state;

    // change frequency
    if (frequency !== newFrequency) {
      let eventEntry =  [ `Updated frequency from ${frequency} to ${newFrequency}`];

      if (dateCompleted) {
        const dateRedo = this.getDateRedo(dateCompleted, newFrequency);
        eventEntry = _.concat([`Revisit on ${dateRedo}`], eventEntry);
      }
      const updatedHistory = _.concat(eventEntry, history);

      this.setState({
        history: updatedHistory,
        frequency: newFrequency,
        dateRedo: this.getDateRedo(dateCompleted, newFrequency),
      });
    }
  }

  getDateRedo(dateCompleted, frequency) {
    if (dateCompleted && frequency !== 0) {
      const dateCompletedObject = date.parse(dateCompleted, pattern);
      const dateRedo = date.format(date.addDays(dateCompletedObject, frequency), pattern);
      return dateRedo;
    } else {
      return '';
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
      history,
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
            { dateRedo && (
              <p>Due Date - {dateRedo}</p>
            ) }
          <p>History</p>
          <ul>
            { _.map(history, entry => (
              <li>{entry}</li>
            ))}
          </ul>
          <p>Notes</p>
          <textarea name="message" rows="10" cols="30" onChange={(e) => {this.handleNotesChange(e)}} defaultValue={notes}></textarea>
      </div>
    );
  }
}

ToDoDefault.propTypes = {
};

ToDoDefault.defaultProps = {
};

export default ToDoDefault;
