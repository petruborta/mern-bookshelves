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
    const {
      name: changedProperty,
      value: newValue
    } = e.target;

    if (changedProperty === "maxResults") {
      this.setState({ 
        [changedProperty]: newValue > 40 
          ? 40 : newValue < 1 
            ? 1 : newValue 
      });

      return;
    }

    this.setState({ [changedProperty]: newValue });
  };

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
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="search-form-container">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="col s3">
                <label htmlFor="maxResults">Max results (40):</label>
                <input 
                  type="text" 
                  name="maxResults" 
                  value={this.state.maxResults}
                  onChange={this.onChange}
                />
              </div>
              <div className="col s12">
                <label htmlFor="userInput">Search for...</label>
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
                <span className="red-text">{errors.noinput}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div>
            {this.renderPagination()}
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
