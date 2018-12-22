import React, { Component } from "react";
import axios from "axios";
import BookedPropCard from "./BookedPropCard";
import TravDashboard from "./TravDashboard";

// REDUX functionality
import { connect } from "react-redux";
import { travellerBookings } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getPhoto } from "../../actions/photosAction";

class BookedProp extends Component {
  lookprop = [];
  imageBase = [];
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 5,
      photo: [],
      authflag: false,
      isRes: false
    };
    this.getPhoto = false;
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.traveller_booking != null && this.getPhoto === true) {
      let imagePreview = "data:image/jpg;base64, " + nextProps.photos.photo;
      this.imageBase.push(imagePreview);
      this.setState({
        imagePushed: true
      });
    } else if (nextProps.traveller_booking != null && this.getPhoto === false) {
      this.custbookings = nextProps.traveller_booking;
      if (this.custbookings.length > 0) {
        for (let i = 0; i < this.custbookings.length; i++) {
          var photoData = this.custbookings[i].photos;
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

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  componentDidMount() {
    var data = {
      travellermail: this.props.auth.user.email
    };
    this.props.travellerBookings(data);
  }

  render() {
    console.log(this.props.traveller_booking);
    const { length: count } = this.props.traveller_booking;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const bookings = paginate(
      this.props.traveller_booking,
      currentPage,
      pageSize
    );
    return (
      <div>
        <TravDashboard />
        <p>
          {" "}
          Showing {count} properties in the Booking database of{" "}
          {this.props.auth.user.firstname}:{" "}
        </p>
        {bookings.map((propval, place) => (
          <div className="ml-5 mt-2">
            <BookedPropCard
              _id={propval._id}
              location={propval.location}
              headline={propval.headline}
              arrivedate={propval.arrivedate}
              departdate={propval.departdate}
              about={propval.about}
              propertytype={propval.propertytype}
              beds={propval.beds}
              baths={propval.baths}
              photo={this.imageBase[place]}
              accomodates={propval.accomodates}
              currtype={propval.currtype}
              price={propval.price}
            />
          </div>
        ))}
        <Pagination
          itemsCount={count}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

BookedProp.propTypes = {
  travellerBookings: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  traveller_booking: state.profile.traveller_booking,
  photos: state.photos,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { travellerBookings, getPhoto }
)(withRouter(BookedProp));
