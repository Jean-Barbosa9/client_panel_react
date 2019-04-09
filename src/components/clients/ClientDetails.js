import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
  render() {
    const { client } = this.props;
    if (client) {
      const { id, firstName, lastName, email, phone, balance } = client;
      return (
        <div className="client-details__main-wrapper">
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
                <button className="btn btn-danger">Delete</button>
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
                  </h4>
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
