import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Landing from "../components/Layouts/Landing";

export default class RouNavbar extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/landing" exact component={Landing} />
      </Fragment>
    );
  }
}
