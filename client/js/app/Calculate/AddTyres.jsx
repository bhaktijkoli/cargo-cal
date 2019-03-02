import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import {If} from 'react-if'

let colors = [
  '#2ecc71',
  '#3498db',
  '#e67e22',
  '#e74c3c',
  '#8e44ad',
  '#1abc9c',
]

class AddTyres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: -1,
      tyres: [],
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onModelChange = this.onModelChange.bind(this)
    this.onAddTyre = this.onAddTyre.bind(this)
    this.onRemoveTyre = this.onRemoveTyre.bind(this)
  }
  render() {
    let models = this.props.data.tyres;
    let modelOptions = models.map((el, key)=> {
      return <option key={key} value={key}>{el.model.toUpperCase()}</option>
    })
    var tyreItems = this.state.tyres.map((el, key) => {
      return(
        <tr key={key}>
          <td>{el.model.toUpperCase()}</td>
          <td><input id={"number"+key} type="number" className="form-control" defaultValue={el.number}/></td>
          <td><button className="btn btn-sm btn-danger" style={{marginTop:8}} onClick={e=>this.onRemoveTyre(key)}><i className="fa fa-trash-o" aria-hidden="true"></i></button> </td>
        </tr>
      )
    })
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card animated fadeInUp">
            <div className="card-body">
              <h2 className="card-title">Add Tyres</h2>
              <h6 className="card-subtitle mb-2 text-muted">Add tyres to be placed inside the container.</h6>
              <div className="row" style={{marginTop:20}}>
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-12">
                      <If condition={this.state.tyres.length != 0}>
                        <table className="table table-striped table-bordered table-hover">
                          <thead>
                            <tr>
                              <th width="20%">Model</th>
                              <th width="10%">Quantity</th>
                              <th width="10%"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {tyreItems}
                          </tbody>
                        </table>
                      </If>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="model">Tyre Model:</label>
                        <select id="model" className="form-control" onChange={this.onModelChange}>
                          <option value="-1">None</option>
                          {modelOptions}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="model">Quantity:</label>
                        <input id="quantity" className="form-control" defaultValue="100" type="number" min="0"/>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <button className="btn btn-default" onClick={this.onAddTyre} style={{marginTop:32}} disabled={this.state.model==-1}><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;Add </button>
                    </div>
                    <div className="col-sm-6">
                      <button className="btn btn-primary btn-wide" onClick={this.onFormSubmit} style={{marginTop:32}} disabled={this.state.tyres.length == 0}>Next</button>
                    </div>
                  </div>
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
    var tyres = this.state.tyres;
    for(var i=0; i<tyres.length;i++) {
      tyres[i].number = $('#number'+i).val();
      tyres[i].color = colors[i]
    }
    data.tyres = tyres;
    this.props.update(data);
  }
  onModelChange(e) {
    var val = e.target.value;
    this.setState({model: val})
  }
  onAddTyre() {
    var tyres = this.state.tyres;
    var tyre = this.props.data.tyres[this.state.model];
    tyre.number = $('#quantity').val();
    $("#quantity").val(100);
    tyres.push(tyre);
    this.setState({tyres});
  }
  onRemoveTyre(key) {
    var tyres = this.state.tyres;
    tyres.splice(key, 1);
    this.setState({tyres});
  }
}

export default AddTyres;
