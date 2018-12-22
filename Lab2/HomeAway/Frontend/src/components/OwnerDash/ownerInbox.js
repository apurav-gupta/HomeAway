import React, { Component } from "react";

// REDUX functionality
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { receiveOwnerMessage } from "../../actions/messageAction";
import Inbox from "./ownInbox";
import { Redirect } from "react-router";

class ownerInbox extends Component {
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

  redirectDetails = (customer_mail, prop_id) => {
    sessionStorage.setItem("mail", customer_mail);
    sessionStorage.setItem("_id", prop_id);
    this.setState({
      ...this.state,
      isClicked: true
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    console.log(this.props.auth.user.email);
    const data = {
      email: this.props.auth.user.email
    };
    this.props.receiveOwnerMessage(data.email);
  }

  render() {
    console.log(this.props.messages.owner_messages);
    const { length: count } = this.props.messages.owner_messages;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const ownerMessage = paginate(
      this.props.messages.owner_messages,
      currentPage,
      pageSize
    );

    if (this.state.isClicked) {
      return <Redirect to="/ownerReply" />;
    }
    return (
      <div>
        <Dashboard />
        <p>
          {" "}
          Showing {count} messages in the database for you,{" "}
          {this.props.auth.user.firstname}:{" "}
        </p>
        {ownerMessage.map((propval, place) => (
          <div className="ml-5 mt-2">
            <Inbox
              property_id={propval.property_id}
              traveller_message={propval.traveller_message}
              property_name={propval.property_name}
              customer_mail={propval.customer_mail}
              onClick={() =>
                this.redirectDetails(propval.customer_mail, propval.property_id)
              }
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

ownerInbox.propTypes = {
  receiveOwnerMessage: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { receiveOwnerMessage }
)(withRouter(ownerInbox));
