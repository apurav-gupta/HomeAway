import React, { Component } from "react";
import TravDashboard from "./TravDashboard";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Img from "./default.jpg";
import { Link } from "react-router-dom";
import * as Validate from "../Validations/datavalidation";

class TravelerProfilebar extends Component {
  constructor(props) {
    super(props);
    this.changefirstname = this.changefirstname.bind(this);
    this.changelastname = this.changelastname.bind(this);
    this.changemail = this.changemail.bind(this);
    this.changedescription = this.changedescription.bind(this);
    this.changestreet = this.changestreet.bind(this);
    this.changecity = this.changecity.bind(this);
    this.changestate = this.changestate.bind(this);
    this.changecountry = this.changecountry.bind(this);
    this.changework = this.changework.bind(this);
    this.changeschool = this.changeschool.bind(this);
    this.changehometown = this.changehometown.bind(this);
    // this.fileChangedHandler = this.fileChangedHandler.bind(this);
    // this.uploadHandler = this.uploadHandler.bind(this);
    // this.changegender = this.changegender.bind(this);
    this.changeprimarycontact = this.changeprimarycontact.bind(this);
    this.changesecondarycontact = this.changesecondarycontact.bind(this);
    this.handleProfileUpdated = this.handleProfileUpdated.bind(this);
    this.userrname = sessionStorage.getItem("username");
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      mailid: "",
      about: "",
      street: "",
      city: "",
      state: "",
      country: "",
      work: "",
      school: "",
      hometown: "",
      //   gender: null,
      primarycontact: "",
      secondarycontact: "",
      messagediv: "",
      image: Img,
      ProfileUpdated: false
    };
  }

  changefirstname = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  changelastname = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  changemail = e => {
    this.setState({
      mailid: e.target.value
    });
  };

  changedescription = e => {
    this.setState({
      about: e.target.value
    });
  };

  changestreet = e => {
    this.setState({
      street: e.target.value
    });
  };

  changecity = e => {
    this.setState({
      city: e.target.value
    });
  };

  changestate = e => {
    this.setState({
      state: e.target.value
    });
  };

  changecountry = e => {
    this.setState({
      country: e.target.value
    });
  };

  changework = e => {
    this.setState({
      work: e.target.value
    });
  };

  changeschool = e => {
    this.setState({
      school: e.target.value
    });
  };

  changehometown = e => {
    this.setState({
      hometown: e.target.value
    });
  };

  // changegender = e => {
  //   this.setState({
  //     gender: e.target.value
  //   });
  // };

  changeprimarycontact = e => {
    this.setState({
      primarycontact: e.target.value
    });
  };

  changesecondarycontact = e => {
    this.setState({
      secondarycontact: e.target.value
    });
  };

  // fileChangedHandler = e => {
  //   this.setState({ selectedFile: e.target.files[0] });
  // };

  // uploadHandler = () => {
  //   console.log(this.state.selectedFile);
  // };

  handleProfileUpdated = e => {
    let valid = Validate.update(this.state);
    if (valid === "") {
      var data = {
        username: this.userrname,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        mailid: this.state.mailid,
        about: this.state.about,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        work: this.state.work,
        school: this.state.school,
        hometown: this.state.hometown,
        // photo: this.state.selectedFile.name,
        // gender: this.state.gender,
        primarycontact: this.state.primarycontact,
        secondarycontact: this.state.secondarycontact
      };

      axios
        .post("http://localhost:3001/updatetraveller", data)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              ProfileUpdated: true
            });
          } else {
            this.setState({
              ProfileUpdated: false
            });
          }
        });
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
    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login" />;
    }
    if (this.state.ProfileUpdated) {
      redirect = <Redirect to="/TravDashboard" />;
    }
    return (
      <div>
        {redirect}
        <TravDashboard />
        <div align="center">
          <div className="row">{message}</div>
          <center>
            <img
              src={this.state.image}
              alt="Avatar"
              style={{ width: "200px", padding: "10px", borderRadius: "50%" }}
            />
          </center>
          <input
            type="file"
            name="selectedFile"
            id="file-input"
            onChange={this.onChangePhoto}
          />
          <h1>
            <b>{this.custmail}</b>
          </h1>
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
                    onChange={this.changefirstname}
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
                    onChange={this.changelastname}
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
                    id="mailid"
                    name="mailid"
                    type="text"
                    placeholder="Email address"
                    class="form-control input-md"
                    onChange={this.changemail}
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
                  onChange={this.changedescription}
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
                    onChange={this.changestreet}
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
                    onChange={this.changecity}
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
                    onChange={this.changestate}
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
                    onChange={this.changecountry}
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
                    onChange={this.changework}
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
                    onChange={this.changeschool}
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
                    onChange={this.changehometown}
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
                  value="1"
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
                <input type="radio" name="gender" id="Gender2" value="2" />{" "}
                {"   "}
                Female &nbsp;&nbsp;
                <i class="fa fa-female" style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label" />
              <div class="col-md-4">
                <input type="radio" name="gender" id="Gender3" value="3" />
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
                    onChange={this.changeprimarycontact}
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
                    onChange={this.changesecondarycontact}
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
                  onClick={this.handleProfileUpdated}
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

export default TravelerProfilebar;
