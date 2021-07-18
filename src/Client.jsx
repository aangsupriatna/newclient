import React from 'react';
import { authExchange } from '@urql/exchange-auth';
import { createClient, dedupExchange, errorExchange } from 'urql';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { addAuthToOperation, getAuth, didAuthError, willAuthError } from './Middleware/Auth'
import { cache } from './Middleware/Cache';

export const client = createClient({
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