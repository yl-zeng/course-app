import * as redux from 'redux';
import thunk from "redux-thunk";
import { routerMiddleware, push,syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {coursesReducer,emailReducer} from "reducers";

import browserHistory from "app/history/history.jsx";


var initialState = {};

var reducer = redux.combineReducers({
  courses: coursesReducer,
  emails: emailReducer,
  routing: routerReducer
});

const middleware = routerMiddleware(browserHistory);

var store = redux.createStore(reducer,initialState,redux.compose(
  redux.applyMiddleware(thunk,middleware),
  window.devToolsExtension? window.devToolsExtension(): f=>f
));

//export const history = syncHistoryWithStore(browserHistory, store);

export default store;
