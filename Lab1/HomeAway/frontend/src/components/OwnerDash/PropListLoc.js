import React, { Component } from "react";
import axios from "axios";

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
    e.preventDefault();
    this.props.handlerParentforloc(this.state.proploc);

    this.setState({
      proploc: ""
    });
  };

  handleChange = e => {
    this.setState({
      proploc: e.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <div class="panel panel-default" style={{ width: "1000px" }}>
          <div class="panel-heading" style={{ fontSize: "30px" }}>
            <i class="fa fa-map-marker" style={{ fontSize: "30px" }} />
            {"     "}
            Property location
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
              style={{ fontSize: "25px" }}
            />
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" />
          <div class="col-md-4">
            <button
              type="submit"
              class="btn btn-success"
              value="Save"
              onClick={this.submitHandler}
            >
              <span class="glyphicon glyphicon-thumbs-up" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PropListLoc;
