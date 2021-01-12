import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Book from "./Book";
import Confirm from "../layout/Confirm";

class FavoriteBook extends Component {
  render() { 
    const { user } = this.props.auth;
    const { apiID, volumeInfo } = this.props.bookData;

    return(
      <Confirm 
        title="Confirm"
        description={{
          prefix: "Remove",
          main: volumeInfo.title,
          suffix: "from favorites?"
        }}
      >
        {confirm => (
          <Book bookData = {this.props.bookData}>
            <span 
              className="material-icons delete" 
              onClick={() => confirm(() => this.props.deleteFavoriteBook(apiID, user.id))}
            >
              cancel
            </span>
          </Book>
        )}
      </Confirm>
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
