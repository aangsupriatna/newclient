import { authExchange } from '@urql/exchange-auth';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createClient, dedupExchange, cacheExchange, fetchExchange, errorExchange, Provider, gql } from 'urql';
import { addAuthToOperation, getAuth, didAuthError, willAuthError } from './Middleware/Auth'
import App from './App'

const client = createClient({
  url: 'http://localhost:4000',
  exchanges: [
    dedupExchange,
    cacheExchange,
    errorExchange({
      onError: (error) => {
        const isAuthError = error.graphQLErrors.some(
          e => e.extensions?.code === 'FORBIDDEN',
        );

        if (isAuthError) {
          // clear storage, log the user out etc
        }
      }
    }),
    authExchange({
      addAuthToOperation,
      getAuth,
      didAuthError,
      willAuthError,
    }),
    fetchExchange,
  ],
});

ReactDOM.render(
  <React.Suspense>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.Suspense>,
  document.getElementById('root')
);
