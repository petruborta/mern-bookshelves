import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import addBooks from "../../images/extend-collection.svg";
import manageBooks from "../../images/manage-books.svg";
import manageAdmins from "../../images/manage-admins.svg";

class AdminDashboard extends Component {
  render() {
    return (
      <Dashboard>
        <React.Fragment>
          <Link to="/dashboard/api-books" className="option">
            <img src={addBooks} alt="Extend collection with new books" className="option-img"/>
            Add new books
          </Link>
          <Link to="/dashboard/manage-books" className="option">
            <img src={manageBooks} alt="Manange conllection's books" className="option-img"/>
            Manage existing books
          </Link>
          <Link to="/dashboard/manage-admins" className="option">
            <img src={manageAdmins} alt="Manage administrators" className="option-img"/>
            Manage administrators
          </Link>
        </React.Fragment>
      </Dashboard>
    );
  }
}

export default AdminDashboard;
