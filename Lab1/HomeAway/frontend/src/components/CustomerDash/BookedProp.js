import React, { Component } from "react";
import axios from "axios";
import BookedPropCard from "./BookedPropCard";
import TravDashboard from "./TravDashboard";

class BookedProp extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      authflag: false
    };
  }

  componentDidMount() {
    var data = {
      mail: sessionStorage.getItem("custmail")
    };

    axios.post("http://localhost:3001/MyBookings", data).then(response => {
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
        <TravDashboard />
        {this.lookprop.map((propval, place) => (
          <div className="ml-5 mt-2">
            <BookedPropCard
              propertyid={propval.propertyid}
              location={propval.location}
              headline={propval.headline}
              arrive_date={propval.arrival_date}
              depart_date={propval.depart_date}
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
export default BookedProp;
