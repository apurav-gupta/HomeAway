import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router";

// // REDUX functionality
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { sendOwnerMessage } from "../../actions/messageAction";

class ownerReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      isClicked: false
    };
    this.changeReply = this.changeReply.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }

  changeReply = e => {
    this.setState({
      reply: e.target.value
    });
  };

  redirectDetails = () => {
    this.setState({
      ...this.state,
      isClicked: true
    });
  };

  handleReply = () => {
    console.log(sessionStorage.getItem("mail"));
    console.log(sessionStorage.getItem("_id"));
    console.log(this.state.reply);
    var data = {
      customer_mail: sessionStorage.getItem("mail"),
      prop_id: sessionStorage.getItem("_id"),
      reply: this.state.reply
    };
    this.props.sendOwnerMessage(data);
    alert("You have successfully send your reply to the traveller");
    this.props.history.push("/ownerInbox");
  };

  render() {
    if (this.state.isClicked) {
      return <Redirect to="/ownerInbox" />;
    }
    return (
      <div>
        <Dashboard />

        <button
          class="btn btn-primary btn-lg "
          type="button"
          onClick={() => this.redirectDetails()}
        >
          Back to Inbox
        </button>
        <div class="container">
          <div>
            <br />
            <br />
            <br />
            <br />
            <div class="panel panel-info" style={{ width: "700px" }}>
              <div class="panel-heading" style={{ height: "70px" }}>
                <h3>Reply to: {sessionStorage.getItem("mail")}</h3>
              </div>
              <div class="panel-body">
                <input
                  class="form-control"
                  type="text"
                  name="reply"
                  onChange={this.changeReply}
                  id="reply"
                  value={this.state.reply}
                />

                <br />

                <button
                  class="btn btn-primary btn-lg "
                  type="button"
                  onClick={this.handleReply}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ownerReply.propTypes = {
  sendOwnerMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { sendOwnerMessage }
)(withRouter(ownerReply));
