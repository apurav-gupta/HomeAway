import React, { Component } from "react";
import axios from "axios";

class PropListDetail extends Component {
  constructor() {
    super();
    this.handleHeadChange = this.handleHeadChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handlePropTypeChange = this.handlePropTypeChange.bind(this);
    this.handleBedChange = this.handleBedChange.bind(this);
    this.handleAccomChange = this.handleAccomChange.bind(this);
    this.handleBathChange = this.handleBathChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      headline: "",
      about: "",
      proptype: "",
      bed: "",
      accomodate: "",
      bath: ""
    };
  }

  submitHandler = e => {
    e.preventDefault();
    const data = {
      headll: this.state.headline,
      aboutt: this.state.about,
      proptypee: this.state.proptype,
      bedd: this.state.bed,
      accomodatee: this.state.accomodate,
      batht: this.state.bath
    };
    this.props.handlerParentfordesc(data);
    this.setState({
      headline: "",
      about: "",
      proptype: "",
      bed: "",
      accomodate: "",
      bath: ""
    });
  };

  handleHeadChange = e => {
    this.setState({
      headline: e.target.value
    });
  };

  handleDescChange = e => {
    this.setState({
      about: e.target.value
    });
  };

  handlePropTypeChange = e => {
    this.setState({
      proptype: e.target.value
    });
  };

  handleBedChange = e => {
    this.setState({
      bed: e.target.value
    });
  };

  handleAccomChange = e => {
    this.setState({
      accomodate: e.target.value
    });
  };
  handleBathChange = e => {
    this.setState({
      bath: e.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <div class="col-md-9 content-panel-container">
          <div class="panel panel-default">
            <div class="panel-body">
              <div>
                <div class="checklist-header-container ">
                  <h3>
                    <span>
                      <b>Describe your property</b>
                    </span>
                  </h3>
                  <hr />
                </div>
                <div>
                  <div />
                  <div>
                    <span style={{ fontSize: "15px" }}>
                      Start out with a descriptive headline and a detailed
                      summary of your property.
                    </span>
                  </div>
                  <hr />
                </div>
                <div class="row headline-container">
                  <div class="col-xs-10">
                    <div class="form-group floating-label">
                      <input
                        class="form-control"
                        id="headline"
                        name="headline"
                        value={this.state.headline}
                        onChange={this.handleHeadChange}
                        type="text"
                        placeholder="Headline"
                        style={{ fontSize: "20px" }}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="form-group floating-label">
                      <textarea
                        class=" form-control"
                        id="about"
                        value={this.state.about}
                        onChange={this.handleDescChange}
                        name="about"
                        rows="8"
                        style={{ fontSize: "20px" }}
                        placeholder="Property Description"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group form-group-lg form-group-select-plus">
                      <select
                        name="proptype"
                        class="form-control"
                        onChange={this.handlePropTypeChange}
                        value={this.state.proptype}
                      >
                        <option value="" active>
                          Choose a Property Type
                        </option>
                        <option value="Apartment">Apartment</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Chateau / Country House">
                          Chateau / Country House
                        </option>
                        <option value="Condo">Condo</option>
                        <option value="Corporate Apartment">
                          Corporate Apartment
                        </option>
                        <option value="Cottage">Cottage</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Hotel Suites">Hotel Suites</option>
                        <option value="House">House</option>
                        <option value="Lodge">Lodge</option>
                        <option value="Mill">Mill</option>
                        <option value="Resort">Resort</option>
                        <option value="Sudio">Studio</option>
                        <option value="Villa">Villa</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group form-group-lg form-group-icon-left">
                      <input
                        class="form-control"
                        aria-label="bed"
                        onChange={this.handleBedChange}
                        value={this.state.bed}
                        aria-invalid="false"
                        id="bed"
                        name="bed"
                        placeholder="Number of Bedrooms"
                        type="number"
                        step="1"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group form-group-lg form-group-icon-left">
                      <input
                        class="form-control"
                        aria-label="accomodate"
                        placeholder="Number of Accomodates"
                        value={this.state.accomodate}
                        onChange={this.handleAccomChange}
                        aria-invalid="false"
                        id="accomodate"
                        name="accomodate"
                        type="number"
                        max="500"
                        min="1"
                        step="1"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group form-group-lg form-group-icon-left">
                      <input
                        class="form-control"
                        aria-label="bath"
                        aria-invalid="false"
                        value={this.state.bath}
                        onChange={this.handleBathChange}
                        id="bath"
                        name="bath"
                        placeholder="Number of Bathrooms"
                        type="number"
                        max="500"
                        min="1"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
                <hr />

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
    );
  }
}

export default PropListDetail;
