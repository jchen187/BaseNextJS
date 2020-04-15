import React from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';
import useSWR from 'swr';
/*
 * Sometimes you need absolute url and sometimes you dont
 * Seems like for getInitialProps - absolute works more often
 */

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

// This gets called whenever you refocus a page
// If you are using SWR, you should create a separate function where you call it and then this function will be called in the main component
function CompWithSWR() {
  const { data, error } = useSWR('/api/user', fetcher);
  //const user = data?.user;
  // let name = data && data.name;
  let name = data?.name;

  if (!data) {
    name = 'Loading...'
  }
  if (error) {
    name = 'Error fetching name.'
  }

  // You can return a value or a comp. Its up to you.
  // return (<p>SWR - {name} </p>)
  return name;
}

class ApiTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWithFetch1: '',
      dataWithFetch2: '',
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/user")
      .then(res => res.json())
      .then(data => {
        this.setState({ dataWithFetch1: data.name});
        return data.name;
      })
      .catch(error => {
        this.setState({ dataWithFetch1: 'Error'});
        console.log(error);
        return error;
      });

    fetch("/api/user")
      .then(res => res.json())
      .then(data => {
        this.setState({ dataWithFetch2: data.name});
        return data.name;
      })
      .catch(error => {
        this.setState({ dataWithFetch2: 'Error'});
        return error;
      });
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
            API Test With
            {' '}
            <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p>Fetch - {this.state.dataWithFetch1} </p>
          <p>Fetch - {this.state.dataWithFetch2} </p>
          <CompWithSWR />
          <p>Props - {this.props.dataWithProps} </p>
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

ApiTest.getInitialProps = async function() {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();
  console.log(data.name);
  // You see the logs not in the browser but in the logs
  return {
    dataWithProps: data.name
  };
};

export default ApiTest;
