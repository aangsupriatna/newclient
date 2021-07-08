import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createClient, dedupExchange, cacheExchange, fetchExchange, Provider } from 'urql';
import App from './App'

const client = createClient({
  url: 'http://localhost:4000',
  exchanges: [
    dedupExchange,
    cacheExchange,
    fetchExchange,
  ],
  fetchOptions: () => {
    const accestoken = localStorage.getItem("x-access-token");
    const refreshtoken = localStorage.getItem("x-refresh-token");
    return accestoken
      ? {
        headers: {
          accestoken,
          refreshtoken,
        }
      }
      : {};
  },
});

ReactDOM.render(
  <React.Suspense>
    <Provider value={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Suspense>,
  document.getElementById('root')
);
