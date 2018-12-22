import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
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
          </div>
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
    );
  }
}

export default Navbar;
