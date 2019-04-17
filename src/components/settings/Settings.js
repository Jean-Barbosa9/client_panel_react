import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsActions";

class Settings extends Component {
  setAllowRegistrationOnChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  setDisableBalanceOnAddOnChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  setDisableBalanceOnEditOnChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <h1 className="card-header">Settings</h1>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>
                  Allow Registration
                  <input
                    type="checkbox"
                    name="allowRegistration"
                    onChange={this.setAllowRegistrationOnChange}
                    checked={!!allowRegistration}
                    className="ml-2"
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Disable Balance on Add
                  <input
                    type="checkbox"
                    name="disableBalanceOnAdd"
                    onChange={this.setDisableBalanceOnAddOnChange}
                    checked={!!disableBalanceOnAdd}
                    className="ml-2"
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Disable Balance on Edit
                  <input
                    type="checkbox"
                    name="disableBalanceOnEdit"
                    onChange={this.setDisableBalanceOnEditOnChange}
                    checked={!!disableBalanceOnEdit}
                    className="ml-2"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
