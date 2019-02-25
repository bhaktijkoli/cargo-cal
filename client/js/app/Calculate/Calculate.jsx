import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import {If} from 'react-if'

import ContainerSize from './ContainerSize'
import AddTyres from './AddTyres'

class Calculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
    }
    this.onCallUpdate = this.onCallUpdate.bind(this)
  }
  componentDidMount() {
    this.props.dispatch({type: "AUTH_MENU", payload: "calculate"})
  }
  render() {
    return (
      <main>
        <div className="navbar-space"></div>
        <section id="calculate">
          <div className="container">
            <If condition={this.state.stage==0}>
              <ContainerSize payload={this.state} data={this.props.data} update={this.onCallUpdate}/>
            </If>
            <If condition={this.state.stage==1}>
              <AddTyres payload={this.state} data={this.props.data} update={this.onCallUpdate}/>
            </If>
          </div>
        </section>
      </main>
    );
  }
  onCallUpdate(data) {
    this.setState(data)
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    data: state.data,
  };
}

export default withRouter(connect(mapStateToProps)(Calculate));
