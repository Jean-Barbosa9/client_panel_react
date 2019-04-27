import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firestore, history } = this.props;

    const newClient = this.state;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    firestore.add({ collection: "clients" }, newClient).then(history.push("/"));
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <div className="container">
        <div className="add-client__main-wrapper row">
          <div className="col-md-6">
            <div className="add-clients__back">
              <Link to="/" className="btn btn-link">
                <i className="icon-back fas fa-arrow-circle-left" /> Back to
                Dashboard
              </Link>
            </div>
            <div className="card">
              <div className="card-header">Add Client</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                      minLength="2"
                      onChange={this.onChange}
                      value={this.state.firstName}
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      minLength="2"
                      onChange={this.onChange}
                      value={this.state.lastName}
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      onChange={this.onChange}
                      value={this.state.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      className="form-control"
                      type="text"
                      name="balance"
                      onChange={this.onChange}
                      value={this.state.balance}
                      disabled={disableBalanceOnAdd}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="Add Client"
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

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
