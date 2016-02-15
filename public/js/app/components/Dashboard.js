import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Dashboard extends Component {

  render() {
    const {project, dispatch} = this.props;
    return (
      <div>
        Hello world
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing,
    dashboard: state.dashboard,
    app: state.app
  }
}

export default connect(mapStateToProps)(Dashboard);
