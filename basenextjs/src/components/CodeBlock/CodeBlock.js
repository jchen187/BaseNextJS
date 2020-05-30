import React from 'react';
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import Prism from 'prismjs';
import PropTypes from 'prop-types';

// You need to import Normalizer - if you take it out you will run into issues
const nw = Prism.plugins.NormalizeWhitespace;

class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.highlight();
  }

  componentDidUpdate() {
    this.highlight();
  }

  highlight() {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current);
    }
  }

  render() {
    const {
      code,
      children,
      dataUser,
      dataHost,
      dataOutput,
      plugins,
      language
    } = this.props;

    const normalizedCode = nw.normalize(code, {
      // Extra settings
      // indent: 1
    });

    return (
      <>
      <pre className={!plugins ? '' : plugins.join(' ')}
        data-user={dataUser}
        data-host={dataHost}
        data-output={dataOutput}
      >
        <code ref={this.ref} className={`language-${language}`}>
          {normalizedCode}
        </code>
      </pre>
      </>
    );
  }
}

CodeBlock.propTypes = {
  code: PropTypes.string,
  dataUser: PropTypes.string,
  dataHost: PropTypes.string,
  dataOutput: PropTypes.string,
  language: PropTypes.string,
  plugins: PropTypes.arrayOf(PropTypes.string),
};

CodeBlock.defaultProps = {
  code: '',
  dataUser: '',
  dataHost: '',
  dataOutput: '',
  language: 'javascript',
  plugins: null,
};

export default CodeBlock;
