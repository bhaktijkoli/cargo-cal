import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  render() {
    return (
      <div className="card animated fadeInUp">
        <div className="card-body">
          <h2 className="card-title">Lorem ipsum dolor sit amet</h2>
          <h6 className="card-subtitle mb-2 text-muted">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h6>
          <div className="row" style={{marginTop:20}}>
            <div className="col-sm-12">
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="lenght" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control" id="width" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
