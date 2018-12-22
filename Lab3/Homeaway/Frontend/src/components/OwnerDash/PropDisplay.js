import React, { Component } from "react";
import Properties from "./Properties";
import Dashboard from "./Dashboard";
import { ownerProperties } from "../../queries/queries";
import jwt_decode from "jwt-decode";

// REDUX functionality
import { connect } from "react-redux";
import { displayProperties } from "../../actions/propertyAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getPhoto } from "../../actions/photosAction";
import withApollo from "react-apollo/withApollo";

class PropDisplay extends Component {
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
    if (nextProps.owner_data != null && this.getPhoto === true) {
      let imagePreview = "data:image/jpg;base64, " + nextProps.photos.photo;
      this.imageBase.push(imagePreview);
      this.setState({
        imagePushed: true
      });
    } else if (nextProps.owner_data != null && this.getPhoto === false) {
      this.propertyBookings = nextProps.owner_data;
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
  }*/

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  componentDidMount() {
    this.decodedOwner = jwt_decode(localStorage.getItem("ownerToken"));
    //  this.props.ownerProperties(this.decodedOwner.email);
    this.doGraphLogin();
  }

  doGraphLogin = () => {
    // var headers = new Headers();
    // e.preventDefault();
    console.log(this.decodedOwner.email);
    this.props.client
      .query({
        query: ownerProperties,
        variables: {
          // genre: "4",
          email: this.decodedOwner.email
        }
        // ,refetchQueries: [{ query: getBooksQuery }]
      })
      .then(response => {
        alert("No Property Booking for you !!");
        console.log(response);
        this.propertyBookings = JSON.parse(
          response.data.ownerProperties.properties
        );
        this.setState({
          ...this.state
        });
      });
  };

  render() {
    console.log(this.props.owner_data);
    const { length: count } = this.propertyBookings;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const properties = paginate(this.propertyBookings, currentPage, pageSize);
    return (
      <div>
        <Dashboard />

        {properties.map((propval, place) => (
          <div className="ml-5 mt-2">
            <Properties
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

/*PropDisplay.propTypes = {
  displayProperties: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  owner_data: state.property.owner_data,
  photos: state.photos,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { displayProperties, getPhoto }
)(withRouter(PropDisplay));*/

export default withApollo(
  // graphql(getUserQuery, { name: "getUserQuery" })
  PropDisplay
);
