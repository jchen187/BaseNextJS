import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../javascript/prismPlugins.js';
import '../../javascript/prismPluginsCSS.js';

import CodeBlock from './CodeBlock';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

const js = 'js';
const css = 'css';
const bash = 'bash';
const jsCode1 = 'var code = 1';
const jsCode2 = `
import React from "react"
import Prism from "prismjs"

export class PrismCode extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.highlight()
  }

  componentDidUpdate() {
    this.highlight()
  }

  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current)
    }
  }

  render() {
    const { code, plugins, language } = this.props
    return (
      <pre className={!plugins ? "" : plugins.join(" ")}>
        <code ref={this.ref} className={\`language-\${language}\`}>
          {code.trim()}
        </code>
      </pre>
    )
  }
}
`;
const cssCode = 'color: red';
const bashCode = 'npm install lodash';
const plugins = ['line-numbers'];


storiesOf('CodeBlock', module)
  .addDecorator(CenterDecorator)
  .add('JS Short', () => <CodeBlock code={jsCode1} language={js} />)
  .add('JS Long', () => <CodeBlock code={jsCode2} language={js} />)
  .add('JS Long with Line Numbers', () => <CodeBlock code={jsCode2} plugins={plugins} language={js} />)
  .add('CSS', () => <CodeBlock code={cssCode} language={css} />)
  .add('Bash', () => <CodeBlock code={bashCode} language={bash} />)
  .add('Multiple', () => (
    <>
      <CodeBlock code={jsCode1} language={js} />
      <CodeBlock code={cssCode} language={css} />
    </>
  ));
