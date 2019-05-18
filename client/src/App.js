import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Layouts/Navbar";
import { Provider } from "react-redux";

import Footer from "./components/Layouts/Footer";
import RouNavbar from "./Routes/RouNavbar";
import configStore from "./store/index";
import checkLogin from "./validator/checkLogin";

const store = configStore();
checkLogin(store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <RouNavbar />
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
