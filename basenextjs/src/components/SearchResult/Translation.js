import _ from 'lodash';
import classNames from 'classnames';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
// const Prism = require('prismjs');

// import '../../../src/styles/prism.css';
import styles from './Translation.module.scss';

class Translation extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const {
      from,
      options,
      tags,
      to,
    } = this.props;

    const testCode = 'var data = 1;';
    const html = Prism.highlight(testCode, Prism.languages.javascript, 'javascript');

    return (
      <div className={classNames(styles.container, styles.content)}>
        <div className="sticker">
          <span className={styles.dot} />
        </div>
        <h5 className={classNames(styles.title)}>{ from }</h5>
        { !_.isEmpty(tags) && (
          <>
            <h6 className={classNames(styles.subtitle)}>Tags</h6>
            { _.map(tags, (tag) => (
              <span className={styles.tag}>{ tag }</span>
            ))}
          </>
        )}
        { to && (
          <div className={styles.codeBlockContainer}>
            <pre className={styles.codeBlock}>
              <code className="language-css">
                { to }
              </code>
            </pre>
          </div>
        )}
        { options && (
          <div>
            <h6 className={classNames(styles.subtitle)}>Options</h6>
            { _.map(options, (option) => (
              <div className={styles.codeBlockOptionContainer}>
                <span>{option.english}</span>
                <div>
                  <pre className={styles.codeBlockWithinOptions}>
                    <code className="language-javascript">
                      {option.spanish}
                    </code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Translation.propTypes = {
  from: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
  tags: PropTypes.arrayOf(PropTypes.string),
  to: PropTypes.string,
};

Translation.defaultProps = {
  from: '',
  options: [],
  tags: [],
  to: '',
};

export default Translation;
