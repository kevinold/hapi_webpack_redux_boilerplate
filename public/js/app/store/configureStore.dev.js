import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

let createStoreWithMiddleware;

createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
   const store = createStoreWithMiddleware(rootReducer, initialState);

   if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
