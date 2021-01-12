import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

class AdminDashboard extends Component {
  render() {
    return (
      <Dashboard>
        <div style={{ marginTop: "2rem" }}>
          <Link to="/dashboard/api-books" className="btn">Add new books</Link>
          <Link to="/dashboard/manage-books" className="btn">Manage existing books</Link>
          <Link to="/dashboard/manage-admins" className="btn">Manage administrators</Link>
        </div>
      </Dashboard>
    );
  }
}

export default AdminDashboard;
