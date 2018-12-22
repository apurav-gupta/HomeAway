import React, { Component } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import PropBook from "./PropBook";

class PropBooked extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      authflag: false
    };
  }

  componentDidMount() {
    var data = {
      mail: sessionStorage.getItem("ownmail")
    };

    axios.post("http://localhost:3001/HouseBooked", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.lookprop = response.data;
        this.setState({
          ...this.state,
          authflag: true
        });
      } else {
        this.setState({
          ...this.state,
          authflag: false
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Dashboard />
        {this.lookprop.map((propval, place) => (
          <div className="ml-5 mt-2">
            <PropBook
              propertyid={propval.propertyid}
              location={propval.location}
              headline={propval.headline}
              description={propval.description}
              property_type={propval.property_type}
              bedrooms={propval.bedrooms}
              bathrooms={propval.bathrooms}
              accomodates={propval.accomodates}
              currtype={propval.currtype}
              dailyrate={propval.dailyrate}
            />
          </div>
        ))}
      </div>
    );
  }
}
export default PropBooked;
