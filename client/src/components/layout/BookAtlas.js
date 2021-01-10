import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Book from "./Book";

class BookAtlas extends Component {
  render() {
    const { user } = this.props.auth;

    return(
      <Book bookData = {this.props.bookData}>
        <span 
          className="material-icons favorite" 
          onClick={() => this.props.addFavoriteBook(this.props.bookData.apiID, user.id)}
        >
          favorite
        </span>
      </Book>
    );
  }
}

BookAtlas.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(BookAtlas);