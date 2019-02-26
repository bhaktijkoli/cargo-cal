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
      this.getData();
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
  getData() {
    var db = firebase.firestore();
    db.collection("trucks").get()
    .then(snapshot => {
      var trucks = [];
      snapshot.docs.forEach(el => {
        trucks.push(el.data());
      });
      this.props.dispatch({type: "SET_TRUCKS", payload: trucks});
    });
    db.collection("tyres").get()
    .then(snapshot => {
      var tyres = [];
      snapshot.docs.forEach(el => {
        tyres.push(el.data());
      });
      this.props.dispatch({type: "SET_TYRES", payload: tyres});
    });
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}


export default withRouter(connect(mapStateToProps)(App));
