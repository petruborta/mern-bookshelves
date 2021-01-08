import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import SearchingBooksAPI from "./components/layout/SearchingBooksAPI";
import MyBooks from "./components/layout/MyBooks";
import SearchingBooksAtlas from "./components/layout/SearchingBooksAtlas";
import ManagingBooks from "./components/layout/ManagingBooks";
import ManagingAdmins from "./components/layout/ManagingAdmins";
import Error from "./components/error/Error";

require('dotenv').config();

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={[Dashboard, AdminDashboard]} />
              <PrivateRoute path="/dashboard/api-books" component={SearchingBooksAPI} />
              <PrivateRoute path="/dashboard/my-books" component={MyBooks} />
              <PrivateRoute path="/dashboard/atlas-books" component={SearchingBooksAtlas} />
              <PrivateRoute path="/dashboard/manage-books" component={ManagingBooks} />
              <PrivateRoute path="/dashboard/manage-admins" component={ManagingAdmins} />
              <Route path="*" component={Error} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;