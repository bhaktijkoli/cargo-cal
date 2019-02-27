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
    $('#navbar-main').addClass('bg-primary');
    $(window).unbind('scroll');
  }
  render() {
    return (
      <main>
        <section id="welcome">
          <div className="overlay"></div>
          <div className="row">
            <div className="container">
              <div className="col-sm-6">
                <div className="animated fadeInDown">
                  <h1>Lorem ipsum dolor sit</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
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
      $('#navbar-main').addClass('bg-primary');
    } else {
      $('#navbar-main').addClass('navbar-transparent');
      $('#navbar-main').removeClass('bg-primary');
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(connect(mapStateToProps)(Home));
