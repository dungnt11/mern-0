import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./App.css";

import Navbar from "./components/Layouts/Navbar";
import { Provider } from "react-redux";

import Footer from "./components/Layouts/Footer";
import RouNavbar from "./Routes/RouNavbar";
import configStore from "./store/index";
import setAutherToken from "./apis/setHeader.api";
import { successAuth } from "./actions";

const store = configStore();

// check jwt-token in localStorange
if (localStorage.jwtToken) {
  // set token in each request axios
  setAutherToken(localStorage.jwtToken);
  // decode
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(successAuth(decoded));
  // check thoi gian
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(successAuth({}));
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}

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
