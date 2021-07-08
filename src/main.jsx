import { authExchange } from '@urql/exchange-auth';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createClient, dedupExchange, cacheExchange, fetchExchange, Provider } from 'urql';
import Cookies from 'js-cookie';
import { getAuth } from './Middleware/Auth';
import App from './App'

const client = createClient({
  url: 'http://localhost:4000',
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      addAuthToOperation: ({ authState, operation, }) => {
        console.log(authState)
        if (!authState || !authState.token) {
          return operation;
        }
        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return {
          ...operation,
          context: {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                "Authorization": authState.token,
              },
            },
          },
        };
      },
      willAuthError: ({ authState }) => {
        if (!authState) return true;
        // e.g. check for expiration, existence of auth etc
        return false;
      },
      didAuthError: ({ error }) => {
        // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'FORBIDDEN',
        );
      },
      getAuth: async ({ authState, mutate }) => {
        // console.log(authState)
        if (!authState) {
          const token = Cookies.get('accessToken');
          const refreshToken = Cookies.get('refreshToken');
          if (token && refreshToken) {
            return { token, refreshToken };
          }
          return null;
        }

        const refreshMutation = `
        mutation getRefreshTokens($token: String){
          refreshTokens(token: $token){
            accessToken
            refreshToken
          }
        }
        `
        const result = await mutate(refreshMutation, {
          token: authState.token,
        });

        // console.log(result)
        // Cookies.remove('accessToken');
        // Cookies.remove('refreshToken');
        return null;
      },
    }),
    fetchExchange,
  ],
  // fetchOptions: () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   if (accessToken && refreshToken) {
  //     return {
  //       headers: {
  //         accessToken,
  //         refreshToken,
  //       }
  //     }
  //   } else {
  //     return {}
  //   }
  // }
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
