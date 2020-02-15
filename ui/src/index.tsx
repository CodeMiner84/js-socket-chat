import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import SocketService, { ChatContext } from './utils/SocketService';

ReactDOM.render(
  <ChatContext.Provider value={new SocketService()}>
    <Router history={createHistory()}>
      <Route to="/" component={App} />
    </Router>
  </ChatContext.Provider>,
  document.getElementById('root')
);
