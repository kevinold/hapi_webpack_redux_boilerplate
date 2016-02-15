import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import app from './app';
import dashboard from './dashboard';

export default combineReducers({
  app: app,
  dashboard: dashboard,
  routing: routeReducer
});
