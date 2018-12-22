import React, { Component } from "react";
import { Link } from "react-router-dom";
//import cookie from "react-cookies";
import { Redirect } from "react-router";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import LoginNavbarCust from "../Navigation/LoginNavbarCust";
import * as Validate from "../Validations/datavalidation";

class Home extends Component {
  constructor(props) {
    super(props);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeGuests = this.changeGuests.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);

    this.state = {
      location: "",
      startDate: "",
      endDate: "",
      guests: "",
      messagediv: "",
      authFlag: false
    };
  }

  changeLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  changeGuests = e => {
    this.setState({
      guests: e.target.value
    });
  };

  searchSubmit = e => {
    let valid = Validate.propSearch(this.state);
    if (valid === "") {
      e.preventDefault();
      this.setState({
        authFlag: true
      });
      sessionStorage.setItem("location", this.state.location);
      sessionStorage.setItem(
        "arrival_date",
        this.state.startDate.format("YYYY-MM-DD")
      );
      sessionStorage.setItem(
        "depart_date",
        this.state.endDate.format("YYYY-MM-DD")
      );
      sessionStorage.setItem("guests", this.state.guests);
    } else {
      this.setState({
        ...this.state,
        messagediv: valid
      });
      e.preventDefault();
    }
  };

  render() {
    let message = null;
    if (this.state.messagediv !== "") {
      message = (
        <div className="clearfix">
          <div className="alert-danger text-center" role="alert">
            {this.state.messagediv}
          </div>
        </div>
      );
    } else {
      message = <div />;
    }

    let redirect = null;
    if (this.state.authFlag) {
      redirect = <Redirect to="/CardSearch" />;
    }
    return (
      <div className="bckg">
        {redirect}
        <LoginNavbarCust />
        <div class="container">
          <div className="row">{message}</div>
          <div class="search-tabs search-tabs-bg">
            <h1 style={{ color: "black" }}>
              <b>
                <br />
                Book Beach Houses, cabins,
                <br />
                condos and more, worldwide
              </b>
            </h1>
          </div>
        </div>

        <div className="container">
          <div class="tabbable">
            <div className="tab-content">
              <div class="tab-pane fade in active" id="tab-1" role="tabpanel">
                <div>
                  <div class="tab-pane">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group form-group-lg form-group-icon-left">
                          <input
                            class="form-control"
                            placeholder="Where do you want to go?"
                            type="text"
                            name="location"
                            onChange={this.changeLocation}
                            id="location"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <DateRangePicker
                          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
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
                        <div class="form-group form-group-lg form-group-select-plus">
                          <select
                            class="form-control"
                            placeholder="No. of Guests"
                            id="guests"
                            name="guests"
                            onChange={this.changeGuests}
                          >
                            <option value="" active>
                              Guests
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
                            class="btn btn-primary btn-lg btn-block"
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
        </div>
      </div>
    );
  }
}

export default Home;
