import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch({type: "AUTH_MENU", payload: "home"})
    this.windowScrollEvent();
    $(window).scroll(this.windowScrollEvent);
  }
  componentWillUnmount() {
    $('#navbar-main').removeClass('navbar-transparent');
    $('#navbar-main').addClass('bg-white');
    $(window).unbind('scroll');
  }
  render() {
    return (
      <main>
        <section id="welcome">
          <div className="overlay"></div>
          <div className="row">
            <div className="container">
              <div className="col-sm-12">
                <div className="animated fadeInDown">
                  <h1>Calculate your load sequence within clicks</h1>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="animated fadeInDown">
                  <p>CargoCal Load Calculator simulates placing tyres inside a container and determines their optional positioning within in quick, simple and effective way.</p>
                </div>
              </div>
              <div className="col-sm-6">
                <Link to="/calculate" className="btn btn-primary animated fadeInUp">Calculate</Link>
              </div>
            </div>
          </div>
        </section>
        <section style={{height:1000}}>
        </section>
      </main>
    );
  }
  windowScrollEvent() {
    if($(this).scrollTop()>=100){
      $('#navbar-main').removeClass('navbar-transparent');
      $('#navbar-main').addClass('bg-white');
    } else {
      $('#navbar-main').addClass('navbar-transparent');
      $('#navbar-main').removeClass('bg-white');
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(connect(mapStateToProps)(Home));
