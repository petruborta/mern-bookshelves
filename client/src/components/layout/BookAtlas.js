import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Book from "./Book";

class BookAtlas extends Component {
  constructor(props) {
    super(props);
    this.state = props.bookData;
    this.addFavoriteBook = props.addFavoriteBook;
  }

  render() {
    const { user } = this.props.auth;

    return(
      <Book bookData = {this.state}>
        <span 
          className="material-icons favorite" 
          onClick={() => this.addFavoriteBook(this.state.apiID, user.id)}
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