import React, { Component } from "react";
//import SearchCardList from "./SearchCardList";
import LoginNavbarCust from "../Navigation/LoginNavbarCust";
import axios from "axios";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

// REDUX functionality
import { connect } from "react-redux";
import {
  propertyDetailsByID,
  bookProperty
} from "../../actions/propertysearchAction";
import { getPhoto } from "../../actions/photosAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { sendMessage } from "../../actions/messageAction";

class PropertyDetails extends Component {
  photoID = [];
  location = "";
  headline = "";
  about = "";
  propertytype = "";
  beds = "";
  baths = "";
  accomodates = "";
  photos = [];
  arrivedate = "";
  departdate = "";

  price = "";
  customermail = "";
  isBooked = "";
  propID = 0;
  imageBase = [];

  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      message: "",
      propDetails: [],
      imagePushed: false
    };

    this.getPhoto = false;
    this.changeMessage = this.changeMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.property_details);
    if (nextProps.property_details != null && this.getPhoto === true) {
      console.log("Inside if");
      let imagePreview = "data:image/jpg;base64, " + nextProps.photos.photo;
      this.imageBase.push(imagePreview);
      this.setState({
        imagePushed: true
      });
    } else if (nextProps.property_details != null && this.getPhoto === false) {
      console.log("Inside else if");
      this.property_details = nextProps.property_details;
      console.log(this.property_details);
      if (this.property_details) {
        this.location = this.property_details.location;
        console.log(this.location);
        this.headline = this.property_details.headline;
        this.about = this.property_details.about;
        this.propertytype = this.property_details.propertytype;
        this.beds = this.property_details.beds;
        this.baths = this.property_details.baths;
        this.accomodates = this.property_details.accomodates;
        this.photoID = JSON.parse(this.property_details.photos);
        console.log(this.photoID);
        // this.photos = this.photoID;
        this.arrivedate = this.property_details.arrivedate;
        this.departdate = this.property_details.departdate;
        this.price = this.property_details.price;
        this.customermail = this.property_details.customermail;
        this.isBooked = this.property_details.isBooked;

        for (let i = 0; i < this.photoID.length; i++) {
          console.log(this.photoID[i]);
          this.handleGetPhoto(this.photoID[i]);
        }

        this.setState({
          ...this.state,
          isRes: true
        });
      }
    }
  }

  //here we get the value of propid from the search list class, so it'll be parent and this class will be it's child and
  //hence using props can get the value of propid
  componentDidMount() {
    var prop_id = this.props.save_property_id;
    this.props.propertyDetailsByID(prop_id);
    console.log(this.props.auth.user.email);
  }

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  changeMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  bookProperty = () => {
    this.decodedTraveller = jwt_decode(localStorage.getItem("travellerToken"));
    const data = {
      email: this.decodedTraveller.email,
      isbooked: 1,
      PropID: this.propID
    };

    this.props
      .propertyBookMutation({
        variables: {
          travelleremail: this.decodedTraveller.email,
          isbooked: 1,
          PropID: this.propID
        }
      })
      .then(response => {
        if (response.status === 200) {
          alert("Property Booked Successfully");
        } else {
          alert("There was some error, please try again!");
        }
      });
  };

  handleMessage = () => {
    console.log(this.props.property_details.ownermail);
    console.log(this.state.message);
    var data = {
      property_id: this.props.save_property_id,
      owner_mail: this.props.property_details.ownermail,
      property_name: this.props.property_details.headline,
      customer_mail: this.props.auth.user.email,
      message: this.state.message
    };
    this.props.sendMessage(data);
    this.props.history.push("/propDetailShow");
    alert(
      "Hi Traveller, your query has been sent to the owner, please wait for the reply. Happy Travelling !!"
    );
  };

  bookButtonClicked = () => {
    var data = {
      custmail: this.props.auth.user.email,
      isbooked: true,
      bookstartdate: sessionStorage.getItem("arrivedate"),
      bookenddate: sessionStorage.getItem("departdate"),
      property_id: this.props.save_property_id
    };
    this.props.bookProperty(data);
    alert("Property Successfully Booked !!");
    this.props.history.push("/Home");
  };

  render() {
    return (
      <div>
        <LoginNavbarCust />

        <div />
        <div className="container">
          <div class="tabbable">
            <div className="tab-content">
              <div class="tab-pane fade in active" id="tab-1" role="tabpanel">
                <div>
                  <div />
                  <div class="tab-pane">
                    <div class="row">
                      <div class="col-md-4">
                        <div
                          class="form-group form-group-lg form-group-icon-left"
                          style={{ backgroundColor: "white" }}
                        >
                          <input
                            class="form-control"
                            placeholder="Where do you want to go?"
                            type="text"
                            name="location"
                            onChange={this.changeLocation}
                            value={this.props.property_details.location}
                            id="location"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <DateRangePicker
                          startDate={moment(
                            sessionStorage.getItem("arrivedate")
                          )} // momentPropTypes.momentObj or null,
                          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                          endDate={moment(sessionStorage.getItem("departdate"))} // momentPropTypes.momentObj or null,
                          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                          onDatesChange={({ startDate, endDate }) =>
                            this.setState({ startDate, endDate })
                          } // PropTypes.func.isRequired,
                          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                          onFocusChange={focusedInput =>
                            this.setState({ focusedInput })
                          } // PropTypes.func.isRequired,
                          disabled
                        />
                      </div>

                      <div class="col-md-2">
                        <div
                          class="form-group form-group-lg form-group-select-plus"
                          style={{ backgroundColor: "white" }}
                        >
                          <select
                            class="form-control"
                            placeholder="No. of Guests"
                            id="guests"
                            name="guests"
                            onChange={this.changeGuests}
                            value={this.props.property_details.accomodates}
                            disabled
                          >
                            <option value="" active>
                              {sessionStorage.getItem("guests")}
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <form>
            <div className="form-row">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
                style={{ width: "684px", height: "512px", margin: "1px" }}
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#myCarousel"
                    data-slide-to="0"
                    className="active"
                  />
                  <li data-target="#myCarousel" data-slide-to="1" />
                  <li data-target="#myCarousel" data-slide-to="2" />
                  <li data-target="#myCarousel" data-slide-to="4" />
                  <li data-target="#myCarousel" data-slide-to="5" />
                </ol>
                <div className="carousel-inner">
                  {this.imageBase.map((imageName, index) => {
                    if (index == 0) {
                      return (
                        <div className="item active">
                          <img
                            style={{ width: "100%" }}
                            src={this.imageBase[0]}
                            alt="First slide"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="item">
                          <img
                            style={{ width: "100%" }}
                            src={imageName}
                            alt={index}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <a
                  className="left carousel-control"
                  href="#myCarousel"
                  data-slide="prev"
                >
                  <span class="glyphicon glyphicon-chevron-left" />
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  className="right carousel-control"
                  href="#myCarousel"
                  data-slide="next"
                >
                  <span class="glyphicon glyphicon-chevron-right" />
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <div
                className="white-background"
                style={{
                  width: "1100px",
                  height: "100px",
                  margin: "1px",
                  textAlign: "right"
                }}
              >
                <h3 className="ml-2">
                  {`${this.props.property_details.currtype}`}
                  {`${this.props.property_details.price} per night`}
                </h3>
                {/* <div col-md-4>
                  <DateRangePicker
                    displayFormat="YYYY-MM-DD"
                    startDate={this.state.startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={this.state.endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={({ startDate, endDate }) =>
                      this.setState({
                        startDate,
                        endDate
                      })
                    }
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput =>
                      this.setState({ focusedInput })
                    }
                  />
                </div> */}

                <div className="col-md-12">
                  <h5>
                    <b>{`Guests ${this.props.property_details.accomodates}`}</b>
                  </h5>
                </div>

                <br />
                <br />
                <div className="col-md-14">
                  <button
                    type="submit"
                    className="btn btn-primary btn-round btn-lg "
                    style={{ height: "50px", width: "300px" }}
                    onClick={this.bookButtonClicked}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="container">
            <div className="form-group row col-md-8">
              <button
                type="button"
                class="btn btn-info btn-lg"
                style={{ width: "300px" }}
                data-toggle="modal"
                data-target="#myModal"
              >
                Message Owner
              </button>

              <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                      <h4 class="modal-title">
                        Hello, {"  "}
                        {this.props.auth.user.firstname}
                      </h4>
                    </div>
                    <form>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          placeholder="Type in, your question for the property Owner"
                          type="text"
                          name="message"
                          onChange={this.changeMessage}
                          id="message"
                          value={this.state.message}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-success"
                          data-dismiss="modal"
                          onClick={this.handleMessage}
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div class="form-group tab-pane">
              <div class="col-md-6">
                <div class="input-group">
                  <div style={{ fontSize: "30px" }}>
                    <h1>{this.props.property_details.headline}</h1>
                    <h2>{this.props.property_details.location}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container">
            <div class="form-group">
              <div class="col-md-2">
                <div style={{ fontSize: "25px" }}>
                  <i class="fa fa-home" style={{ fontSize: "40px" }} />
                  <b> {this.props.property_details.propertytype}</b>
                </div>
              </div>

              <div class="col-md-2">
                <div style={{ fontSize: "30px" }}>
                  <i class="fa fa-bed" style={{ fontSize: "40px" }} />
                  <b> {this.props.property_details.beds}</b>
                </div>
              </div>

              <div class="col-md-2">
                <div style={{ fontSize: "25px" }}>
                  <i class="fa fa-tint" style={{ fontSize: "40px" }} />
                  <b>{this.props.property_details.baths}</b>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container">
            <div class="form-group">
              <div class="col-md-6">
                <div class="input-group">
                  <div style={{ fontSize: "30px" }}>
                    <h3>
                      <b>Summary:</b>{" "}
                    </h3>
                    <h4>{this.props.property_details.about}</h4>
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

PropertyDetails.propTypes = {
  propertyDetailsByID: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired,
  bookProperty: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  save_property_id: state.home.save_property_id,
  property_details: state.home.property_details,
  photos: state.photos,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { propertyDetailsByID, bookProperty, getPhoto, sendMessage }
)(withRouter(PropertyDetails));
