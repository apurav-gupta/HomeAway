import React, { Component } from "react";
import PropTypes from "prop-types";
import PropertyListLocation from "./PropertyListLocation";
import PropertyListDetails from "./PropertyListDetails";
import PropertyListPhotos from "./PropertyListPhotos";
import PropertyListPriceAvail from "./PropertyListPriceAvail";
import Dashboard from "../Dashboard";

class PropertyListRedux extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        <Dashboard />
        <div class="content-panel-container">
          <div class="panel panel-default">
            <div className="row">
              <div className="col-sm-3">
                <ul className="nav nav-navs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      href="#location"
                      style={{ fontSize: "25px" }}
                    >
                      <i class="fa fa-home" />
                      {"   "}
                      Property Location
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      href="#details"
                      style={{ fontSize: "25px" }}
                    >
                      <i class="fa fa-info-circle" />
                      {"   "} Property details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      href="#photos"
                      style={{ fontSize: "25px" }}
                    >
                      <i class="fa fa-photo" />
                      {"   "} Property photos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      href="#pricing"
                      style={{ fontSize: "25px" }}
                    >
                      <i class="fa fa-dollar" />
                      {"   "} Property pricing
                    </a>
                  </li>
                </ul>
              </div>

              <vr />
              <div className="col-sm-9">
                <div className="tab-content">
                  <div
                    className="tab-pane fade in active"
                    id="location"
                    role="tabpanel"
                  >
                    {page === 1 && (
                      <PropertyListLocation onSubmit={this.nextPage} />
                    )}
                  </div>
                  <div className="tab-pane fade" id="details" role="tabpanel">
                    {page === 2 && (
                      <PropertyListDetails
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                      />
                    )}
                  </div>
                  <div className="tab-pane fade" id="photos" role="tabpanel">
                    {page === 3 && (
                      <PropertyListPhotos
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                      />
                    )}
                  </div>
                  <div className="tab-pane fade" id="pricing" role="tabpanel">
                    {page === 4 && (
                      <PropertyListPriceAvail
                        previousPage={this.previousPage}
                        onSubmit={onSubmit}
                      />
                    )}
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

PropertyListRedux.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default PropertyListRedux;
