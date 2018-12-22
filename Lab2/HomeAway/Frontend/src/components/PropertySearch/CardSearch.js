import React, { Component } from "react";
import SearchCardList from "./SearchCardList";
import LoginNavbarCust from "../Navigation/LoginNavbarCust";
import axios from "axios";
import { Redirect } from "react-router";
import * as Validate from "../Validations/datavalidation";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { getPhoto } from "../../actions/photosAction";

// REDUX functionality
import { connect } from "react-redux";
import {
  searchProperty,
  displayPropCard,
  displayPropCardDetail
} from "../../actions/propertysearchAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

class CardSearch extends Component {
  lookprop = [];
  imageBase = [];
  finalFilter = [];
  propertyBookings = [];

  constructor(props) {
    super(props);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeGuests = this.changeGuests.bind(this);
    this.filterBeds = this.filterBeds.bind(this);
    this.filterPriceMax = this.filterPriceMax.bind(this);
    this.filterPriceMin = this.filterPriceMin.bind(this);
    this.filterData = this.filterData.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    // this.clearData = this.clearData.bind(this);

    this.state = {
      location: "",
      startDate: "",
      endDate: "",
      accomodates: "",
      messagediv: "",
      bedrooms: "",
      pricemin: "",
      pricemax: "",
      photo: [],

      currentPage: 1,
      pageSize: 10,
      authflag: false,
      isClicked: false,
      isRes: false
    };

    this.getPhoto = false;
  }

  changeLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  filterBeds = e => {
    this.setState({
      bedrooms: e.target.value
    });
  };

  filterPriceMin = e => {
    this.setState({
      pricemin: e.target.value
    });
  };

  filterPriceMax = e => {
    this.setState({
      pricemax: e.target.value
    });
  };

  changeGuests = e => {
    this.setState({
      accomodates: e.target.value
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  redirectDetails = propertyid => {
    // sessionStorage.setItem("selectProp", propertyid);
    this.props.displayPropCardDetail(propertyid);
    this.setState({
      ...this.state,
      isClicked: true
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.display_property != null && this.getPhoto === true) {
      let imagePreview = "data:image/jpg;base64, " + nextProps.photos.photo;
      this.imageBase.push(imagePreview);
      this.setState({
        imagePushed: true
      });
    } else if (nextProps.display_property != null && this.getPhoto === false) {
      this.propertyBookings = nextProps.display_property;
      if (this.propertyBookings.length > 0) {
        for (let i = 0; i < this.propertyBookings.length; i++) {
          var photoData = this.propertyBookings[i].photos;
          var photoArr = JSON.parse(photoData);
          this.handleGetPhoto(photoArr[0]);
        }

        this.setState({
          ...this.state,
          isRes: true
        });
      }
    }
  }

  componentDidMount() {
    var data = {
      loc: sessionStorage.getItem("location"),
      guests: sessionStorage.getItem("accomodates"),
      arrdate: sessionStorage.getItem("arrivedate"),
      depdate: sessionStorage.getItem("departdate"),
      isbooked: false
    };
    console.log(data);
    this.props.displayPropCard(data);
  }

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  // clearData = e => {
  //   console.log("clearing filter");
  //   this.propertyBookings = this.props.display_property;
  //   console.log(this.propertyBookings);
  //   this.setState({
  //     ...this.state,
  //     filterUpdate: true
  //   });
  // };

  /**************** Filter Functionality ***************** */

  filterData = e => {
    console.log("Inside filter");
    var filterResult = [];
    console.log(this.state.pricemin);
    console.log(this.state.pricemax);
    let valid = Validate.propFilter(this.state);
    console.log(valid);
    if (valid === "") {
      console.log("Inside validation filter");
      e.preventDefault();
      console.log(this.props.display_property);
      console.log(this.state.bedrooms);
      if (
        this.state.bedrooms !== "" &&
        (this.state.pricemin !== "" && this.state.pricemax !== "")
      ) {
        console.log(this.state.pricemin);
        console.log(this.state.pricemax);
        console.log(this.state.bedrooms);
        filterResult = _.map(this.props.display_property, o => {
          if (
            o.beds >= parseInt(this.state.bedrooms) &&
            o.price >= parseInt(this.state.pricemin) &&
            o.price <= parseInt(this.state.pricemax)
          )
            return o;
        });
      } else if (
        this.state.bedrooms !== "" &&
        (this.state.pricemin === "" && this.state.pricemax === "")
      ) {
        console.log(this.state.pricemin);
        console.log(this.state.pricemax);
        console.log(this.state.bedrooms);
        filterResult = _.map(this.props.display_property, o => {
          if (o.beds >= parseInt(this.state.bedrooms)) return o;
        });
      } else if (
        this.state.bedrooms === "" &&
        (this.state.pricemin !== "" && this.state.pricemax !== "")
      ) {
        console.log(this.state.pricemin);
        console.log(this.state.pricemax);
        console.log(this.state.bedrooms);
        filterResult = _.map(this.props.display_property, o => {
          if (
            o.price >= parseInt(this.state.pricemin) &&
            o.price <= parseInt(this.state.pricemax)
          )
            return o;
        });
      }

      console.log(filterResult);
      this.finalFilter = _.compact(filterResult);
      console.log(this.finalFilter);
      this.propertyBookings = this.finalFilter;
      this.setState({
        ...this.state,
        filterUpdate: true
      });
    }
    // } else {
    //   this.setState({
    //     ...this.state,
    //     messagediv: valid
    //   });
    //   e.preventDefault();
    // }
  };

  /*********************Search bar Functionality ************* */
  searchSubmit = e => {
    let valid = Validate.propSearch(this.state);
    if (valid === "") {
      e.preventDefault();
      var data = {
        location: this.state.location,
        arrivedate: this.state.startDate,
        departdate: this.state.endDate,
        accomodates: this.state.accomodates
      };
      sessionStorage.setItem("location", this.state.location);
      sessionStorage.setItem("arrivedate", this.state.startDate);
      sessionStorage.setItem("departdate", this.state.endDate);
      sessionStorage.setItem("accomodates", this.state.accomodates);
      axios.defaults.withCredentials = true;
      console.log(sessionStorage.getItem("location"));
      console.log(sessionStorage.getItem("arrivedate"));
      console.log(sessionStorage.getItem("departdate"));
      console.log(sessionStorage.getItem("accomodates"));
      console.log("Values using sessionstorage");
      console.log(data);
      this.props.searchProperty(data);
      this.props.history.push("/CardSearch");
    } else {
      this.setState({
        ...this.state,
        messagediv: valid
      });
      e.preventDefault();
    }
  };

  render() {
    var { length: count } = this.propertyBookings;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const properties = paginate(this.propertyBookings, currentPage, pageSize);

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
                            {sessionStorage.getItem("accomodates")}
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
                          data-toggle="modal"
                          data-target="#myModal"
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

        <div class="tab-pane">
          <div class="row">
            <div class="col-md-3" />
            <div class="col-md-1">
              <div class="form-group">
                <input
                  class="form-control"
                  placeholder="Min."
                  type="text"
                  name="pricemin"
                  onChange={this.filterPriceMin}
                  id="pricemin"
                />
              </div>
            </div>
            <div class="col-md-1">
              <div class="form-group">
                <input
                  class="form-control"
                  placeholder="Max."
                  type="text"
                  name="pricemax"
                  onChange={this.filterPriceMax}
                  id="pricemax"
                />
              </div>
            </div>

            <div class="col-md-2">
              <div class="form-group">
                <select
                  class="form-control"
                  placeholder="No. of Bedrooms"
                  id="bedrooms"
                  name="bedrooms"
                  onChange={this.filterBeds}
                >
                  <option value="" active>
                    Bedrooms
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
              <button
                type="submit"
                onClick={this.filterData}
                class="btn btn-primary"
              >
                Filter
              </button>
              &nbsp; &nbsp;
              <button
                type="submit"
                onClick={this.clearData}
                class="btn btn-primary"
                value=""
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <h3>
          {" "}
          Showing {count} properties in the database, according to your search,
          {"   "}
          {this.props.auth.user.firstname}:{" "}
        </h3>
        {properties.map((propval, place) => (
          <div className="ml-5 mt-2">
            <SearchCardList
              _id={propval._id}
              location={propval.location}
              headline={propval.headline}
              about={propval.about}
              propertytype={propval.propertytype}
              beds={propval.beds}
              baths={propval.baths}
              accomodates={propval.accomodates}
              photo={this.imageBase[place]}
              currtype={propval.currtype}
              price={propval.price}
              onClick={() => this.redirectDetails(propval._id)}
            />
          </div>
        ))}
        <div className="col-sm-12">
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

CardSearch.propTypes = {
  displayPropCard: PropTypes.func.isRequired,
  searchProperty: PropTypes.func.isRequired,
  displayPropCardDetail: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  display_property: state.home.display_property,
  auth: state.auth,
  photos: state.photos,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { displayPropCard, searchProperty, displayPropCardDetail, getPhoto }
)(withRouter(CardSearch));
