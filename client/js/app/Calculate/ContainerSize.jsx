import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';

class ContainerSize extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card animated fadeInUp">
            <div className="card-body">
              <h2 className="card-title">Lorem ipsum dolor sit amet</h2>
              <h6 className="card-subtitle mb-2 text-muted">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h6>
              <div className="row" style={{marginTop:20}}>
                <div className="col-sm-6 order-sm-6">
                  <div className="text-center">
                    <img src="/img/truck.png"/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Lenght (mm):</label>
                      <input type="number" className="form-control" id="lenght" placeholder="Enter Lenght" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Width (mm):</label>
                      <input type="number" className="form-control" id="width" placeholder="Enter Width" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Height (mm):</label>
                      <input type="number" className="form-control" id="height" placeholder="Enter Height" />
                    </div>
                    <button type="submit" className="btn btn-primary">Next</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onFormSubmit() {
    var data = this.props.data;
    data.stage = 1;
    this.props.update(data);
  }
}

export default ContainerSize;
