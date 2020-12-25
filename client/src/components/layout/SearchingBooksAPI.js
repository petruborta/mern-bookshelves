import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBook } from "../../actions/bookActions";
import classnames from "classnames";
import Book from "./Book";

class SearchingBooksAPI extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      searchResult: [],
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    var xmlhttp = new XMLHttpRequest();
    var url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.userInput}&maxResults=10&key=${process.env.REACT_APP_BOOKS_API_KEY}`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var response = JSON.parse(xmlhttp.responseText).items.slice(0, 5);
        this.setState({searchResult: response});
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };

  render() {
    const { errors } = this.state;

    return(
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="search-form-container">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.userInput}
                  error={errors.userInput}
                  id="userInput"
                  type="text"
                  className={classnames("", {
                    invalid: errors.userInput
                  })}
                />
                <label htmlFor="userInput">Search for...</label>
                <span className="red-text">{errors.password2}</span>
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

          <div className="search-results">
            {Array.from(this.state.searchResult).map((data) => (<Book key={data.id} bookData={data} addBook={this.props.addBook}/>))}
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