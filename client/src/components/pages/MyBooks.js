import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchFavoriteBooks, deleteFavoriteBook } from "../../actions/bookActions";
import FavoriteBook from "../book/FavoriteBook";
import Pagination from "../layout/Pagination";

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

  renderPagination() {
    const filteredFavoriteBooks = this.state.favoriteBooks
      .filter(book => 
        this.bookFallsIntoTheSelectedCategory(book) 
        || this.noSelectedCategory());
    
    return (
      <Pagination 
        key={`${new Date().getTime()}`}
        data={{
          elements: filteredFavoriteBooks,
          elementsType: FavoriteBook,
          action: this.props.deleteFavoriteBook
        }} 
      />
    );
  }

  render() {
    const { userInput, bookCategory, searchOption } = this.state;

    return (
      <div className="container entire-vh">
        <div className="row centered">
          <div className="col flex-col">
            <div className="margin-b-1 flex-wrap">
              <Link to="/dashboard" className="btn btn-flex">
                <i className="material-icons left">keyboard_backspace</i>
                Back to dashboard
              </Link>
              <Link to="/dashboard/atlas-books" className="btn btn-flex">
                Add more books
              </Link>
            </div>
            
            <div className="margin-b-1">
              <form>
                <div className="margin-b-1">
                  <label className="flex-col">
                    Search for...
                    <input
                      type="text"
                      name="userInput"
                      value={userInput}
                      onChange={this.onChange}
                    />
                  </label>
                </div>

                <p>Please select where to search in:</p>
                <div className="radio-btn-group">
                  <div className="margin-b-1 radio-btn">
                    <label className="flex-col">
                      <input 
                        type="radio" 
                        name="searchOption" 
                        value="title" 
                        checked={searchOption === "title"} 
                        onChange={this.onChange}
                      />
                      Title
                    </label>
                  </div>

                  <div className="margin-b-1 radio-btn">
                    <label className="flex-col">
                      <input 
                        type="radio" 
                        name="searchOption" 
                        value="authors" 
                        checked={searchOption === "authors"} 
                        onChange={this.onChange}
                      />
                      Authors
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="select-field">
              <label className="flex-col">
                Book category:
                <select 
                  name="bookCategory" 
                  value={bookCategory} 
                  onChange={this.onChange}
                >
                  <option value="default">Select book category</option>
                  {this.renderBookCategories()}
                </select>
              </label>
            </div>

            <div className="search-results">
              {this.renderPagination()}
            </div>
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
