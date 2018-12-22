import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import LoginNavbarOwner from "../Navigation/LoginNavbarOwner";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <LoginNavbarOwner />
        <div class="content-panel-container">
          <div class="panel panel-default">
            <div class="btn-group btn-group-justified">
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{ fontSize: "20px", height: "60px" }}
                >
                  <Link to="/Dashboard">Dashboard</Link>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{ fontSize: "20px", height: "60px" }}
                >
                  <Link to="/PropDisplay">Display Properties</Link>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{ fontSize: "20px", height: "60px" }}
                >
                  <Link to="/PropBooked"> My Properties Bookings</Link>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{
                    fontSize: "20px",
                    height: "60px"
                  }}
                >
                  <Link to="/PropertyList">List a Property</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
