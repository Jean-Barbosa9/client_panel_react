import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'
import AppNavbar from './components/layout/AppNavbar'
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavbar />
          <Switch>
            <div className="container">
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/client/add' component={AddClient} />
            </div>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
