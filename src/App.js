import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AppNavbar from './components/layout/AppNavbar'
import Dashboard from './components/layout/Dashboard';
class App extends Component {
  render() {
    return (
      <Router>
        <AppNavbar />
        <Switch>
          <div className="container">
            <Route exact path='/' component={Dashboard} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
