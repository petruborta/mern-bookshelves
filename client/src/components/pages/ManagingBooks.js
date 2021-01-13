import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooksAtlas, deleteBook } from "../../actions/bookActions";
import Confirm from "../layout/Confirm";
import dummyCover from "../../images/dummy_cover.png";

class ManagingBooks extends Component {
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
      const regExp = new RegExp(userInput.trim(), "i");

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

  bookFallInTheSelectedCategory(book) {
    return book.volumeInfo.categories === this.state.bookCategory;
  }

  noSelectedBookCategory() {
    return this.state.bookCategory === "default";
  }

  renderBooksAtlas() {
    return this.state.booksAtlas
      .filter(book =>
        this.bookFallInTheSelectedCategory(book)
        || this.noSelectedBookCategory())
      .map((book) => (
        <Book 
          key={book.apiID} 
          bookData={book} 
          deleteBook={this.props.deleteBook} 
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
            <Link to="/dashboard/api-books" className="btn waves-effect waves-light hoverable blue accent-3">
              Extend database
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

          <div>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Description</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderBooksAtlas()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ManagingBooks.propTypes = {
  fetchBooksAtlas: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchBooksAtlas, deleteBook }
)(ManagingBooks);

class Book extends Component {
  render() {
    const {
      apiID,
      volumeInfo
    } = this.props.bookData;
    
    const {
      title,
      subtitle,
      authors,
      categories,
      imageLinks
    } = volumeInfo;

    const getBookCover = () => 
      imageLinks ? imageLinks.thumbnail : dummyCover;
    
    return (
      <tr>
        <td>
          <img className="thumbnail" src={getBookCover()} alt="" />
        </td>
        <td>
          <h5><b>{title}</b></h5>
          <h6>{subtitle}</h6>
          <p><b>{authors}</b><br />{categories}</p>
        </td>
        <td className="action">
          <i 
            className="material-icons delete-forever cursor-pointer" 
            onClick={() =>
              Confirm.show({
                title: "Confirm",
                description: {
                  prefix: "Remove",
                  main: volumeInfo.title,
                  suffix: "from database?"
                },
                callback: () => this.props.deleteBook(apiID)
              })
            }
          >
            delete_forever
          </i>
        </td>
      </tr>
    );
  }
}
