import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Alert from "../layout/Alert";
import { notifyUser } from "../../actions/notifyActions";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  UNSAFE_componentWillMount() {
    const { allowRegistration } = this.props.settings;

    if (!allowRegistration) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase.createUser({ email, password }).catch(error => {
      console.error(error);
      notifyUser(error.message, "error");
    });
  };

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-body">
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <h1 className="text-center pb-4 pt-3">
                  <span className="text-primary">
                    <i className="fas fa-clipboard mr-2" />
                    Register
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
                    value="Register"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
