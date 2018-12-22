import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import PropListPhoto from "./components/OwnerDash/PropListPhoto";
import PropertyDetails from "./components/PropertySearch/PropertyDetails";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
