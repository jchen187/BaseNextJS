import React from 'react';
import Prism from 'prismjs';
import PropTypes from 'prop-types';

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

    return (
      <>
      <pre className={!plugins ? '' : plugins.join(' ')}
        data-user={dataUser}
        data-host={dataHost}
        data-output={dataOutput}
      >
        <code ref={this.ref} className={`language-${language}`}>
          {code.trim()}
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
