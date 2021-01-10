import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchFavoriteBooks, deleteFavoriteBook } from "../../actions/bookActions";
import FavoriteBook from "./FavoriteBook";

class MyBooks extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      bookCategory: "default",
      searchOption: "title",
      favoriteBooks: []
    };
  }

  onChange = e => {
    const { 
      name: changedProperty, 
      value: newValue
    } = e.target;

    this.setState({ [changedProperty]: newValue });
  };

  componentDidMount() {
    this.props.fetchFavoriteBooks(this.props.auth.user.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps.auth;

    const isNotEmpty = prop => prop !== "";
    const filter = (books, { searchOption, userInput }) => {
      const regExp = new RegExp(userInput.trim(), "i");

      return books.filter(book => 
        book.volumeInfo[searchOption].match(regExp)
      );
    };

    const nextfavoriteBooks = isNotEmpty(prevState.userInput)
      ? filter(user.books, prevState)
      : user.books;

    return nextfavoriteBooks !== prevState.favoriteBooks
      ? { favoriteBooks: nextfavoriteBooks }
      : null;
  }

  renderBookCategories() {
    const { user } = this.props.auth;
    let keyValue = 0;

    return user.bookCategories
      .map(category => (
        <option 
          key={keyValue++} 
          value={category}
        >
          {category}
        </option>
      ));
  }

  bookFallsIntoTheSelectedCategory(book) {
    return book.volumeInfo.categories === this.state.bookCategory;
  }

  noSelectedCategory() {
    return this.state.bookCategory === "default";
  }

  renderFavoriteBooks() {
    return this.state.favoriteBooks
      .filter(book => 
        this.bookFallsIntoTheSelectedCategory(book) 
        || this.noSelectedCategory())
      .map(book => (
        <FavoriteBook 
          key={book.apiID} 
          bookData={book} 
          deleteFavoriteBook={this.props.deleteFavoriteBook} 
        />
      ));
  }

  render() {
    return(
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="search-form-container">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
            <Link to="/dashboard/atlas-books" className="btn waves-effect waves-light hoverable blue accent-3">
              Add more books
            </Link>
            
            <form>
              <div className="col s12">
                <label htmlFor="userInput">Search for...</label>
                <input
                  type="text"
                  name="userInput"
                  value={this.state.userInput}
                  onChange={this.onChange}
                />
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <p>Please select where to search in:</p>
                <label>
                  <input 
                    type="radio" 
                    name="searchOption" 
                    value="title" 
                    checked={this.state.searchOption === "title"} 
                    onChange={this.onChange}
                  /> 
                  Title
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="searchOption" 
                    value="authors" 
                    checked={this.state.searchOption === "authors"} 
                    onChange={this.onChange}
                  /> 
                  Authors
                </label>
              </div>
            </form>
          </div>

          <div className="select-field">
            <label htmlFor="bookCategory">Book category:</label>
            <select 
              name="bookCategory" 
              value={this.state.bookCategory} 
              onChange={this.onChange}
            >
              <option value="default">Select book category</option>
              {this.renderBookCategories()}
            </select>
          </div>

          <div className="search-results">
            {this.renderFavoriteBooks()}
          </div>
        </div>
      </div>
    );
  }
}

MyBooks.propTypes = {
  fetchFavoriteBooks: PropTypes.func.isRequired,
  deleteFavoriteBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchFavoriteBooks, deleteFavoriteBook }
)(MyBooks);