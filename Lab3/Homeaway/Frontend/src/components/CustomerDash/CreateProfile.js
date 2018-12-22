import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import TravDashboard from "./TravDashboard";

import Img from "./default.jpg";
import isEmpty from "../Validations/is-empty";
import * as Validate from "../Validations/datavalidation";

import jwt_decode from "jwt-decode";
import { convertColorToString } from "material-ui/utils/colorManipulator";

import { postPhotos, getPhoto } from "../../actions/photosAction";
import Dropzone from "react-dropzone";

class CreateProfile extends Component {
  imageNameArr = [];
  imageBase = [];
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      about: "",
      street: "",
      city: "",
      state: "",
      photo: "",
      country: "",
      work: "",
      school: "",
      hometown: "",
      gender: "",
      primarycontact: "",
      secondarycontact: "",
      messagediv: "",
      image: Img,
      photo: [],
      isRes: false
    };
    this.getPhoto = false;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    var token = sessionStorage.getItem("JWTToken");
    const decoded = jwt_decode(token);
    var data = {
      email: decoded.email
    };
    console.log("In component Did Mount");
    this.props.getCurrentProfile(data.email);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.firstname = !isEmpty(profile.firstname) ? profile.firstname : "";
      console.log(!isEmpty(profile.firstname));
      profile.lastname = !isEmpty(profile.lastname) ? profile.lastname : "";
      profile.email = !isEmpty(profile.email) ? profile.email : "";
      profile.about = !isEmpty(profile.about) ? profile.about : "";
      profile.street = !isEmpty(profile.street) ? profile.street : "";
      profile.city = !isEmpty(profile.city) ? profile.city : "";
      profile.state = !isEmpty(profile.state) ? profile.state : "";
      profile.country = !isEmpty(profile.country) ? profile.country : "";
      profile.work = !isEmpty(profile.work) ? profile.work : "";
      profile.school = !isEmpty(profile.school) ? profile.school : "";
      profile.hometown = !isEmpty(profile.hometown) ? profile.hometown : "";
      profile.gender = !isEmpty(profile.gender) ? profile.gender : "";
      profile.primarycontact = !isEmpty(profile.primarycontact)
        ? profile.primarycontact
        : "";
      profile.secondarycontact = !isEmpty(profile.secondarycontact)
        ? profile.secondarycontact
        : "";

      this.setState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        about: profile.about,
        street: profile.street,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        work: profile.work,
        school: profile.school,
        hometown: profile.hometown,
        // photo: this.state.selectedFile.name,
        gender: profile.gender,
        primarycontact: profile.primarycontact,
        secondarycontact: profile.secondarycontact
      });
    }
  }

  doGraphUpdate = e => {
    // var headers = new Headers();
    e.preventDefault();
    console.log(this.decodedTraveller.email);
    this.props
      .travelerUpdatee({
        variables: {
          // genre: "4",
          firstName: this.state.firstNamee,
          lastName: this.state.lastnaa,
          email: this.decodedTraveller.email,
          phoneno: this.state.phoneno,
          aboutme: this.state.aboutme,
          country: this.state.country,
          company: this.state.company,
          school: this.state.school,
          languages: this.state.languages,
          gender: this.state.gender,
          city: this.state.city,
          hometown: this.state.hometown
        }
        // ,refetchQueries: [{ query: getBooksQuery }]
      })
      .then(response => {
        console.log(response);
      });
  };

  onSubmit = e => {
    e.preventDefault();
    let valid = Validate.update(this.state);
    if (valid === "") {
      const profileData = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        about: this.state.about,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        work: this.state.work,
        school: this.state.school,
        hometown: this.state.hometown,
        photo: this.imageNameArr,
        gender: this.state.gender,
        primarycontact: this.state.primarycontact,
        secondarycontact: this.state.secondarycontact
      };

      this.props.createProfile(profileData, this.props.history);
    } else {
      this.setState({
        ...this.state,
        messagediv: valid
      });
      e.preventDefault();
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /***********Image uplaod */
  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      this.uid = new Date().valueOf();
      formData.append("imagename", file.name);
      this.imageNameArr.push(file.name);

      console.log(file.name);
      console.log(this.imageNameArr);

      formData.append("timestamp", (Date.now() / 1000) | 0);

      this.props.postPhotos(formData);
      alert("Photos uploaded to the server");
    });
  };

  submitHandler = e => {
    e.preventDefault();
    var photosName = this.imageNameArr;
    console.log(this.imageNameArr);
    this.props.handlerParentforPhotos(photosName);
    alert("Property Photos name submitted");
  };

  /******** */

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

    return (
      <div>
        <TravDashboard />
        <div align="center">
          <div className="row">{message}</div>
          <center>
            <img
              src={this.state.image}
              alt="Avatar"
              style={{ width: "200px", padding: "10px", borderRadius: "50%" }}
            />
            <Dropzone
              onDrop={this.handleDrop}
              multiple
              accept="image/*"
              type="file"
            >
              <div>Drop files to upload.</div>
            </Dropzone>
            <br />
          </center>
          <h3>
            {this.props.profile.profile.firstname}
            {"    "}
            {this.props.profile.profile.lastname}
          </h3>
        </div>
        <br />
        <legend>
          <b>User Profile Information: </b>
        </legend>
        <div class="container">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-md-4 control-label">First Name:</label>
              <div class="col-md-4">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-user" />
                  </div>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    class="form-control input-md"
                    value={this.state.firstname}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Last Name:</label>
              <div class="col-md-4">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-user" />
                  </div>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    class="form-control input-md"
                    value={this.state.lastname}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Email address</label>
              <div class="col-md-4">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-envelope" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email address"
                    class="form-control input-md"
                    value={this.state.email}
                    onChange={this.onChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Description:</label>
              <div class="col-md-4">
                <textarea
                  class="form-control"
                  rows="10"
                  id="about"
                  name="about"
                  placeholder="About Me"
                  value={this.state.about}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Address:</label>
              <div class="col-md-4">
                <div class="input-group">
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Street"
                    class="form-control input-md "
                    value={this.state.street}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label" />
              <div class="col-md-4">
                <div class="input-group">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                    class="form-control input-md "
                    value={this.state.city}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label" />
              <div class="col-md-4">
                <div class="input-group">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="State"
                    class="form-control input-md "
                    value={this.state.state}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label" />
              <div class="col-md-4">
                <div class="input-group">
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Country"
                    class="form-control input-md "
                    value={this.state.country}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Work:</label>
              <div class="col-md-4">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-briefcase" />
                  </div>
                  <input
                    id="work"
                    name="work"
                    type="text"
                    placeholder="Work"
                    class="form-control input-md"
                    value={this.state.work}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">School:</label>
              <div class="col-md-4">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-graduation-cap" />
                  </div>
                  <input
                    id="school"
                    name="school"
                    type="text"
                    placeholder="School"
                    class="form-control input-md"
                    value={this.state.school}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">HomeTown:</label>
              <div class="col-md-4">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-home" />
                  </div>
                  <input
                    id="hometown"
                    name="hometown"
                    type="text"
                    placeholder="HomeTown"
                    class="form-control input-md"
                    value={this.state.hometown}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Gender:</label>
              <div class="col-md-4">
                <input
                  type="radio"
                  name="gender"
                  id="Gender1"
                  value="Male"
                  onChange={this.onChange}
                  checked={this.state.gender === "Male"}
                  checked="checked"
                />
                {"    "}
                Male &nbsp;&nbsp;
                <i class="fa fa-male" style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label" />
              <div class="col-md-4">
                <input
                  type="radio"
                  name="gender"
                  id="Gender2"
                  value="Female"
                  onChange={this.onChange}
                  checked={this.state.gender === "Female"}
                />{" "}
                {"   "}
                Female &nbsp;&nbsp;
                <i class="fa fa-female" style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label" />
              <div class="col-md-4">
                <input
                  type="radio"
                  name="gender"
                  id="Gender3"
                  value="Other"
                  onChange={this.onChange}
                  checked={this.state.gender === "Other"}
                />
                {"   "}
                Other
              </div>
            </div>
            <label class="col-md-4 control-label" />
            <i
              class="fa fa-lock"
              style={{ fontSize: "20px", color: "blue" }}
            />{" "}
            &nbsp;
            <label>This is never shared</label>
            <br />
            <br />
            <div class="form-group">
              <label class="col-md-4 control-label">Contact Details:</label>
              <div class="col-md-4">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-phone" />
                  </div>
                  <input
                    id="Phone"
                    name="primarycontact"
                    type="text"
                    placeholder="Primary Contact"
                    class="form-control input-md"
                    value={this.state.primarycontact}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div class="input-group othertop">
                  <div class="input-group-addon">
                    <i
                      class="fa fa-mobile fa-1x"
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                  <input
                    id="Phone"
                    name="secondarycontact"
                    type="text"
                    placeholder=" Secondary Contact"
                    class="form-control input-md"
                    value={this.state.secondarycontact}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label" />
              <div class="col-md-4">
                <button
                  type="submit"
                  class="btn btn-success"
                  value="Save"
                  onClick={this.onSubmit}
                >
                  <span class="glyphicon glyphicon-thumbs-up" /> Save Changes
                </button>
                &nbsp; &nbsp;
                <button type="reset" class="btn btn-danger" value="Clear">
                  <span class="glyphicon glyphicon-remove-sign" /> Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  postPhotos: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    photos: state.photos,
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile, postPhotos, getPhoto }
)(withRouter(CreateProfile));
