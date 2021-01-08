import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Book from "./Book";

class FavoriteBook extends Component {
  constructor(props) {
    super(props);
    this.state = props.bookData;
    this.deleteFavoriteBook = props.deleteFavoriteBook;
  }

  render() { 
    const { user } = this.props.auth;

    return(
      <Book bookData = {this.state}>
        <span 
          className="material-icons delete" 
          onClick={() => this.deleteFavoriteBook(this.state.apiID, user.id)}
        >
          cancel
        </span>
      </Book>
    );
  }
}

FavoriteBook.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(FavoriteBook);