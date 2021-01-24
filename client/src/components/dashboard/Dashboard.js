import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchFavoriteBooks } from "../../actions/bookActions";
import { logoutUser } from "../../actions/authActions";
import suggestBook from "../../images/suggest-book.svg";
import findBooks from "../../images/find-books.svg";
import favoriteBooks from "../../images/favorite-books.svg";
import Slider from "../layout/Slider";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchFavoriteBooks(this.props.auth.user.id);
  }
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  getUserName = () => {
    return this.props.auth.user.name.split(" ")[0];
  };

  userHasAtLeastNBooks = (n) => {
    return this.props.auth.user.books.length >= n;
  };

  render() {
    const heading = "Your latest addings";
    const books = this.props.auth.user.books.slice(0, 10);

    return (
      <div className="container entire-vh">
        <div className="row centered">
          <div className="col flex-col">
            <h1>Wellcome back, {this.getUserName()}!</h1><br/>

            {this.userHasAtLeastNBooks(10) && <Slider data={{heading, books}} />}

            <h2>Options panel</h2>
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
            </div><br/>

            <button onClick={this.onLogoutClick} className="btn btn-fit-content">Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchFavoriteBooks: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchFavoriteBooks, logoutUser }
)(Dashboard);
