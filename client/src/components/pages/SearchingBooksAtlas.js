import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooksAtlas, addFavoriteBook } from "../../actions/bookActions";
import BookAtlas from "../book/BookAtlas";
import Pagination from "../layout/Pagination";

class SearchingBooksAtlas extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      bookCategory: "default",
      searchOption: "title",
      booksAtlas: []
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
    this.props.fetchBooksAtlas();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps.auth;

    const isNotEmpty = prop => prop !== "";
    const filter = (books, { searchOption, userInput }) => {
      const regExp = new RegExp(userInput, "i");

      return books.filter(book => 
        book.volumeInfo[searchOption].match(regExp)
      );
    };

    const nextBooksAtlas = isNotEmpty(prevState.userInput)
      ? filter(user.booksAtlas, prevState)
      : user.booksAtlas;

    return nextBooksAtlas !== prevState.booksAtlas
      ? { booksAtlas: nextBooksAtlas }
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

  bookFallsInTheSelectedCategory(book) {
    return book.volumeInfo.categories === this.state.bookCategory;
  }

  noSelectedCategory() {
    return this.state.bookCategory === "default";
  }

  renderPagination() {
    const filteredBooksAtlas = this.state.booksAtlas
      .filter(book =>
        this.bookFallsInTheSelectedCategory(book)
        || this.noSelectedCategory());
    
    return (
      <Pagination 
        key={`${new Date().getTime()}`}
        data={{
          elements: filteredBooksAtlas,
          elementsType: BookAtlas,
          action: this.props.addFavoriteBook
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
              <Link to="/dashboard" className="btn btn-back">
                <i className="material-icons left">keyboard_backspace</i>
                Back to dashboard
              </Link>
              <Link to="/dashboard/suggest-book" className="btn btn-back">
                Suggest a book
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

SearchingBooksAtlas.propTypes = {
  fetchBooksAtlas: PropTypes.func.isRequired,
  addFavoriteBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchBooksAtlas, addFavoriteBook }
)(SearchingBooksAtlas);
