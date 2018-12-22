import React, { Component } from "react";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import * as Validate from "../Validations/datavalidation";

import { connect } from "react-redux";
import { signUpOwner } from "../../actions/AuthActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//import cookie from "react-cookies";

class OwnerSignup extends Component {
  constructor(props) {
    super(props);
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.handleOwnerAdded = this.handleOwnerAdded.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phonenumber: "",
      messagediv: "",
      // ownerSignedUp: "",
      OwnerAdded: false
    };
  }

  changeFirstName = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  changeLastName = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  changeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  changePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  changeNumber = e => {
    this.setState({
      phonenumber: e.target.value
    });
  };

  handleOwnerAdded = e => {
    let valid = Validate.ownSignup(this.state);
    if (valid === "") {
      var data = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        phonenumber: this.state.phonenumber
      };
      this.props.signUpOwner(data, this.props.history);
      // this.setState({
      //   ...this.state,
      //   ownerSignedUp: true
      // });
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
    // let res = null;
    // if (this.state.ownerSignedUp === true) {
    //   res = <Redirect to="/OwnerLogin" />;
    // }
    return (
      <div>
        {/* {res} */}
        <Navbar />
        <div id="login-container" style={{ height: "400px" }}>
          <div className="row">{message}</div>
          <div className="col-md-4 col-sm-4 hidden-xs" />
          <div id="formContainer" className="col-lg-4 col-xs-12">
            <div align="center">
              <i
                class="fa fa-home"
                style={{ fontSize: "50px", position: "inherit" }}
              />
              <h1>
                <b>Owner Sign Up</b>
              </h1>
              <h2>
                <b>Sign up to HomeAway</b>
              </h2>
            </div>
            <div className="footer-top traveler" />
            <div className="footer traveler" Align="center">
              <div>
                <span>Already have an account?</span>
                <Link to="/OwnerLogin">Log in</Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div className="panel panel-dashboard">
              <div className="login-wrapper">
                <div className="login-form traveler">
                  <fieldset
                    id="login-form-fieldset"
                    className="travelerFieldSet"
                  >
                    <div className="panel-body">
                      <div id="createAccountFields" className="">
                        <div id="messages" />
                        <div className="form-group clearfix">
                          <div className="name name-registration traveler">
                            <label for="firstname" className="hidden">
                              First name
                              <i class="fa fa-user" />
                            </label>
                            <input
                              id="firstname"
                              onChange={this.changeFirstName}
                              name="firstname"
                              className="form-control input-lg"
                              tabindex="1"
                              placeholder="First Name"
                              type="text"
                              size="20"
                              autocomplete="on"
                            />
                          </div>
                          <div
                            className="name name-registration traveler"
                            style={{ marginRight: "0px" }}
                          >
                            <label for="lastname" className="hidden">
                              Last Name
                            </label>
                            <input
                              id="lastname"
                              onChange={this.changeLastName}
                              name="lastname"
                              className="form-control input-lg"
                              tabindex="2"
                              placeholder="Last Name"
                              type="text"
                              size="20"
                              autocomplete="on"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="emailAddress" className="hidden">
                            Email Address
                          </label>
                          <input
                            id="emailAddress"
                            onChange={this.changeEmail}
                            name="email"
                            className="form-control input-lg"
                            tabindex="3"
                            placeholder="Email address"
                            type="email"
                            size="20"
                            autocomplete="on"
                          />
                        </div>
                        <div className="form-group">
                          <label for="password" className="hidden">
                            Password
                          </label>
                          <input
                            id="password"
                            onChange={this.changePassword}
                            name="password"
                            className="form-control input-lg"
                            tabindex="4"
                            placeholder="Password"
                            type="password"
                            size="20"
                            autocomplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <label for="phonenumber" className="hidden">
                            Phone Number
                          </label>
                          <input
                            id="phonenumber"
                            onChange={this.changeNumber}
                            name="phonenumber"
                            className="form-control input-lg"
                            tabindex="5"
                            placeholder="Phone-number"
                            type="text"
                            size="10"
                            autocomplete="on"
                          />
                        </div>
                        <button
                          tabindex="6"
                          type="submit"
                          className="btn btn-primary btn-lg btn-block btn-cas-primary"
                          id="form-submit"
                          onClick={this.handleOwnerAdded}
                        >
                          Sign Me Up
                        </button>
                      </div>
                      <div className="centered-hr text-center">
                        <span className="text-center">
                          <em>or</em>
                        </span>
                      </div>
                      <div className="facebook">
                        <button
                          tabindex="7"
                          className="third-party-login-button fb-button traveler"
                        >
                          <div className="login-button-text">
                            <span className="logo">
                              <i
                                className="icon-facebook icon-white pull-left"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="text text-center pull-right">
                              Log in with Facebook
                            </span>
                          </div>
                        </button>
                      </div>
                      <div className="google">
                        <button
                          tabindex="8"
                          className="third-party-login-button google-button"
                        >
                          <div className="login-button-text">
                            <span className="logo-google">
                              <img
                                className="icon-google pull-left"
                                src={
                                  "//csvcus.homeaway.com/rsrcs/cdn-logos/2.3.2/third-party/google/google-color-g.svg"
                                }
                                alt="googlelogo"
                              />
                            </span>
                            <span className="text text-center pull-right">
                              Log in with Google
                            </span>
                          </div>
                        </button>
                      </div>
                      <p id="fb-p" className="facebook text-center traveler">
                        <small>
                          We don't post anything without your permission.
                        </small>
                      </p>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OwnerSignup.propTypes = {
  signUpOwner: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, //auth coming from index.js in Reducers if we change
  //auth there to user here also we have to write user
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signUpOwner }
)(withRouter(OwnerSignup));
