import React, { Component } from 'react'

class Register extends Component {
  state = {
    email: '',
    password: ''
  }
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onSubmit = e => {
    e.preventDefault()
    console.log('Send register to firebase');
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
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
    );
  }
}

export default Register