import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Home from './Home/Home.jsx';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    );
  }
  componentDidMount() {

  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}


export default withRouter(connect(mapStateToProps)(App));
