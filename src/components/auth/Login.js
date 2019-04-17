import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .login({ email, password })
      .then(notifyUser("Checking...", "loading"))
      .catch(error => {
        console.error("Error: ", error);

        switch (error.code) {
          case "auth/user-not-found":
            return notifyUser("User does not exist", "error");
          case "auth/wrong-password":
            return notifyUser("You entered an invalid password", "error");
          default:
            return notifyUser("Something went wrong", "error");
        }
      });
  };

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" />
                  Login
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholde="enter your email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholde="enter your password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className="form-control"
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
