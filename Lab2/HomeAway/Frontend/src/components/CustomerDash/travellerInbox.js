import React, { Component } from "react";
import TravDashboard from "./TravDashboard";

// REDUX functionality
import { connect } from "react-redux";
import { travellerBookings } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class travellerInbox extends Component {
  constructor(props) {
    super(props);
  }

  //   componentDidMount() {
  //     var data = {
  //       travellermail: this.props.auth.user.email
  //     };
  //     this.props.travellerBookings(data);
  //   }

  render() {
    return (
      <div>
        <TravDashboard />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps)(withRouter(travellerInbox));
