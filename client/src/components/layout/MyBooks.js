import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchFavoriteBooks, deleteFavoriteBook } from "../../actions/bookActions";
import classnames from "classnames";
import FavoriteBook from "./FavoriteBook";

class MyBooks extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

  };
  
  componentDidMount() {
    this.props.fetchFavoriteBooks(this.props.auth.user.id);
  }

  renderFavoriteBooks() {
    return this.props.auth.user.books.map(book => (
      <FavoriteBook 
        key={book.apiID} 
        bookData={book} 
        deleteFavoriteBook={this.props.deleteFavoriteBook} 
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchFavoriteBooks, deleteFavoriteBook }
)(MyBooks);