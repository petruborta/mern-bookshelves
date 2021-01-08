import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { addFavoriteBook } from "../../actions/bookActions";
import classnames from "classnames";
import BookAtlas from "./BookAtlas";

class SearchingBooksAtlas extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      books: [],
      errors: {}
    };
  }

  componentDidMount() {
    axios.get('/books/')
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  renderBooksAtlas() {  
    return this.state.books.map((book) => (
      <BookAtlas 
        key={book.apiID} 
        bookData={book} 
        addFavoriteBook={this.props.addFavoriteBook} 
      />
    ));
  }
  
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
            {this.renderBooksAtlas()}
          </div>
        </div>
      </div>
    );
  }
}

SearchingBooksAtlas.propTypes = {
  addFavoriteBook: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addFavoriteBook }
)(SearchingBooksAtlas);