import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { startAuth } from "../../actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",
      err: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.auth.isAuth) {
      // redirect if user is logined
      this.props.history.push("/profiles");
    }
    // set err state
    if (newProps.err) {
      this.setState({
        err: newProps.err
      });
    }
  }

  watchSubmit = event => {
    event.preventDefault();
    const userLogin = {
      email: this.state.email,
      pwd: this.state.pwd
    };
    this.props.loginStart(userLogin);
  };

  setValue = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { err } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.watchSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": err.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.setValue}
                  />
                  {err.email && (
                    <div className="invalid-feedback">{err.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": err.pwd
                    })}
                    placeholder="Password"
                    name="pwd"
                    value={this.state.pwd}
                    onChange={this.setValue}
                  />
                  {err.pwd && <div className="invalid-feedback">{err.pwd}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginStart: PropTypes.func.isRequired,
  err: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  loginStart: user => dispatch(startAuth(user))
});

const mapStateToProps = ({ loginReducer, errAuth }) => ({
  auth: loginReducer,
  err: errAuth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
