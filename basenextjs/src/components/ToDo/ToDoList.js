import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import date from 'date-and-time';
import _ from 'lodash';

import ToDoDefault from './ToDoDefault';
import ToRead from './ToRead';
import { SortableList } from '../SortableList';

const pattern = date.compile('MMM D, YYYY h:mm:ssA');

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };

    this.addItem = this.addItem.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.clearEventValue = this.clearEventValue.bind(this);
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      console.log('You pressed Enter and will add to the Todo List');
      this.addItem(event);
      this.clearEventValue(event);
    }
  }

  addItem(event) {
    const {
      list,
    } = this.state;

    const id = event.target.id;

    if (id === "addToDo") {
      const taskname = event.target.value;
      const updatedToDoList = _.concat(list, [ taskname ] );
      this.setState( {list: updatedToDoList } );
    } else if (id === "addToRead") {
      const articlename = event.target.value;

      // hit api
      if (true) {
        const updatedToReadList = _.concat(list, [ articlename ] );
        this.setState( {list: updatedToReadList } );
      } else {
        alert('We could not hit the url. Please enter a valid url')
      }
    }
  }

  clearEventValue(event) {
      event.target.value = '';
  }

  render() {
    const {
      list,
    } = this.state;

    const {
      component,
      title,
      placeholder,
    } = this.props;

    const Component = component;

    const id = component === ToDoDefault ? "addToDo" : "addToRead";
    return (
      <>
      <h2>{title}</h2>
      <div className="inputContainer">
        <input type="text"
          className="input"
          placeholder={placeholder}
          onChange={this.updateSearch}
          onKeyDown={this.keyPressed}
          id={id}
        />
      </div>
      <SortableList id={title}>
        { _.map(list, todoItem => (
          <Component key={todoItem} taskName={todoItem} title={todoItem}/>
        ))}
      </SortableList>
      </>
    );
  }
}

ToDoList.propTypes = {
  component: PropTypes.oneOf([ToDoDefault, ToRead]),
};

ToDoList.defaultProps = {
  component: ToDoDefault,
  placeholder: "What would you like to add?",
};

export default ToDoList;
