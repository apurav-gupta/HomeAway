import React, { Component } from "react";
import Dashboard from "./Dashboard";
import ReactTable from "react-table";
import "react-table/react-table.css";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class OwnerProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyList: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/getownerproperties", {
        params: {
          ID: 1
        }
      })
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            propertyList: response.data
          });
        } else {
          this.setState({});
        }
      });
  }

  render() {
    const data = this.state.propertyList;

    const columnss = [
      {
        Header: "PropertyID",
        accessor: "id" // String-based value accessors!
      },
      {
        Header: "Address",
        accessor: "location",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      }
    ];

    return (
      <ReactTable
        data={data}
        columns={columnss}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              console.log("A Td Element was clicked!");
              console.log("it produced this event:", e);
              console.log("It was in this column:", column);
              console.log("It was in this row:", rowInfo);
              console.log("It was in this table instance:", instance);
              if (handleOriginal) {
                handleOriginal();
              }
            }
          };
        }}
      />
    );
  }
}

export default OwnerProperties;
