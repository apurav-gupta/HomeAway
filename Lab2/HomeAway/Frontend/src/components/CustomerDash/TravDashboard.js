import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginNavbarCust from "../Navigation/LoginNavbarCust";

class TravDashboard extends Component {
  render() {
    return (
      <div>
        <LoginNavbarCust />
        <div class="content-panel-container">
          <div class="panel panel-default">
            <div class="btn-group btn-group-justified">
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{ fontSize: "20px", height: "60px" }}
                >
                  <Link to="/TravDashboard">Dashboard</Link>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{ fontSize: "20px", height: "60px" }}
                >
                  <Link to="/customerInbox">Inbox </Link>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{ fontSize: "20px", height: "60px" }}
                >
                  <Link to="/BookedProp">My Bookings </Link>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-default"
                  style={{ fontSize: "20px", height: "60px" }}
                >
                  <Link to="/CreateProfile"> Update profile </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TravDashboard;
