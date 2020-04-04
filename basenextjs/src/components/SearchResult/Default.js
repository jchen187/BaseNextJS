import _ from 'lodash';
import classNames from 'classnames';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
//const Prism = require('prismjs');

//import '../../../src/styles/prism.css';
import styles from './Default.module.scss';

//assignment to undeclared variable SearchResult if you dont have the let SearchResult. You can also leave that line out and do
// 1. export default (props) => {
// 2. let SearchResult;
// export default SearchResult = (props) => {
// 3. export default function SearchResult(props) {
// 4. export default function (props) {

/*
let SearchResult;
export default SearchResult = (props) => {
  const {
    answer,
    code,
    dateAdded,
    dateLastModified,
    links,
    question,
    tags,
  } = props;

const testCode = `var data = 1;`;
const html = Prism.highlight(testCode, Prism.languages.javascript, 'javascript');

  return (
    <div className={classNames(styles.container, styles.content)}>
      <div className="sticker">
        <span className={styles.dot}></span>
      </div>
      <h5 className={classNames(styles.title)}>{ question }</h5>
      <h6 className={classNames(styles.subtitle)}>Tags</h6>
      { _.map(tags, tag => (
        <span className={styles.tag}>{ tag }</span>
      ))}
      <h6 className={classNames(styles.subtitle)}>Answer</h6>
      <p className={styles.text}>{ answer }</p>
      <h6 className={classNames(styles.subtitle)}>Code</h6>
      <pre>
        <code className="language-javascript">{ html }</code>
      </pre>

      <h6 className={classNames(styles.subtitle)}>Links and Resources</h6>
      <ul>
        { _.map(links, link => (
          <li>Link</li>
        ))}
      </ul>
      <h6 className={classNames(styles.subtitle)}>ToDo</h6>
      <ol>
        <li>Buttons - Edit, Delete, Reorganize, Expand Contents</li>
        <li>Need conditional Render</li>
        <li>How to Style Code</li>
        <li>Last modified and added</li>
        <li>Tags should be links. When you click, it should do a search</li>
      </ol>
    </div>
  );
};
*/

class SearchResult extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const {
      answer,
      code,
      dateAdded,
      dateLastModified,
      links,
      options,
      question,
      tags,
    } = this.props;

    const testCode = `var data = 1;`;
    const html = Prism.highlight(testCode, Prism.languages.javascript, 'javascript');

    return (
      <div className={classNames(styles.container, styles.content)}>
        {/*
        <h6 className={classNames(styles.subtitle)}>ToDo</h6>
        <ol>
          <li>Buttons - Edit, Delete, Reorganize, Expand Contents</li>
          <li>Need conditional Render</li>
          <li>How to Style Code</li>
          <li>Last modified and added</li>
          <li>Tags should be links. When you click, it should do a search</li>
        </ol>
        */}
        <div className="sticker">
          <span className={styles.dot}></span>
        </div>
        <h5 className={classNames(styles.title)}>{ question }</h5>
        { !_.isEmpty(tags) && (
          <React.Fragment>
            <h6 className={classNames(styles.subtitle)}>Tags</h6>
            { _.map(tags, tag => (
              <span className={styles.tag}>{ tag }</span>
            ))}
          </React.Fragment>
        )}
        { answer && (
          <React.Fragment>
            <h6 className={classNames(styles.subtitle)}>Answer</h6>
            <p className={styles.text}>{ answer }</p>
          </React.Fragment>
        )}
        { code && (
          <React.Fragment>
            <h6 className={classNames(styles.subtitle)}>Code</h6>
            <pre>
{/*
          <code className="language-javascript">{ html }</code>
*/}
              <code className="language-javascript">
{/*
{`onSubmit(e) {
	e.preventDefault();
	const job = {
		title: 'Developer',
		company: 'Facebook'
	};
}`}
*/}
                  { code }
              </code>
            </pre>
          </React.Fragment>
        )}
        { options && (
          <React.Fragment>
            <h6 className={classNames(styles.subtitle)}>Options</h6>
            { _.map(options, option => (
              <p>
                <span>{option.english} - </span>
                <pre><code className="language-javascript">{option.spanish}</code></pre>
              </p>
            ))}
          </React.Fragment>
        )}
        { links && (
          <React.Fragment>
            <h6 className={classNames(styles.subtitle)}>Links and Resources</h6>
            <ul>
              { _.map(links, link => (
                <li>Link</li>
              ))}
            </ul>
          </React.Fragment>
        )}
      </div>
    );
  }
}

SearchResult.propTypes = {
    answer: PropTypes.string,
    code: PropTypes.string,
    dateAdded: PropTypes.string,
    dateLastModified: PropTypes.string,
    links: PropTypes.array,
    options: PropTypes.array,
    question: PropTypes.string,
    tags: PropTypes.array,
};

SearchResult.defaultProps = {
  question: 'When you dont have a question, ask a question'
}

export default SearchResult;
/*
const SearchResult = (props) => {
  const {
    answer,
    code,
    question,
    tags,
  } = props;

  return (
    <React.Fragment>
      <p>{ question }</p>
      <p>{ tags }</p>
      <p>{ answer }</p>
      <p>{ code }</p>
    </React.Fragment>
  );
};

export default SearchResult;
*/


