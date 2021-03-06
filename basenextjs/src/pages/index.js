import React from 'react';
import Head from 'next/head';
import Prism from 'prismjs';

import '../javascript/prismPlugins';

// not default export, so need the {} and the exact name
// make sense if you are exporting a lot of items. how do you differentiate
// import { ButtonWithCSS } from '../components/Button/ButtonWithCSS';
import { SearchResult } from '../components/SearchResult';
import CodeBlock from '../components/CodeBlock';
import Image from '../components/Image';

const code = `var data = 1;

console.log(test)`;
const bashResult = `ls
Desktop Document`;

// Returns a highlighted HTML string
// const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

class Home extends React.Component {
  componentDidMount() {
    // SHOULD DO THIS WITHIN COMPONENT. YOU RUN INTO ISSUES WHEN YOU DO THE HIGHLIGHT 2x

    console.log(`Environment: ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV === 'production') {
      // need this to get command line working on production
      Prism.highlightAll();
      console.log('highlighting done');
    }
    console.log('Prism work');
  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Welcome to
            {' '}
            <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <Image defaultSrc="/chinchilla1.jpg" />
          ----
          <Image defaultSrc="./test.jpg" />
          <Image defaultSrc="./test.png" />
          {/*
          CSS
          <ButtonWithCSS />
          --------------------
          SCSS and Some Code
          <ButtonWithSCSS />

          --------------------
          <LinePatternAnimation />
          <SolidPatternAnimation />
          */}

          {/*
          <pre>
            <code dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
          */}

          <pre className="command-line">
            <code className="language-javascript">var test = 1</code>
          </pre>


          <p>how to get it working for storbook? the babel does not work</p>
          <CodeBlock
            code="Espero que tu recuperes"
            plugins={['command-line']}
          />
          <CodeBlock
            code="Espero que tu recuperes"
            plugins={['line-numbers']}
          />
          <CodeBlock
            code="Espero que tu recuperes"
            plugins={['command-line']}
          />

          <CodeBlock
            code={code}
          />
          <CodeBlock
            code={code}
            plugins={['line-numbers']}
          />
          THIS ONE SHOULD HAVE CUSTOM USER AND HOST
          <CodeBlock
            code={code}
            plugins={['command-line']}
            dataUser="sam"
            dataHost="borad"
            dataOutput="2-3"
          />
          <CodeBlock
            code={bashResult}
            plugins={['command-line']}
            dataUser="sam"
            dataHost="borad"
            dataOutput="2"
          />

          <div>Single</div>
          <p>Test</p>
          <section>
            <div>
              Double
            </div>
          </section>
          <SearchResult
            question="what is this"
            answer={[
              { text: 'the answer' },
              { code },
            ]}
          />
          <SearchResult
            question="Next one"
            answer={[
              { text: 'work is so boring' },
              { code },
            ]}
          />


          <p className="description">
            Get started by editing
            {' '}
            <code>pages/index.js</code>
          </p>

          <section className="grid">
            <a href="https://nextjs.org/docs" className="card">
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className="card">
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/zeit/next.js/tree/master/examples"
              className="card"
            >
              <h3>Examples &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://zeit.co/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className="card"
            >
              <h3>Deploy &rarr;</h3>
              <p>
                Instantly deploy your Next.js site to a public URL with ZEIT Now.
              </p>
            </a>
          </section>
        </main>

        <footer>
          <a
            href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by
            {' '}
            <img src="/zeit.svg" alt="ZEIT Logo" />
          </a>
        </footer>

        <style jsx>
          {`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer img {
              margin-left: 0.5rem;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .title a {
              color: #0070f3;
              text-decoration: none;
            }

            .title a:hover,
            .title a:focus,
            .title a:active {
              text-decoration: underline;
            }

            .title {
              margin: 0;
              line-height: 1.15;
              font-size: 4rem;
            }

            .title,
            .description {
              text-align: center;
            }

            .description {
              line-height: 1.5;
              font-size: 1.5rem;
            }

            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
            }

            .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 3rem;
            }

            .card {
              margin: 1rem;
              flex-basis: 45%;
              padding: 1.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              transition: color 0.15s ease, border-color 0.15s ease;
            }

            .card:hover,
            .card:focus,
            .card:active {
              color: #0070f3;
              border-color: #0070f3;
            }

            .card h3 {
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
            }

            .card p {
              margin: 0;
              font-size: 1.25rem;
              line-height: 1.5;
            }

            @media (max-width: 600px) {
              .grid {
                width: 100%;
                flex-direction: column;
              }
            }
          `}
        </style>

        <style jsx global>
          {`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Home;
