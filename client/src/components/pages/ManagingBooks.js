import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooksAtlas, deleteBook } from "../../actions/bookActions";
import Confirm from "../layout/Confirm";
import Pagination from "../layout/Pagination";
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

  renderPagination() {
    const filteredBooksAtlas = this.state.booksAtlas
      .filter(book =>
        this.bookFallInTheSelectedCategory(book)
        || this.noSelectedBookCategory());
    
    return (
      <Pagination 
        key={`${new Date().getTime()}`}
        data={{
          elements: filteredBooksAtlas,
          elementsType: Book,
          action: this.props.deleteBook
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
              <Link to="/dashboard/api-books" className="btn btn-back">
                Extend database
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

            <div className="table">
              <div className="table-header">
                <div className="col1 img-col">Image</div>
                <div className="col2">Description</div>
                <div className="col3 action">Action</div>
              </div>
              <div className="table-body">
                {this.renderPagination()}
              </div>
            </div>
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
    } = this.props.data;
    
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
      <div className="table-row">
        <div className="col1 img-col">
          <img className="thumbnail" src={getBookCover()} alt="" />
        </div>
        <div className="col2">
          <h2><b>{title}</b></h2>
          <h3 className="subtitle">{subtitle}</h3><br/>
          <p>{authors && "By "}<b>{authors}</b></p>
          <span className="italic-500">{categories}</span>
        </div>
        <div className="col3 action">
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
                callback: () => this.props.action(apiID)
              })
            }
          >
            delete_forever
          </i>
        </div>
      </div>
    );
  }
}
