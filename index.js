import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from 'component/App';
import DashBoardPage from './page/DashBoard';

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as reducers from './reducer';

// import rootEpic from './epic';
// const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware /* epicMiddleware*/)
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute path="" component={DashBoardPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
