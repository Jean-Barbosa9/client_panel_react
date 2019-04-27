import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showUpdateBalance: false,
    updateBalanceAmount: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitBalance = e => {
    e.preventDefault();

    const { firestore, client } = this.props;
    const { updateBalanceAmount } = this.state;

    firestore
      .update(
        { collection: "clients", doc: client.id },
        { balance: parseFloat(updateBalanceAmount) }
      )
      .then(this.setState({ updateBalanceAmount: "" }));
  };

  deleteClick = () => {
    const { firestore, client, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props,
      { showUpdateBalance, updateBalanceAmount } = this.state;
    let balanceForm = "";

    if (showUpdateBalance) {
      balanceForm = (
        <form onSubmit={this.onSubmitBalance}>
          <div className="input-group">
            <input
              type="text"
              name="updateBalanceAmount"
              placeholder="Add new balance"
              onChange={this.onChange}
              value={updateBalanceAmount}
              className="form-control"
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline btn-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      const { id, firstName, lastName, email, phone, balance } = client;
      return (
        <div className="client-details__main-wrapper container">
          <div className="row">
            <div className="col-sm-6">
              <Link to="/" className="btn-link">
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>
            <div className="col-sm-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.deleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              <h3>
                {firstName} {lastName}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID: <span className="text-secondary">{id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h4>
                    Balace:{" "}
                    <span
                      className={classnames({
                        "text-danger": balance > 0,
                        "text-success": balance === 0
                      })}
                    >
                      ${parseFloat(balance).toFixed(2)}
                    </span>
                    <small>
                      <button
                        onClick={() =>
                          this.setState({
                            showUpdateBalance: !this.state.showUpdateBalance
                          })
                        }
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer"
                        }}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                    </small>
                  </h4>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
