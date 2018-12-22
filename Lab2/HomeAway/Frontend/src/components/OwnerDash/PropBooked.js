import React, { Component } from "react";
import Dashboard from "./Dashboard";
import PropBook from "./PropBook";

// REDUX functionality
import { connect } from "react-redux";
import { ownerBookedProperties } from "../../actions/propertyAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getPhoto } from "../../actions/photosAction";

class PropBooked extends Component {
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
    if (nextProps.owner_display_data != null && this.getPhoto === true) {
      let imagePreview = "data:image/jpg;base64, " + nextProps.photos.photo;
      this.imageBase.push(imagePreview);
      this.setState({
        imagePushed: true
      });
    } else if (
      nextProps.owner_display_data != null &&
      this.getPhoto === false
    ) {
      this.propertyBookings = nextProps.owner_display_data;
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

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  componentDidMount() {
    var data = {
      ownermail: sessionStorage.getItem("ownermail")
    };

    this.props.ownerBookedProperties(data);
  }

  render() {
    console.log(this.props.owner_display_data);
    const { length: count } = this.props.owner_display_data;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const bookedProperty = paginate(
      this.props.owner_display_data,
      currentPage,
      pageSize
    );
    return (
      <div>
        <Dashboard />
        <p>
          {" "}
          Showing {count} properties in the database of{" "}
          {this.props.auth.user.firstname}:{" "}
        </p>
        {bookedProperty.map((propval, place) => (
          <div className="ml-5 mt-2">
            <PropBook
              _id={propval._id}
              location={propval.location}
              headline={propval.headline}
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

PropBooked.propTypes = {
  ownerBookedProperties: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  owner_display_data: state.property.owner_display_data,
  photos: state.photos,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { ownerBookedProperties, getPhoto }
)(withRouter(PropBooked));
