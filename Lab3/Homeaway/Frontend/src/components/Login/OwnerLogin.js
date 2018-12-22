import React, { Component } from "react";
import Navbar from "../Navigation/Navbar";
import * as Validate from "../Validations/datavalidation";
import { ownerLogin, travelerLogin } from "../../queries/queries";
// REDUX functionality
import { connect } from "react-redux";
import { loginOwner } from "../../actions/AuthActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import withApollo from "react-apollo/withApollo";

class OwnerLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      messagediv: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.ownerLoginSubmit = this.ownerLoginSubmit.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  /* componentWillMount() {
    this.setState({
      authFlag: false
    });
  }*/
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
  ownerLoginSubmit = e => {
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
      //make a post request with the user data
      this.props.loginOwner(data, this.props.history);
    } else {
      this.setState({
        ...this.state,
        messagediv: valid
      });
      e.preventDefault();
    }
  };

  doGraphLogin = e => {
    // var headers = new Headers();
    e.preventDefault();
    this.props.client
      .query({
        query: ownerLogin,
        variables: {
          // genre: "4",
          username: this.state.username,
          password: this.state.password
        }
        // ,refetchQueries: [{ query: getBooksQuery }]
      })
      .then(response => {
        console.log(response);
        if (response.data.ownerLogin.status === 200) {
          localStorage.setItem("ownerToken", response.data.ownerLogin.token);
          this.props.history.push("/Dashboard");
        } else if (response.data.ownerLogin.status === 400) {
          alert("Owner Doesn't exist, please sign up before logging in !!");
          // this.props.history.push('/home');
        } else if (response.data.ownerLogin.status === 404) {
          alert("Password Incorrect !! Please enter the correct password");
        }
      });
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
                <b>Owner Login</b>
              </h1>
              <h2>
                <b>Log in to HomeAway</b>
              </h2>
            </div>

            <div className="footer text-footer text-center traveler">
              {/* <!-- Need to catch possible exceptions for when the properties don't exist --> */}
              <div className="">
                <span>Need an account?</span>
                <Link to="/OwnerSignup">Sign Up</Link>
              </div>
            </div>
            <div className="panel-body">
              <div className="ui-widget" />
              <fieldset>
                <div
                  className="has-feedback form-group floating-label"
                  data-toggle="label"
                >
                  <label For="username" className="hidden">
                    Email
                  </label>
                  <input
                    id="username"
                    name="username"
                    className="form-control input-lg"
                    tabindex="1"
                    onChange={this.changeUserName}
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
                    className="form-control input-lg"
                    onChange={this.changePassword}
                    tabindex="2"
                    placeholder="Password"
                    type="password"
                    size="20"
                    autocomplete="off"
                  />
                </div>
                <div className="form-group">
                  <span id="urlForgotPassword" style={{ display: "none" }}>
                    /forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fhaod%2Fauth%2Fsignin.html
                  </span>
                  <a
                    href="https://cas.homeaway.com/auth/homeaway/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fhaod%2Fauth%2Fsignin.html"
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
                    onClick={this.doGraphLogin.bind(this)}
                  >
                    Log Me In
                  </button>
                  <div className="remember checkbox">
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
                <input
                  type="hidden"
                  name="flowKey"
                  value="ee393b345a13e47789021c307a2c064a9s1"
                />
                <input
                  id="dp"
                  name="devicePrint"
                  type="hidden"
                  value="version=1&amp;pm_fpua=mozilla/5.0 (macintosh; intel mac os x 10_13_6) applewebkit/537.36 (khtml, like gecko) chrome/69.0.3497.92 safari/537.36|5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36|MacIntel&amp;pm_fpsc=24|1440|900|793&amp;pm_fpsw=&amp;pm_fptz=-8&amp;pm_fpln=lang=en-US|syslang=|userlang=&amp;pm_fpjv=0&amp;pm_fpco=1"
                />
                <input type="hidden" name="_eventId" value="submit" />
                <input
                  type="hidden"
                  name="deviceIdKey"
                  id="device-id-key"
                  value="3c558b8e-4b04-4da0-a3b2-f2ad4c5baa3a"
                />
              </fieldset>
              <input type="hidden" name="locale" value="en_US" />
            </div>
            <div className="panel-footer">
              <div className="footer text-footer text-center">
                <div>
                  <span>Want to list your property?</span>
                  <a
                    href="https://www.homeaway.com/order/benefits"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OwnerLogin.propTypes = {
  loginOwner: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, //auth coming from index.js in Reducers if we change
  //auth there to user here also we have to write user
  errors: state.errors
});

/*export default connect(
  mapStateToProps,
  { loginOwner }
)(withRouter(OwnerLogin));*/

export default withApollo(
  // graphql(getUserQuery, { name: "getUserQuery" })
  OwnerLogin
);
