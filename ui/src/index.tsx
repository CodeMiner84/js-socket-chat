import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from './App';

ReactDOM.render(
  <Router history={createHistory()}>
    <Route to="/" component={App} />
  </Router>,
  document.getElementById('root')
);
