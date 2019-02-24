import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';

import LoginForm from './LoginForm'

class Login extends Component {
  componentDidMount() {
    this.props.dispatch({type: "AUTH_MENU", payload: "home"})
  }
  render() {
    return (
      <main>
        <div className="navbar-space"></div>
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-sm-6" />
              <div className="col-sm-6">
                <LoginForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
