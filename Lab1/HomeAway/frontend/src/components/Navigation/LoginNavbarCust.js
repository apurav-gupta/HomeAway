import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Toggle from "react-toggle-display";

class LoginNavbarCust extends Component {
  logIn = false;
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    if (cookie.load("cookie")) {
      this.logIn = true;
    }
  }

  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };

  render() {
    return (
      <div class="header-bce">
        <div class="navbar header">
          <div class="navbar-inner">
            <div class="pull-left">
              <Link to="/Home">
                <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
              </Link>
            </div>
            <Toggle show={!this.logIn}>
              <div class="col-sm-9">
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <a
                      className="dropdown-toggle"
                      href="#"
                      style={{ color: "#0000CD" }}
                    >
                      <span class="glyphicon" /> TripBoards
                    </a>
                  </li>
                  <li class="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      style={{ color: "#0000CD" }}
                    >
                      <span class="glyphicon glyphicon-user" /> Sign-up
                    </a>
                    <ul class="dropdown-menu">
                      <li style={{ fontSize: "20px" }}>
                        <Link to="/CustomerSignup">
                          <span class="glyphicon glyphicon-user" /> Customer
                          Sign-Up
                        </Link>
                      </li>
                      <li style={{ fontSize: "20px" }}>
                        <Link to="/OwnerSignup">
                          <span class="glyphicon glyphicon-user" /> Owner
                          Sign-Up
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      style={{ color: "#0000CD" }}
                    >
                      Login <span class="glyphicon glyphicon-log-in" />
                    </a>
                    <ul class="dropdown-menu">
                      <li style={{ fontSize: "20px" }}>
                        <Link to="/CustomerLogin">
                          <span class="glyphicon glyphicon-log-in" /> Customer
                          Login
                        </Link>
                      </li>
                      <li style={{ fontSize: "20px" }}>
                        <Link to="/OwnerLogin">
                          <span class="glyphicon glyphicon-log-in" /> Owner
                          Login
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </Toggle>
            <Toggle show={this.logIn}>
              <div class="col-sm-9">
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <a
                      className="dropdown-toggle"
                      style={{ color: "#4682B4" }}
                      href="#"
                    >
                      <span class="glyphicon" /> TripBoards
                    </a>
                  </li>
                  <li class="dropdown">
                    <a
                      className="dropdown-toggle"
                      style={{ color: "#4682B4" }}
                      href="#"
                    >
                      <span class="glyphicon glyphicon-user" />
                      {sessionStorage.getItem("custmail")}
                    </a>
                    <ul class="dropdown-menu">
                      <li style={{ fontSize: "20px", color: "#483D8B" }}>
                        <Link to="/TravDashboard">
                          <span class="glyphicon glyphicon-book" /> DashBoard
                        </Link>
                      </li>
                      <li style={{ fontSize: "20px", color: "#483D8B" }}>
                        <Link to="">
                          <span class="glyphicon glyphicon-inbox" /> Inbox
                        </Link>
                      </li>
                      <li style={{ fontSize: "20px", color: "#483D8B" }}>
                        <Link to="/TravelerProfilebar">
                          <span class="glyphicon glyphicon-user" /> Profile
                        </Link>
                      </li>
                      <li style={{ fontSize: "20px", color: "#483D8B" }}>
                        <Link to="/" onClick={this.handleLogout}>
                          <span class="glyphicon glyphicon-log-out" /> LogOut
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </Toggle>
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

export default LoginNavbarCust;
