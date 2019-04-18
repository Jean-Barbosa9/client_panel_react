import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);

    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    const updateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : parseFloat(this.balanceInput.current.value)
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updateClient)
      .then(history.push("/"));
  };

  render() {
    const {
      client,
      settings: { disableBalanceOnEdit }
    } = this.props;

    if (client) {
      return (
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
                      ref={this.firstNameInput}
                      defaultValue={client.firstName}
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
                      ref={this.lastNameInput}
                      defaultValue={client.lastName}
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      ref={this.emailInput}
                      defaultValue={client.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      ref={this.phoneInput}
                      defaultValue={client.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      className="form-control"
                      type="text"
                      name="balance"
                      ref={this.balanceInput}
                      defaultValue={client.balance}
                      disabled={disableBalanceOnEdit}
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
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({firestore: {ordered}, settings}, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
