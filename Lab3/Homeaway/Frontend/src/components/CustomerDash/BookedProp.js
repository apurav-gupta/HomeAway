import React, { Component } from "react";
import BookedPropCard from "./BookedPropCard";
import TravDashboard from "./TravDashboard";
import jwt_decode from "jwt-decode";
import { travelerProperties } from "../../queries/queries";

// REDUX functionality
import { connect } from "react-redux";
import { travellerBookings } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getPhoto } from "../../actions/photosAction";
import withApollo from "react-apollo/withApollo";

class BookedProp extends Component {
  lookprop = [];
  imageBase = [];
  propertyBookings = [];
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

  /*componentWillReceiveProps(nextProps) {
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
  }*/

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  doGraphLogin = () => {
    // var headers = new Headers();
    // e.preventDefault();
    console.log(this.decodedTraveller.email);
    this.props.client
      .query({
        query: travelerProperties,
        variables: {
          // genre: "4",
          email: this.decodedTraveller.email
        }
        // ,refetchQueries: [{ query: getBooksQuery }]
      })
      .then(response => {
        console.log(response);
        this.propertyBookings = JSON.parse(
          response.data.travelerProperties.properties
        );
        this.setState({
          ...this.state
        });
      });
  };

  componentDidMount() {
    this.decodedTraveller = jwt_decode(localStorage.getItem("travellerToken"));
    //     this.props.travellerBookings(this.decodedTraveller.email);
    this.doGraphLogin();
  }

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  render() {
    console.log(this.propertyBookings);
    const { length: count } = this.propertyBookings;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const bookings = paginate(this.propertyBookings, currentPage, pageSize);
    return (
      <div>
        <TravDashboard />

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

/*BookedProp.propTypes = {
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
)(withRouter(BookedProp));*/

export default withApollo(
  // graphql(getUserQuery, { name: "getUserQuery" })
  BookedProp
);
