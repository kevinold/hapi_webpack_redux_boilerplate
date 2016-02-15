import React from 'react';
import ReactDOM from 'react-dom';
import { syncReduxAndRouter } from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './store/configureStore';
import App from './containers/App';

const history = createBrowserHistory();
const store = configureStore();

syncReduxAndRouter(history, store);

ReactDOM.render(<App store={store} history={history} />, document.getElementById('main'));
