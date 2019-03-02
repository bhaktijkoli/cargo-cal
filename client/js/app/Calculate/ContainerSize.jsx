import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import { If } from 'react-if'

class ContainerSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: -1,
      length: 0,
      width: 0,
      height: 0,
    }
    this.onModelChange = this.onModelChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  render() {
    let data = this.props.data;
    let modelOptions = data.trucks.map((el, key) => {
      return <option key={key} value={key}>{el.model}</option>
    })
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card animated fadeInUp">
            <div className="card-body">
              <h2 className="card-title">Select your Truck Model</h2>
              <h6 className="card-subtitle mb-2 text-muted">CargoCal will arrange the tyres according to the dimensions of your selected truck model.</h6>
              <div className="row" style={{marginTop:20}}>
                <div className="col-sm-6 order-sm-6">
                  <div className="text-center">
                    <img src="/img/truck.png"/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="model">Truck Model:</label>
                      <select id="model" className="form-control" onChange={this.onModelChange}>
                        <option value="-1">None</option>
                        {modelOptions}
                      </select>
                    </div>
                    <If condition={this.state.model!=-1}>
                      <div>
                        <div className="form-group">
                          <label htmlFor="length">Lenght (mm):</label>
                          <input type="text" className="form-control" name="length" id="length" placeholder="Enter Lenght" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="width">Width (mm):</label>
                          <input type="text" className="form-control" id="width" placeholder="Enter Width" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="height">Height (mm):</label>
                          <input type="text" className="form-control" id="height" placeholder="Enter Height" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="weight">Weight (kg):</label>
                          <input type="text" className="form-control" id="weight" placeholder="Enter Weight" />
                        </div>
                      </div>
                    </If>
                    <button type="submit" className="btn btn-primary" disabled={this.state.model==-1}>Next</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onModelChange(e) {
    var val = e.target.value;
    this.setState({model: val});
    let truck = this.props.data.trucks[val];
    if(truck) {
      setTimeout(function () {
        $('#length').val(truck.length)
        $('#width').val(truck.width)
        $('#height').val(truck.height)
        $('#weight').val(truck.weight)
      }, 10);
    }
  }
  onFormSubmit() {
    var payload = this.props.payload;
    payload.stage = 1;
    payload.container = this.props.data.trucks[this.state.model];
    this.props.update(payload);
  }
}

export default ContainerSize;
