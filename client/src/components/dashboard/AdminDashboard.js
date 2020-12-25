import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

class AdminDashboard extends Component {
  render() {
    return (
      <Dashboard>
        <div style={{ marginTop: "2rem" }}>
          <Link to="/dashboard/api-books" className="btn">Add new books</Link>
          <button 
            className="btn"
          >
            Manage existing books
          </button>
          <button 
            className="btn"
          >
            Manage administrators
          </button>
        </div>
      </Dashboard>
    );
  }
}

export default AdminDashboard;