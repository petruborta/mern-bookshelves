import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooksAtlas, deleteBook } from "../../actions/bookActions";
import classnames from "classnames";
import dummyCover from "../../images/dummy_cover.png";

class ManagingBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.fetchBooksAtlas();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

  };

  renderBooks() {
    const { user } = this.props.auth;

    return user.booksAtlas.map((book) => (
      <Book 
        key={book.apiID} 
        bookData={book} 
        deleteBook={this.props.deleteBook} 
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

          <div className={this.state.userType === "default" ? "invisible" : ""}>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Description</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderBooks()}
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchBooksAtlas, deleteBook }
)(ManagingBooks);

class Book extends Component {
  render() {
    return (
      <tr>
        <td>
          <img 
            className="thumbnail"
            src={this.props.bookData.thumbnail ? 
              this.props.bookData.thumbnail : 
              dummyCover} 
            alt=""
          />
        </td>
        <td>
          <h5>{this.props.bookData.title}</h5>
          <h6>{this.props.bookData.subtitle}</h6>
          <p>{this.props.bookData.authors}</p>
        </td>
        <td className="action">
          <i 
            className="material-icons delete-forever" 
            onClick={() => this.props.deleteBook(this.props.bookData.apiID) }
          >
            delete_forever
          </i>
        </td>
      </tr>
    );
  }
}