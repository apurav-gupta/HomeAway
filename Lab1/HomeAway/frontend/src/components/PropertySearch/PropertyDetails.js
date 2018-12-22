import React, { Component } from "react";
//import SearchCardList from "./SearchCardList";
import LoginNavbarCust from "../Navigation/LoginNavbarCust";
import axios from "axios";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

class PropertyDetails extends Component {
  location = "";
  headline = "";
  description = "";
  property_type = "";
  bedroom = "";
  bathroom = "";
  accomodation = "";
  photos = "";
  checkin = "";
  checkout = "";
  rate = "";
  customermail = "";
  isBooked = "";
  propID = 0;

  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      propDetails: []
    };
    this.propID = sessionStorage.getItem("selectProp");
  }

  //here we get the value of propid from the search list class, so it'll be parent and this class will be it's child and
  //hence using props can get the value of propid
  componentDidMount() {
    axios
      .get("http://localhost:3001/propDetailShow", {
        params: {
          PropID: sessionStorage.getItem("selectProp")
        }
      })
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.location = response.data[0].location;
          this.headline = response.data[0].headline;
          this.description = response.data[0].description;
          this.property_type = response.data[0].property_type;
          this.bedroom = response.data[0].bedrooms;
          this.accomodation = response.data[0].accomodates;
          this.bathroom = response.data[0].bathrooms;
          // this.photos = response.data[0].photos;
          this.checkin = response.data[0].arrival_date;
          this.checkout = response.data[0].depart_date;
          this.curr_type = response.data[0].curr_type;
          this.rate = response.data[0].dailyrate;
          this.customermail = response.data[0].customermail;
          this.isBooked = response.data[0].isbooked;
          this.setState({
            ...this.state,
            propDetails: response.data
          });
        } else {
        }
      });
  }

  bookButtonClicked = () => {
    const data = {
      custmail: sessionStorage.getItem("custmail"),
      isbooked: 1,
      houseId: this.propID
    };
    axios.post("http://localhost:3001/propBooked", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Property Booked Successfully");
        alert("Property Booked Successfully");
      } else {
      }
    });
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
                            value={sessionStorage.getItem("location")}
                            id="location"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <DateRangePicker
                          startDate={moment(
                            sessionStorage.getItem("arrival_date")
                          )} // momentPropTypes.momentObj or null,
                          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                          endDate={moment(
                            sessionStorage.getItem("depart_date")
                          )} // momentPropTypes.momentObj or null,
                          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                          onDatesChange={({ startDate, endDate }) =>
                            this.setState({ startDate, endDate })
                          } // PropTypes.func.isRequired,
                          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                          onFocusChange={focusedInput =>
                            this.setState({ focusedInput })
                          } // PropTypes.func.isRequired,
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
                      <div class="col-md-2">
                        <div class="hotel-search-button">
                          <button
                            type="submit"
                            onClick={this.searchSubmit}
                            class="btn btn-primary btn-lg"
                            value=""
                          >
                            Search
                          </button>
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
            <div className="row">
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
                </ol>
                <div className="carousel-inner">
                  <div className="item active">
                    <img
                      src="https://odis.homeaway.com/odis/listing/6817b421-8be9-4830-a941-9be2905ac9e7.c10.jpg"
                      alt="First slide"
                      style={{ width: "100%" }}
                    />
                    <div class="carousel-caption" />
                  </div>

                  <div className="item">
                    <img
                      src="https://odis.homeaway.com/odis/listing/b2668a3a-8fd5-4766-8bc1-9048316ced01.c10.jpg"
                      alt="Second slide"
                      style={{ width: "100%" }}
                    />
                    <div class="carousel-caption" />
                  </div>

                  <div className="item">
                    <img
                      src="https://odis.homeaway.com/odis/listing/6817b421-8be9-4830-a941-9be2905ac9e7.c10.jpg"
                      alt="Third slide"
                      style={{ width: "100%" }}
                    />
                    <div class="carousel-caption" />
                  </div>
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
                <div
                  className="white-background"
                  style={{
                    width: "1100px",
                    height: "512px",
                    margin: "1px",
                    textAlign: "right"
                  }}
                >
                  <h3 className="ml-2">{`$${this.rate} per night`}</h3>
                  <div col-md-4 item-detail-page mt-4 mb-4>
                    <DateRangePicker
                      displayFormat="YYYY-MM-DD"
                      startDate={moment(sessionStorage.getItem("arrival_date"))}
                      startDateId="your_unique_start_date_id"
                      endDate={moment(sessionStorage.getItem("depart_date"))}
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
                  </div>

                  <div className="col-md-8 col-md-offset-4 mt-4 mb-4 item-detail-page">
                    <h5>
                      <b>{`Guests ${this.accomodation}`}</b>
                    </h5>
                  </div>

                  <br />
                  <br />
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-round btn-lg"
                      onClick={this.bookButtonClicked}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="container">
            <div class="form-group">
              <div class="col-md-6">
                <div class="input-group">
                  <div style={{ fontSize: "30px" }}>
                    <h1>{this.headline}</h1>
                    <h2>{this.location}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container">
            <div class="form-group">
              <div class="col-md-4">
                <div class="input-group">
                  <div style={{ fontSize: "30px" }}>
                    <i class="fa fa-home" style={{ fontSize: "40px" }} />
                    <b> {this.property_type}</b>
                  </div>
                </div>
              </div>

              <div class="col-md-2">
                <div class="input-group">
                  <div style={{ fontSize: "30px" }}>
                    <i class="fa fa-bed" style={{ fontSize: "40px" }} />
                    <b> {this.bedroom}</b>
                  </div>
                </div>
              </div>

              <div class="col-md-2">
                <div class="input-group">
                  <div style={{ fontSize: "30px" }}>
                    <i class="fa fa-user" style={{ fontSize: "40px" }} />
                    <b> {this.accomodation}</b>
                  </div>
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
                    <h4>{this.description}</h4>
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

export default PropertyDetails;
