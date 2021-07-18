import { authExchange } from '@urql/exchange-auth';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createClient, dedupExchange, fetchExchange, errorExchange, Provider, gql } from 'urql';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { cacheExchange } from '@urql/exchange-graphcache';
import { addAuthToOperation, getAuth, didAuthError, willAuthError } from './Middleware/Auth'
import App from './App'
import { cache } from './Middleware/Cache';

const client = createClient({
  url: 'http://localhost:4000',
  exchanges: [
    dedupExchange,
    cache,
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
    multipartFetchExchange,
  ],
  requestPolicy: 'cache-first',
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
