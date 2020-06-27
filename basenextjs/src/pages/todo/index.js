import _ from 'lodash';
import Fuse from 'fuse.js';
import React from 'react';
import Head from 'next/head';

import { SearchResult } from '../../components/SearchResult';
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
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(event) {
    this.setState({ query: event.target.value });
    // console.log(event.target.value);
  }

  render() {
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
          <h1 className="title">
            Types of Todo
          </h1>
          <ul className="description">
            <li>Done - Simple</li>
            <li>Done - Recurring</li>
            <li>Advanced</li>
            <li>ToRead</li>
          </ul>
          <h1 className="title">
            Todo
          </h1>
          <ul className="description">
            <li>Search the task</li>
            <li>Check Todo</li>
            <li>Add Todo</li>
            <li>Remove Todo</li>
            <li>Edit Todo</li>
          </ul>

          <div className="inputContainer">
            <input type="text" className="input" placeholder="What task are you looking for?" onChange={this.updateSearch} />
          </div>

          <h2>Default </h2>
          <ToDoDefault />

          <h2>ToRead - metasccraper or urlmetadata</h2>
          <ToRead />

          <h2>Progress</h2>
          <ToDoWithProgress />


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
