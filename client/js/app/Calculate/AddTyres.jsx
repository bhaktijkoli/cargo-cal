import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';

class AddTyres extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  render() {
    let data = ['Tyre 1', 'Tyre 2', 'Tyre 3'];
    var dtaItems = data.map((el, key) => {
      return(
        <tr key={key}>
          <td>{el}</td>
          <td><input id={"number"+key} type="number" value="0"/></td>
          <td><input id={"lenght"+key} type="number" value="0"/></td>
          <td><input id={"width"+key} type="number" value="0"/></td>
          <td><input id={"height"+key} type="number" value="0"/></td>
        </tr>
      )
    })
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card animated fadeInUp">
            <div className="card-body">
              <h2 className="card-title">Lorem ipsum dolor sit amet</h2>
              <h6 className="card-subtitle mb-2 text-muted">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h6>
              <div className="row" style={{marginTop:20}}>
                <div className="col-sm-12">
                  <form onSubmit={this.onFormSubmit}>
                    <table className="table table-striped table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Model</th>
                          <th>Number</th>
                          <th>Lenght (mm)</th>
                          <th>Width (mm)</th>
                          <th>Height (mm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dtaItems}
                      </tbody>
                    </table>
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
    data.stage = 2;
    this.props.update(data);
  }
}

export default AddTyres;
