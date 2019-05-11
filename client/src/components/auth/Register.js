import React, { Component, Fragment } from "react";
import axios from "axios";
import classNames from "classnames";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      pwd: "",
      pwd1: "",
      err: {}
    };
  }
  // follow change data in state and re-setstate
  watchChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // prevent Default and post with axios
  sendSubmit = event => {
    event.preventDefault();
    let newUser = {
      name: this.state.name,
      email: this.state.email,
      pwd: this.state.pwd,
      pwd1: this.state.pwd1
    };
    axios
      .post("/api/user/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => {
        this.setState({ err: err.response.data });
      });
  };
  render() {
    let { err } = this.state;
    return (
      <Fragment>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form onSubmit={this.sendSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classNames("form-control form-control-lg", {
                        "is-invalid": err.name
                      })}
                      placeholder="Name"
                      name="name"
                      required
                      value={this.state.name}
                      onChange={this.watchChange}
                    />
                    {err.name && (
                      <div className="invalid-feedback">{err.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classNames("form-control form-control-lg", {
                        "is-invalid": err.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.watchChange}
                    />
                    {err.email && (
                      <div className="invalid-feedback">{err.email}</div>
                    )}
                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      name="pwd"
                      value={this.state.pwd}
                      onChange={this.watchChange}
                      className={classNames("form-control form-control-lg", {
                        "is-invalid": err.pwd
                      })}
                    />
                    {err.pwd && (
                      <div className="invalid-feedback">{err.pwd}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classNames("form-control form-control-lg", {
                        "is-invalid": err.pwd1
                      })}
                      placeholder="Confirm Password"
                      name="pwd1"
                      value={this.state.pwd1}
                      onChange={this.watchChange}
                    />
                    {err.pwd1 && (
                      <div className="invalid-feedback">{err.pwd1}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
