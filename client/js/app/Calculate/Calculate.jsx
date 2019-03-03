import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import {If} from 'react-if'

import ContainerSize from './ContainerSize'
import AddTyres from './AddTyres'
import Result from './Result'

class Calculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      container: null,
      tyres: [],
    }
    this.onCallUpdate = this.onCallUpdate.bind(this)
  }
  componentDidMount() {
    this.props.dispatch({type: "AUTH_MENU", payload: "calculate"})
    this.setState({
      container: {
        height: 2286,
        length: 5181.6,
        model: "FTL",
        type: "FTL",
        weight: 7,
        width: 2286,
      },
      tyres: [
        {
          aspect_ratio: 55,
          color: "#2ecc71",
          diameter: 620.9,
          height: 620.9,
          model: "psr0d604",
          normal: true,
          number: "100",
          remaing: "100",
          rim_diameter: 16,
          volume: 59013,
          weight: 9.6,
          width: 195,
        },
        {
          angle: 22,
          aspect_ratio: 65,
          color: "#3498db",
          diameter: 570.0999999999999,
          height: 570.0997,
          model: "psr0d622",
          normal: false,
          number: "100",
          remaing: "100",
          rim_diameter: 14,
          volume: 42097.4,
          weight: 7.3,
          width: 165,
        }
      ],
    });
    setTimeout(function () {
      this.setState({stage:2});
    }.bind(this), 1000);
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
            <If condition={this.state.stage==2}>
              <Result payload={this.state} data={this.props.data} />
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
