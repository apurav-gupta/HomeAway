import React, { Component } from "react";
import { Route } from "react-router-dom";
import CustomerSignup from "./Sign Up/CustomerSignup";
import CustomerLogin from "./Login/CustomerLogin";
import TravDashboard from "./CustomerDash/TravDashboard";
import TravelerProfilebar from "./CustomerDash/TravelerProfilebar";

import OwnerSignup from "./Sign Up/OwnerSignup";
import OwnerLogin from "./Login/OwnerLogin";
import Dashboard from "./OwnerDash/Dashboard";
import PropertyList from "./OwnerDash/PropertyList";
import PropDisplay from "./OwnerDash/PropDisplay";

import CardSearch from "./PropertySearch/CardSearch";
import propDetailShow from "./PropertySearch/PropertyDetails";

import Home from "./Home/Home";
import { Redirect } from "react-router";
import PropBooked from "./OwnerDash/PropBooked";
import BookedProp from "./CustomerDash/BookedProp";

class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={Home} />
        <Route path="/Home" component={Home} />
        <Route path="/CustomerLogin" component={CustomerLogin} />
        <Route path="/OwnerLogin" component={OwnerLogin} />
        <Route path="/CustomerSignup" component={CustomerSignup} />
        <Route path="/OwnerSignup" component={OwnerSignup} />
        <Route path="/PropertyList" component={PropertyList} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/TravDashboard" component={TravDashboard} />
        <Route path="/TravelerProfilebar" component={TravelerProfilebar} />
        <Route path="/CardSearch" component={CardSearch} />
        <Route path="/propDetailShow" component={propDetailShow} />
        <Route path="/PropDisplay" component={PropDisplay} />
        <Route path="/PropBooked" component={PropBooked} />
        <Route path="/BookedProp" component={BookedProp} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
