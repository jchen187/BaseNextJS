import _ from 'lodash';
import Fuse from 'fuse.js';
import React from 'react';
import Head from 'next/head';

import { SearchResult } from '../../components/SearchResult';

import list from './codeList.js';

class Search extends React.Component {
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
    const fuse = new Fuse(list, options); // "list" is the item array
    const displayResults = fuse.search(this.state.query);

    // Prevents lag since we dont have to render all the results
    const top10displayResults = _.take(displayResults, 10);

    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Explain
            {' '}
            <a href="https://nextjs.org">This</a>
          </h1>
          <ul className="description">
            <li>Todo</li>
            <li>Update keys for translation</li>
            <li>Use api to fetch results</li>
          </ul>

          <div className="inputContainer">
            <input type="text" className="input" placeholder="What do you want to search?" onChange={this.updateSearch} />
          </div>

            { _.map(top10displayResults, (item) => {
              const {
                question,
                answer,
                tags,
                resources
              } = item.item;
              return (
                <SearchResult question={question} answer={answer} tags={tags} links={resources} />
              )}
            )}

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

export default Search;
