import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Book from "./Book";

class BookAtlas extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <Book bookData = {this.props.data}>
        <span 
          className="material-icons favorite" 
          onClick={() => this.props.action(this.props.data.apiID, user.id)}
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
