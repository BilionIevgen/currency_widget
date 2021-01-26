import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import ErrorBoundary from './components/errors/ErrorBoundary';
import { store } from './store';
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
