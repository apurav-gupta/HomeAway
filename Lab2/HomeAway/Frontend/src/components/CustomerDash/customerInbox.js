import React, { Component } from "react";

// REDUX functionality
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TravDashboard from "./TravDashboard";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { receiveCustomerMessage } from "../../actions/messageAction";
import Inbox from "./custInbox";
import { Redirect } from "react-router";

class customerInbox extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 5,
      messages: [],
      authflag: false,
      redirect: false,
      isClicked: false
    };
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    console.log(this.props.auth.user.email);
    const data = {
      email: this.props.auth.user.email
    };
    this.props.receiveCustomerMessage(data.email);
  }

  render() {
    console.log(this.props.messages.customer_message);
    const { length: count } = this.props.messages.customer_message;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const customerMessage = paginate(
      this.props.messages.customer_message,
      currentPage,
      pageSize
    );

    return (
      <div>
        <TravDashboard />
        <p>
          {" "}
          Showing {count} messages in the database for you,{" "}
          {this.props.auth.user.firstname}:{" "}
        </p>
        {customerMessage.map((propval, place) => (
          <div className="ml-5 mt-2">
            <Inbox
              property_id={propval.property_id}
              traveller_message={propval.traveller_message}
              owner_message={propval.owner_message}
              property_name={propval.property_name}
              owner_mail={propval.owner_mail}
            />
          </div>
        ))}
        <Pagination
          itemsCount={count}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

customerInbox.propTypes = {
  receiveCustomerMessage: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { receiveCustomerMessage }
)(withRouter(customerInbox));
