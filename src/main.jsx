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
    const token = localStorage.getItem("token");
    return token
      ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      : {};
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
