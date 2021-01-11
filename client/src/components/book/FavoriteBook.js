import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Book from "./Book";

class FavoriteBook extends Component {
  render() { 
    const { user } = this.props.auth;

    return(
      <Book bookData = {this.props.bookData}>
        <span 
          className="material-icons delete" 
          onClick={() => this.props.deleteFavoriteBook(this.props.bookData.apiID, user.id)}
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