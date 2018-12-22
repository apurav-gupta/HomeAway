import React, { Component } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import PropListLoc from "./PropListLoc";
import PropListDetail from "./PropListDetail";
//import PropListPhoto from "./PropListPhoto";
import PropListAvailPric from "./PropListAvailPric";
import PropListPhoto from "./PropListPhoto";

class PropertyList extends Component {
  locChild = "";
  headChild = "";
  descChild = "";
  proptypChild = "";
  bedChild = "";
  accomChild = "";
  bathChild = "";
  arrivedateChild = "";
  departdateChild = "";
  currtypeChild = "";
  priceChild = "";

  constructor() {
    super();
    this.handleChildDataLoc = this.handleChildDataLoc.bind(this);
    this.handleChildDataDesc = this.handleChildDataDesc.bind(this);
    //this.handleChildDataPhoto = this.handleChildDataPhoto.bind(this);
    this.handleChildDataPrice = this.handleChildDataPrice.bind(this);
  }

  handleChildDataLoc(data) {
    this.locChild = data;
  }

  handleChildDataDesc(data) {
    this.headChild = data.headll;
    this.descChild = data.aboutt;
    this.proptypChild = data.proptypee;
    this.bedChild = data.bedd;
    this.accomChild = data.accomodatee;
    this.bathChild = data.batht;
  }

  // handleChildDataPhoto(data) {
  //   this.setState({
  //     propLocFromChild: data
  //   });
  // }

  handleChildDataPrice(data) {
    this.arrivedateChild = data.arrivedatee;
    this.departdateChild = data.departdatee;
    this.currtypeChild = data.currtypee;
    this.priceChild = data.pricee;
  }

  submitProperty = e => {
    var headers = new Headers();
    e.preventDefault();
    console.log(this.locChild);
    console.log(this.headChild);
    console.log(this.descChild);
    console.log(this.proptypChild);
    console.log(this.bedChild);
    console.log(this.accomChild);
    console.log(this.bathChild);
    console.log(this.departdateChild);
    console.log(this.currtypeChild);
    console.log(this.priceChild);

    var data = {
      ownermail: sessionStorage.getItem("ownmail"),
      location: this.locChild,
      headline: this.headChild,
      about: this.descChild,
      propertytype: this.proptypChild,
      beds: this.bedChild,
      accomodates: this.accomChild,
      baths: this.bathChild,
      arrivedate: this.arrivedateChild,
      departdate: this.departdateChild,
      currtype: this.currtypeChild,
      price: this.priceChild
    };
    axios.defaults.withCredentials = true;
    console.log(data);
    axios.post("http://localhost:3001/PropertyList", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          ...this.state,
          authFlag: true
        });
      } else {
        this.setState({
          ...this.state,
          authFlag: false
        });
      }
    });
  };

  render() {
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
                  <li>
                    <button
                      type="submit"
                      class="btn btn-success"
                      value="Save"
                      onClick={this.submitProperty}
                    >
                      <span class="glyphicon glyphicon-thumbs-up" /> Add a
                      Property
                    </button>
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
                    <PropListLoc
                      handlerParentforloc={this.handleChildDataLoc}
                    />
                  </div>
                  <div className="tab-pane fade" id="details" role="tabpanel">
                    <PropListDetail
                      handlerParentfordesc={this.handleChildDataDesc}
                    />
                  </div>
                  <div className="tab-pane fade" id="photos" role="tabpanel">
                    <PropListPhoto />
                  </div>
                  <div className="tab-pane fade" id="pricing" role="tabpanel">
                    <PropListAvailPric
                      handleChildDataPrice={this.handleChildDataPrice}
                    />
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

export default PropertyList;
