import React, { Component } from "react";
import Properties from "./Properties";
import Dashboard from "./Dashboard";
import axios from "axios";

class PropDisplay extends Component {
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

    axios.post("http://localhost:3001/PropertyDisplay", data).then(response => {
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
            <Properties
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
export default PropDisplay;
