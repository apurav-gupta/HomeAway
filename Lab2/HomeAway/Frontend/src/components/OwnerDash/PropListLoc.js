import React, { Component } from "react";
import * as Validate from "../Validations/datavalidation";

class PropListLoc extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      proploc: ""
    };
  }

  submitHandler = e => {
    let valid = Validate.listloc(this.state);
    if (valid === "") {
      e.preventDefault();
      this.props.handlerParentforloc(this.state.proploc);

      this.setState({
        proploc: ""
      });
    } else {
      this.setState({
        ...this.state,
        messagediv: valid
      });
      e.preventDefault();
    }
  };

  handleChange = e => {
    this.setState({
      proploc: e.target.value
    });
  };

  render() {
    let message = null;
    if (this.state.messagediv !== "") {
      message = (
        <div className="clearfix">
          <div className="alert-danger text-center" role="alert">
            {this.state.messagediv}
          </div>
        </div>
      );
    } else {
      message = <div />;
    }
    return (
      <div>
        <br />

        <div class="panel panel-default" style={{ width: "800px" }}>
          <div className="row">{message}</div>
          <div class="panel-heading" style={{ fontSize: "25px" }}>
            {"     "}
            <b>Property location</b>
          </div>
          <div class="panel-body">
            <textarea
              id="proploc"
              type="text"
              value={this.state.proploc}
              name="proploc"
              onChange={this.handleChange}
              placeholder="Enter your property location"
              class="form-control input-md"
              style={{ fontSize: "20px" }}
              required
            />

            <br />
            <hr />
            <label class="col-md-4 control-label" />
            <div class="col-md-4">
              <button
                type="submit"
                class="btn btn-success"
                value="Save"
                onClick={this.submitHandler}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropListLoc;
