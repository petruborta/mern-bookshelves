import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooksAtlas, addFavoriteBook } from "../../actions/bookActions";
import BookAtlas from "../book/BookAtlas";

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

  renderBooksAtlas() {  
    return this.state.booksAtlas
      .filter(book =>
        this.bookFallsInTheSelectedCategory(book)
        || this.noSelectedCategory())
      .map(book => (
        <BookAtlas 
          key={book.apiID} 
          bookData={book} 
          addFavoriteBook={this.props.addFavoriteBook} 
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
            <Link to="" className="btn waves-effect waves-light hoverable blue accent-3">
              Suggest a book
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
            {this.renderBooksAtlas()}
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