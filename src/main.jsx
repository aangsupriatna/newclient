import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'urql';
import App from './App'
import { client } from './Client';

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
