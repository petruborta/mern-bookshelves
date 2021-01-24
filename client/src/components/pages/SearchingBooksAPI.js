import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBook, extractPropsBookAPI } from "../../actions/bookActions";
import classnames from "classnames";
import BookAPI from "../book/BookAPI";
import Pagination from "../layout/Pagination";

class SearchingBooksAPI extends Component {
  constructor() {
    super();
    this.state = {
      maxResults: 5,
      userInput: "",
      books: [],
      errors: {}
    };
  }

  onChange = e => {
    let {
      name: changedProperty,
      value: newValue
    } = e.target;

    if (changedProperty === "maxResults") {
      newValue = this.validateMaxResults(newValue);
    }

    this.setState({ [changedProperty]: newValue });
  };

  validateMaxResults(value) {
    if (value.match(/\D/)) return 5;

    return value > 40 
      ? 40 : value < 1 
        ? 1 : value;
  }

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.userInput.trim()) {
      this.setState({ 
        userInput: "",
        errors: { noinput: "Invalid search input" }
      });
      return;
    }

    this.setState({ 
      books: [],
      errors: {}
    });

    const { userInput, maxResults} = this.state;
    
    var xmlhttp = new XMLHttpRequest();
    var url = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&maxResults=${maxResults}&key=${process.env.REACT_APP_BOOKS_API_KEY}`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var response = JSON.parse(xmlhttp.responseText).items;
        this.setState({ books: response });
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };

  renderPagination() {
    const booksAPI = this.state.books.map((book) => extractPropsBookAPI(book));

    return (
      <Pagination 
        key={`${new Date().getTime()}`}
        data={{
          elements: booksAPI,
          elementsType: BookAPI,
          action: this.props.addBook
        }} 
      />
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container entire-vh">
        <div className="row centered">
          <div className="col flex-col">
            <div className="margin-b-1">
              <Link to="/dashboard" className="btn btn-flex">
                <i className="material-icons left">keyboard_backspace</i>
                Back to dashboard
              </Link>
            </div>

            <div className="margin-b-1">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="margin-b-1">
                  <label className="flex-col">
                    Max results (40):
                    <input 
                      type="text" 
                      name="maxResults" 
                      value={this.state.maxResults}
                      onChange={this.onChange}
                    />
                  </label>
                </div>

                <div className="margin-b-1">
                  <label className="flex-col">
                    Search for...
                    <input
                      type="text"
                      name="userInput"
                      value={this.state.userInput}
                      onChange={this.onChange}
                      error={errors.noinput}
                      className={classnames("", {
                        invalid: errors.noinput
                      })}
                    />
                  </label>
                  <span className="red-text">{errors.noinput}</span>
                </div>

                <button type="submit" className="btn btn-fit-content">Search</button>
              </form>
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

SearchingBooksAPI.propTypes = {
  addBook: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBook }
)(SearchingBooksAPI);
