import _ from 'lodash';
import Fuse from 'fuse.js';
import React from 'react';
import Head from 'next/head';

import { SearchResult } from '../../components/SearchResult';
import { SortableList } from '../../components/SortableList';
import {
  ToDoDefault,
  ToDoWithProgress,
  ToRead,
} from '../../components/ToDo';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      todoList: [],
      toreadList: [],
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.addItem = this.addItem.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
  }

  updateSearch(event) {
    this.setState({ query: event.target.value });
    // console.log(event.target.value);
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      console.log('You pressed Enter and will add to the Todo List');
      this.addItem(event);
    }
  }

  addItem(event) {
    const {
      todoList,
      toreadList,
    } = this.state;

    const id = event.target.id;

    if (id === "addToDo") {
      const taskname = event.target.value;
      const updatedToDoList = _.concat(todoList, [ taskname ] );
      this.setState( {todoList: updatedToDoList } );
    } else if (id === "addToRead") {
      const articlename = event.target.value;

      // hit api
      if (true) {
        const updatedToReadList = _.concat(toreadList, [ articlename ] );
        this.setState( {toreadList: updatedToReadList } );
      } else {
        alert('We could not hit the url. Please enter a valid url')
      }
    }
  }


  render() {
    const {
      todoList,
      toreadList,
    } = this.state;

    /*
    const fuse = new Fuse(list, options); // "list" is the item array
    const displayResults = fuse.search(this.state.query);

    // Prevents lag since we dont have to render all the results
    const top10displayResults = _.take(displayResults, 10);
    */
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {/*
          Default
            - 15m expand and collapse to hide the bottom part - use accordion comp
            - 30m createa component called todolist - you pass prop - todo or toread
            - if you try to use react to manage the todoList, it wouldnt work because if you update the children todo, the todoList wouldnt know
            - 1h use redux
          Advanced
          ToRead
            - 1h create API - is it valid url? if not setalert

          Search the task
          Check Todo
          Add Todo
          Remove Todo
          Edit Todo
          */}

          <h2>Default </h2>
            {/*
            <input type="radio" id="male" name="gender" value="male"/>
              <label for="male">Add Item</label><br/>
            <input type="radio" id="female" name="gender" value="female"/>
              <label for="female">Search</label><br/>
              */}
          <div className="inputContainer">
            <input type="text"
              className="input"
              placeholder="What would you like to add?"
              onChange={this.updateSearch}
              onKeyDown={this.keyPressed}
              id="addToDo"
            />
          </div>

          <SortableList>
            { _.map(todoList, todoItem => (
              <ToDoDefault key={todoItem} taskName={todoItem} />
            ))}
          </SortableList>


          <h2>ToRead - metasccraper or urlmetadata</h2>
          <div className="inputContainer">
            <input type="text"
              className="input"
              placeholder="What article link?"
              onChange={this.updateSearch}
              onKeyDown={this.keyPressed}
              key="addToRead"
              id="addToRead"
            />
          </div>

          <SortableList>
            { _.map(toreadList, toreadItem => (
              <ToRead key={toreadItem} title={toreadItem} />
            ))}
          </SortableList>

            {/*
          <h2>Progress</h2>
          <ToDoWithProgress />
          */}

        </main>
      </div>
    );
  }
}

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'question',
    'answer.text',
    'answer.code',
  ],
};

export default Todo;
