import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import suggestBook from "../../images/suggest-book.svg";
import findBooks from "../../images/find-books.svg";
import favoriteBooks from "../../images/favorite-books.svg";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container entire-vh">
        <div className="row centered">
          <div className="col flex-col">
            <h2>Wellcome back, {user.name.split(" ")[0]}!</h2>
            <br/>
            <div className="options-container">
              <Link to="/dashboard/suggest-book" className="option">
                <img src={suggestBook} alt="Suggest a book to be added to our collection" className="option-img"/>
                Suggest a book
              </Link>
              <Link to="/dashboard/atlas-books" className="option">
                <img src={findBooks} alt="Find books from our collection" className="option-img"/>
                Find books
              </Link>
              <Link to="/dashboard/my-books" className="option">
                <img src={favoriteBooks} alt="Your own collection of favorite books" className="option-img"/>
                My books
              </Link>
              {this.props.children}
            </div>
            <br/>
            <button onClick={this.onLogoutClick} className="btn btn-logout">Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
