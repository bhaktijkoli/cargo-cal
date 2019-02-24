import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from './Layout/Navbar.jsx';
import Home from './Home/Home.jsx';
import Calculate from './Calculate/Calculate.jsx';
import Login from './Login/Login.jsx';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged( (user) => {
      this.props.dispatch({type: "AUTH_SET_USER", payload: user})
    });
  }
  render() {
    return (
      <div id="wrapper">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/calculate" component={Calculate}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}


export default withRouter(connect(mapStateToProps)(App));
