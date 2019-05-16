import React, { Component, Fragment } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { startRegister } from "../../actions";
import propTypes from 'prop-types'

class Register extends Component {
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
    this.props.register(newUser)
  };

  render() {
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
                      className="form-control form-control-lg"
                      placeholder="Name"
                      name="name"
                      required
                      value={this.state.name}
                      onChange={this.watchChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.watchChange}
                    />
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
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      name="pwd1"
                      value={this.state.pwd1}
                      onChange={this.watchChange}
                    />
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

Register.propTypes = {
  register: propTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  register: newUser => dispatch(startRegister(newUser))
});

export default connect(
  null,
  mapDispatchToProps
)(Register);
