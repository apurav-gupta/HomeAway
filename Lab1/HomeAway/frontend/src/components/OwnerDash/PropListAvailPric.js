import React, { Component } from "react";
import axios from "axios";

class PropListAvailPric extends Component {
  constructor() {
    super();
    this.handleArriveDateChange = this.handleArriveDateChange.bind(this);
    this.handleDepartDateChange = this.handleDepartDateChange.bind(this);
    this.handleCurrTypeChange = this.handleCurrTypeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      arrivedate: "",
      departdate: "",
      currtype: "",
      price: ""
    };
  }

  submitHandler = e => {
    e.preventDefault();
    const data = {
      arrivedatee: this.state.arrivedate,
      departdatee: this.state.departdate,
      currtypee: this.state.currtype,
      pricee: this.state.price
    };
    this.props.handleChildDataPrice(data);
    this.setState({
      arrivedate: "",
      departdate: "",
      currtype: "",
      price: ""
    });
  };

  handleArriveDateChange = e => {
    this.setState({
      arrivedate: e.target.value
    });
  };

  handleDepartDateChange = e => {
    this.setState({
      departdate: e.target.value
    });
  };

  handleCurrTypeChange = e => {
    this.setState({
      currtype: e.target.value
    });
  };

  handlePriceChange = e => {
    this.setState({
      price: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div class="col-md-10 content-panel-container">
          <div class="panel panel-default">
            <div class="panel-body">
              <div>
                <div class="checklist-header-container ">
                  <h3>
                    <span style={{ fontSize: "30px" }}>
                      <b> Availability </b>
                    </span>
                  </h3>
                  <hr />
                </div>
              </div>
              <div class="col-md-9">
                <div class="input-daterange" data-date-format="M d, D">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group form-group-lg form-group-icon-left">
                        <label>Check-in</label>
                        <input
                          class="form-control"
                          name="arrivedate"
                          value={this.state.arrivedate}
                          onChange={this.handleArriveDateChange}
                          type="date"
                          min="2018-09-28"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group form-group-lg form-group-icon-left">
                        <label>Check-out</label>
                        <input
                          class="form-control"
                          name="departdate"
                          value={this.state.departdate}
                          onChange={this.handleDepartDateChange}
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <hr />
              <div>
                <div class="checklist-header-container ">
                  <h3>
                    <span style={{ fontSize: "30px" }}>
                      <b> How much do you want to charge ? </b>
                    </span>
                  </h3>
                  <hr />
                </div>
                <div class="col-md-8">
                  <div class="form-group form-group-lg form-group-select-plus">
                    <label>Currency</label>
                    <br />
                    <select
                      name="currtype"
                      class="form-control"
                      value={this.state.currtype}
                      onChange={this.handleCurrTypeChange}
                    >
                      <option value="" active>
                        Choose a Currency Type
                      </option>
                      <option value="USD ($)">US Dollar (USD) </option>
                      <option value="AUD (A$)">Australian Dollar (AUD)</option>
                      <option value="EUR (€)">Euros (EUR)</option>
                      <option value="GBP (£)">Great British Poud (GBP)</option>
                      <option value="CAD (C$)">Canadian Dollar (CAD)</option>
                    </select>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <hr />

                <div class="form-group form-group-lg form-group-icon-left">
                  <div class="col-md-6">
                    <label>Nightly Base Rate</label>

                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-dollar" />
                      </div>
                      <input
                        class="form-control"
                        name="price"
                        value={this.state.price}
                        onChange={this.handlePriceChange}
                        type="text"
                        required=""
                      />
                    </div>
                    <br />
                    <div class="form-group">
                      <label class="col-md-4 control-label" />
                      <div class="col-md-4">
                        <button
                          type="submit"
                          class="btn btn-success"
                          value="Save"
                          onClick={this.submitHandler}
                        >
                          <span class="glyphicon glyphicon-thumbs-up" /> Save
                          Changes
                        </button>
                      </div>
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
}

export default PropListAvailPric;
