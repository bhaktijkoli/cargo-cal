import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import { If } from 'react-if'

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [],
    }
  }
  componentDidMount() {
    let payload = this.props.payload;
    let tyres = payload.tyres;
    tyres.forEach(el => {
      el.diameter = (el.width * (el.aspect_ratio/100)*2) + (el.rim_diameter * 25.4);
      el.weight = el.weight;
      el.remaing = el.number;
    })
    var result = startCalculate(payload.container, tyres);
    console.log(result);
    this.setState({
      layers: result.layers,
    })
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
                <table id="table-result" className="table table-responsive table-bordered">
                  {this.printLayers()}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  printLayers() {
    return this.state.layers.map((layer, key)=> {
      return(
        <tr>
          <tr key={key}>
            <td className="layer-header" colspan={this.getMaxTyres(layer)}>{"Layer " + (key+1)}</td>
          </tr>
          {this.printLayer(layer.reverse())}
        </tr>
      )
    })
  }
  printLayer(layer) {
    return layer.map((row, key) => {
      return(
        <tr key={key}>
          {this.printRow(row)}
        </tr>
      )
    });
  }
  printRow(row) {
    return row.map((tyre, key) => {
      return(
        <td key={key} style={{background:tyre.color}}>{tyre.model.toUpperCase()}</td>
      )
    })
  }
  getMaxTyres(layer) {
    var len = 0;
    layer.forEach(row => {
      if(row.length > len) {
        len = row.length;
      }
    });
    return len;
  }
}

export default Result;
