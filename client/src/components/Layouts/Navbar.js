import React, { Component } from "react";
import { Link } from "react-router-dom";
import { successAuth } from "../../actions";
import { connect } from "react-redux";
import propTypes from "prop-types";

class Navbar extends Component {
  logout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    let { isAuth, user } = this.props.user;
    let { name, avatar } = user;
    // guest ejs
    const guestUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    // logined
    const loginUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <img alt="avatar" src={avatar} />
          <p>{name}</p>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link" onClick={this.logout}>
            Logout
          </a>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/landing">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {/* guest User */}
            {isAuth ? loginUser : guestUser}
          </div>
        </div>
      </nav>
    );
  }
}

// dinh nghia proptype
Navbar.propTypes = {
  user: propTypes.object.isRequired,
  logout: propTypes.func.isRequired
};

const mapStateToProps = ({ loginReducer }) => ({
  user: loginReducer
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(successAuth({}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
