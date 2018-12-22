import React, { Component } from "react";
import Navbar from "../Navigation/Navbar";
import { Link } from "react-router-dom";
import * as Validate from "../Validations/datavalidation";

import { connect } from "react-redux";
import { loginCustomer } from "../../actions/AuthActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";

class CustomerLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      messagediv: ""
    };
    //Bind the handlers to this class
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.customerLoginSubmit = this.customerLoginSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }

  //username change handler to update state variable with the text entered by the user
  changeUserName = e => {
    this.setState({
      username: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  changePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  customerLoginSubmit = e => {
    let valid = Validate.login(this.state);
    if (valid === "") {
      var headers = new Headers();
      //prevent page from refresh
      e.preventDefault();
      const data = {
        username: this.state.username,
        password: this.state.password
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      this.props.loginCustomer(data, this.props.history);
      //make a post request with the user data
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
    return (
      <div>
        <Navbar />
        <div id="login-container">
          <div className="row">{message}</div>

          <div className="col-md-4 col-sm-4" />
          <div id="formContainer" className="col-lg-4 col-xs-6">
            <div align="center">
              <i
                class="fa fa-user"
                style={{ fontSize: "50px", position: "inherit" }}
              />
              <h1 className="customerHead">
                <b>Backpacker Login</b>
              </h1>
              <h2>
                <b>Log in to HomeAway</b>
              </h2>
            </div>

            <div className="footer text-footer text-center traveler">
              {/* <!-- Need to catch possible exceptions for when the properties don't exist --> */}
              <div className="">
                <span>Need an account?</span>
                <Link to="/CustomerSignup">Sign Up</Link>
              </div>
            </div>
            <div className="panel-body">
              <fieldset id="login-form-fieldset" className="travelerFieldSet">
                <div className="field-group traveler">
                  <fieldset>
                    <div className="ui-widget" />
                    <div
                      className="has-feedback form-group floating-label"
                      data-toggle="label"
                    >
                      <label for="username" className="hidden">
                        Email
                      </label>
                      <input
                        id="username"
                        name="username"
                        onChange={this.changeUserName}
                        className="form-control input-lg"
                        tabindex="1"
                        placeholder="Email address"
                        type="email"
                        size="20"
                        autocomplete="on"
                      />
                    </div>
                    <div
                      className="has-feedback form-group floating-label"
                      data-toggle="label"
                    >
                      <label for="password" className="hidden">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        onChange={this.changePassword}
                        className="form-control input-lg"
                        tabindex="2"
                        placeholder="Password"
                        type="password"
                        size="20"
                        autocomplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <span id="urlForgotPassword" style={{ display: "none" }}>
                        /forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F
                      </span>
                      <a
                        href="https://cas.homeaway.com/auth/traveler/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F"
                        id="forgotPasswordUrl"
                        className="forgot-password"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="form-group">
                      <button
                        tabindex="6"
                        type="submit"
                        className="btn btn-primary btn-lg btn-block btn-cas-primary"
                        id="form-submit"
                        onClick={this.customerLoginSubmit}
                      >
                        Log Me In
                      </button>
                      <div className="remember checkbox traveler">
                        <label for="rememberMe">
                          <input
                            id="rememberMe"
                            name="rememberMe"
                            tabindex="3"
                            type="checkbox"
                            value="true"
                          />
                          <input type="hidden" name="_rememberMe" value="on" />
                          Keep me signed in
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <input type="hidden" name="locale" value="en_US" />
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
                            className=" icon-facebook icon-white pull-left fa fa-facebook"
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
    );
  }
}

CustomerLogin.propTypes = {
  loginCustomer: PropTypes.func.isRequired,
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
  { loginCustomer }
)(withRouter(CustomerLogin));
