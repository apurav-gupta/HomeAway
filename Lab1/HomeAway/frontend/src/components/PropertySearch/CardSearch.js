import React, { Component } from "react";
import SearchCardList from "./SearchCardList";
import LoginNavbarCust from "../Navigation/LoginNavbarCust";
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class CardSearch extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      authflag: false,
      isClicked: false
    };
  }

  redirectDetails = propertyid => {
    sessionStorage.setItem("selectProp", propertyid);

    this.setState({
      ...this.state,
      isClicked: true
    });
  };

  componentDidMount() {
    const data = {
      location: sessionStorage.getItem("location"),
      accomodates: sessionStorage.getItem("guests"),
      arrival_date: sessionStorage.getItem("arrival_date"),
      depart_date: sessionStorage.getItem("depart_date")
    };

    axios.post("http://localhost:3001/PropertySearch", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.lookprop = response.data;
        this.setState({
          ...this.state,
          authflag: true
        });
      } else {
        this.setState({
          ...this.state,
          authflag: false
        });
      }
    });
  }

  render() {
    let redirect = null;
    if (this.state.isClicked) {
      return <Redirect to="/propDetailShow" />;
    }
    return (
      <div>
        {redirect}
        <LoginNavbarCust />
        <div class="tabbable">
          <div className="tab-content">
            <div class="tab-pane fade in active" id="tab-1" role="tabpanel">
              <div>
                <div />
                <div class="tab-pane">
                  <div class="row">
                    <div class="col-md-5">
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

                    <div class="col-md-3">
                      <DateRangePicker
                        startDate={moment(
                          sessionStorage.getItem("arrival_date")
                        )} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={moment(sessionStorage.getItem("depart_date"))} // momentPropTypes.momentObj or null,
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
        {this.lookprop.map((propval, place) => (
          <div className="ml-5 mt-2">
            <SearchCardList
              propertyid={propval.propertyid}
              location={propval.location}
              headline={propval.headline}
              description={propval.description}
              property_type={propval.property_type}
              bedrooms={propval.bedrooms}
              bathrooms={propval.bathrooms}
              accomodates={propval.accomodates}
              currtype={propval.currtype}
              dailyrate={propval.dailyrate}
              onClick={() => this.redirectDetails(propval.propertyid)}
            />
          </div>
        ))}
      </div>
    );
  }
}
export default CardSearch;
