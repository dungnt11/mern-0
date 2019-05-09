import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import RouNavbar from "./Routes/RouNavbar";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <div className="App">
            <Navbar />
            <RouNavbar />
            <Footer />
          </div>
        </Router>
      </Fragment>
    );
  }
}
