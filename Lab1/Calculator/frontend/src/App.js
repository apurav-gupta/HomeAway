import React, { Component } from "react";
import update from "immutability-helper";
import "./App.css";
import axios from "axios";
//import querystring from "querystring";

class Display extends Component {
  render() {
    if (Array.isArray(this.props.data)) {
      const string = this.props.data.join("");
      return <div className="Display"> {string} </div>;
    } else {
      return <div className="Display">{this.props.data}</div>;
    }
  }
}

class Buttons extends Component {
  render() {
    return <div className="Buttons"> {this.props.children} </div>;
  }
}

class Button extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className="Button"
        data-size={this.props.size}
        data-value={this.props.value}
      >
        {this.props.label}
      </div>
    );
  }
}

class Butn extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className="Butn"
        data-size={this.props.size}
        data-value={this.props.value}
      >
        {this.props.label}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      operations: []
    };
  }

  clearInputHandler = event => {
    let originalInput = this.state.operations.join();
    let finalInput = originalInput.substring(0, originalInput.length - 1);
    let finalInputArr = finalInput.split(",");
    this.setState({
      ...this.state,
      operations: finalInputArr
    });
  };

  handleClear = e => {
    this.setState({
      operations: []
    });
  };

  handleClick = e => {
    const value = e.target.getAttribute("data-value");
    console.log("state", this.state.operations);
    switch (value) {
      case "equal":
        // this.calculate();
        axios
          .get(
            // "http://localhost:3001/app?operations=" +
            //   this.state.operations.join("")
            "http://localhost:3001/app",
            { params: { operations: this.state.operations.join("") } }
          )
          .then(res => {
            console.log("status", res.status, "\n data:", res.data.result);
            if (res.status === 200) {
              this.setState({
                operations: [res.data.result]
              });
            } else {
              this.setState({
                operations: "Some error occured"
              });
            }
          })
          .catch(err => {
            console.log("error:", err);
          });
        break;
      default:
        const newOperations = update(this.state.operations, {
          $push: [value]
        });
        this.setState({
          operations: newOperations
        });
        break;
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Basic Calculator Application</h1>
        <div className="App">
          <Display data={this.state.operations} />
          <br />
          <Buttons>
            <Butn onClick={this.handleClear} label="AC" value="clear" />
            <Button onClick={this.handleClick} label="7" value="7" />
            <Button onClick={this.handleClick} label="4" value="4" />
            <Button onClick={this.handleClick} label="1" value="1" />
            <Button onClick={this.handleClick} label="0" value="0" />

            <Butn onClick={this.handleClick} label="/" value="/" />
            <Button onClick={this.handleClick} label="8" value="8" />
            <Button onClick={this.handleClick} label="5" value="5" />
            <Button onClick={this.handleClick} label="2" value="2" />
            <Button onClick={this.handleClick} label="." value="." />

            <Butn onClick={this.handleClick} label="x" value="*" />
            <Button onClick={this.handleClick} label="9" value="9" />
            <Button onClick={this.handleClick} label="6" value="6" />
            <Button onClick={this.handleClick} label="3" value="3" />
            <Button
              onClick={this.clearInputHandler}
              label="Clear"
              value="Clear"
            />

            <Butn onClick={this.handleClick} label="-" value="-" />
            <Butn onClick={this.handleClick} label="+" size="2" value="+" />
            <Butn onClick={this.handleClick} label="=" size="2" value="equal" />
          </Buttons>
        </div>
      </div>
    );
  }
}

export default App;
