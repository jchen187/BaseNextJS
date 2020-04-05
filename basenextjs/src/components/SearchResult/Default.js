import _ from 'lodash';
import classNames from 'classnames';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
// const Prism = require('prismjs');

// import '../../../src/styles/prism.css';
import styles from './Default.module.scss';

// assignment to undeclared variable SearchResult if you dont have the let SearchResult.
// You can also leave that line out and do
// 1. export default (props) => {
// 2. let SearchResult;
// export default SearchResult = (props) => {
// 3. export default function SearchResult(props) {
// 4. export default function (props) {

/*
 * TODO
 * Buttons - Edit, Delete, Reorganize, Expand Contents
 * Need conditional Render
 * How to Style Code
 * Last modified and added
 * Tags should be links. When you click, it should do a search
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

    const testCode = 'var data = 1;';
    const html = Prism.highlight(testCode, Prism.languages.javascript, 'javascript');

    return (
      <div className={classNames(styles.container, styles.content)}>
        <div className="sticker">
          <span className={styles.dot} />
        </div>
        { !_.isEmpty(tags) && (
          <>
            { _.map(tags, (tag) => (
              <span className={styles.tag}>{ tag }</span>
            ))}
          </>
        )}
        <h5 className={classNames(styles.title)}>{ question }</h5>
        { !_.isEmpty(answer) && (
          <>
            <h6 className={classNames(styles.subtitle)}>Answer</h6>
            { _.map(answer, (section) => (
              <>
                { section.text && (
                  <p className={styles.text}>{ section.text }</p>
                )}
                { (section.code) && (
                    <pre>
                      <code className="language-javascript">
                        { section.code }
                      </code>
                    </pre>
                )}
              </>
            ))}
          </>
        )}
        { !_.isEmpty(options) && (
          <>
            <h6 className={classNames(styles.subtitle)}>Options</h6>
            { _.map(options, (option) => (
              <p>
                <span>
                  {option.english}
                  {' '}
                  -
                  {' '}
                </span>
                <pre><code className="language-javascript">{option.spanish}</code></pre>
              </p>
            ))}
          </>
        )}
        { !_.isEmpty(links) && (
          <>
            <h6 className={classNames(styles.subtitle)}>Links and Resources</h6>
            <ul>
              { _.map(links, (link) => (
                <li>
                  <a href={link}>{link}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

// PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
SearchResult.propTypes = {
  answer: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  code: PropTypes.string,
  dateAdded: PropTypes.string,
  dateLastModified: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
  question: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

SearchResult.defaultProps = {
  answer: '',
  code: '',
  dateAdded: '',
  dateLastModified: '',
  links: [],
  options: [],
  question: 'Seems Like There is No Question Here...',
  tags: [],
};

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
