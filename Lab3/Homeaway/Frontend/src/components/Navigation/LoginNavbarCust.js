import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutCustomer } from "../../actions/AuthActions";

class LoginNavbarCust extends Component {
  isAuthenticated = false;
  user = "";

  constructor(props) {
    super(props);

    if (localStorage.getItem("travellerToken")) {
      let token = localStorage.getItem("travellerToken");
      this.isAuthenticated = true;

      this.decodedTraveller = jwt_decode(token);
      this.user = this.decodedTraveller;
      console.log(this.user);
      this.isLoggedIn = true;
    }
  }

  handleLogout = e => {
    e.preventDefault();
    //  this.props.logoutCustomer();

    localStorage.clear();
  };

  render() {
    const authLinks = (
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a className="dropdown-toggle" style={{ color: "black" }} href="#">
            <span class="glyphicon" /> TripBoards
          </a>
        </li>
        <li class="dropdown">
          <a className="dropdown-toggle" style={{ color: "black" }} href="#">
            {" Welcome, "}
            {this.user.username}
          </a>
          <ul class="dropdown-menu">
            <li style={{ fontSize: "20px", color: "black" }}>
              <Link to="/TravDashboard">
                <span class="glyphicon glyphicon-book" /> DashBoard
              </Link>
            </li>
            <li style={{ fontSize: "20px", color: "black" }}>
              <Link to="/customerInbox">
                <span class="glyphicon glyphicon-inbox" /> Inbox
              </Link>
            </li>
            <li style={{ fontSize: "20px", color: "black" }}>
              <Link to="/CreateProfile">
                <span class="glyphicon glyphicon-user" /> Profile
              </Link>
            </li>
          </ul>
        </li>
        <li style={{ fontSize: "20px", color: "black" }}>
          <a href="" onClick={this.handleLogout.bind(this)}>
            <span class="glyphicon glyphicon-log-out" /> LogOut
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a className="dropdown-toggle" href="#" style={{ color: "black" }}>
            <span class="glyphicon" /> TripBoards
          </a>
        </li>
        <li class="dropdown">
          <a className="dropdown-toggle" href="#" style={{ color: "black" }}>
            <span class="glyphicon glyphicon-user" /> Sign-up
          </a>
          <ul class="dropdown-menu">
            <li style={{ fontSize: "20px" }}>
              <Link to="/CustomerSignup">
                <span class="glyphicon glyphicon-user" /> Customer Sign-Up
              </Link>
            </li>
            <li style={{ fontSize: "20px" }}>
              <Link to="/OwnerSignup">
                <span class="glyphicon glyphicon-user" /> Owner Sign-Up
              </Link>
            </li>
          </ul>
        </li>
        <li class="dropdown">
          <a className="dropdown-toggle" href="#" style={{ color: "black" }}>
            Login <span class="glyphicon glyphicon-log-in" />
          </a>
          <ul class="dropdown-menu">
            <li style={{ fontSize: "20px" }}>
              <Link to="/CustomerLogin">
                <span class="glyphicon glyphicon-log-in" /> Customer Login
              </Link>
            </li>
            <li style={{ fontSize: "20px" }}>
              <Link to="/OwnerLogin">
                <span class="glyphicon glyphicon-log-in" /> Owner Login
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    );

    return (
      <div class="header-bce">
        <div class="navbar header">
          <div class="navbar-inner">
            <div class="pull-left">
              <Link to="/Home">
                <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
              </Link>
            </div>

            <div class="col-sm-9">
              {this.isAuthenticated ? authLinks : guestLinks}
            </div>

            <div class="header-bce-birdhouse-container">
              <div class="flip-container">
                <div class="flipper">
                  <div class="front btn-bce">
                    <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginNavbarCust.PropTypes = {
  logoutCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

/*export default connect(
  mapStateToProps,
  { logoutCustomer }
)(LoginNavbarCust);*/

export default LoginNavbarCust;
