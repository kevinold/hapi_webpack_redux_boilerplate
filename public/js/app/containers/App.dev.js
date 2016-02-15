import React from 'react';
import { Provider } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { Router, Route, IndexRoute } from 'react-router';
import DevTools from './DevTools';

export default React.createClass({
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <div className="fill-height">
          <Router history={history}>
            <Route path="/" component={Dashboard} />
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
});
