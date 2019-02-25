import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav id="navbar-main" className="navbar navbar-expand-lg navbar-dark bg-primary navbar-fixed navbar-transparent">
        <div className="container">
          <Link className="navbar-brand" to="/">Load Calculator</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-primary">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="index.html">
                    <img src="assets/img/brand/blue.png" />
                    </a>
                  </div>
                  <div className="col-6 collapse-close">
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="navbar-nav ml-lg-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    componentDidMount() {

    }
  }

  export default Navbar;
