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
  ToDoList,
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
            - if you try to use react to manage the todoList, it wouldnt work because if you update the children todo, the todoList wouldnt know
            - 1h use redux
            - add multiple of the same list - does it work - yes
            - 10m can we prevent the accordion from expanding if you click the header section
          Advanced
          ToRead
            - 1h create API - is it valid url? if not setalert

          Search the task
          Check Todo
          Add Todo
          Remove Todo
          Edit Todo
          */}

            <ToDoList title="Recurring" />
            <ToDoList title="One Time" />
            <ToDoList title="Reading List" component={ToRead}/>

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
