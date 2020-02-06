import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Route to="/" component={App} />
  </Router>,
  document.getElementById('root')
);
