import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from './Layout/Navbar.jsx';
import Home from './Home/Home.jsx';
import Calculate from './Calculate/Calculate.jsx';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/calculate" component={Calculate}/>
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
