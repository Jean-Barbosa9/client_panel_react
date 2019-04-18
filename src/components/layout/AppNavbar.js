import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
  state = {
    isAuthenicated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenicated: true };
    } else {
      return { isAuthenicated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.firebase.logout().then(localStorage.removeItem("settings"));
  };

  render() {
    const { isAuthenicated } = this.state,
      { auth } = this.props,
      { allowRegistration } = this.props.settings

    return (
      <header className="header">
        <nav className="header__nav navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Client Panel
            </Link>
            {isAuthenicated ? (
              <React.Fragment>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarMain"
                >
                  <i className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarMain">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <span
                        className="nav-link"
                        style={{ pointerEvents: "none" }}
                      >
                        {auth.email}
                      </span>
                    </li>
                    <li className="nav-item">
                      <Link to="/settings" className="nav-link">
                        Settings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <span
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={this.onLogoutClick}
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            ) : null}
            {allowRegistration && !isAuthenicated ? (
              <React.Fragment>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarMain"
                >
                  <i className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarMain">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </nav>
      </header>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);
