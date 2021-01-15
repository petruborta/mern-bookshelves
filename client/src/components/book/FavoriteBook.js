import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Book from "./Book";
import Confirm from "../layout/Confirm";

class FavoriteBook extends Component {
  render() { 
    const { user } = this.props.auth;
    const { apiID, volumeInfo } = this.props.data;

    return (
      <Book bookData = {this.props.data}>
        <span 
          className="material-icons delete" 
          onClick={() =>
            Confirm.show({
              title: "Confirm",
              description: {
                prefix: "Remove",
                main: volumeInfo.title,
                suffix: "from favorites?"
              },
              callback: () => this.props.action(apiID, user.id)
            })
          }
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
