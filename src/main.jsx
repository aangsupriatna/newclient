import { authExchange } from '@urql/exchange-auth';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createClient, dedupExchange, cacheExchange, fetchExchange, Provider } from 'urql';
import { addAuthToOperation, getAuth, didAuthError, willAuthError } from './Middleware/Auth'
import Cookies from 'js-cookie';
import App from './App'

const client = createClient({
  url: 'http://localhost:4000',
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      addAuthToOperation,
      getAuth,
      didAuthError,
      willAuthError,
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
