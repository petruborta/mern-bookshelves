import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Slider extends Component {
  renderSlides = () => {
    const { user } = this.props.auth;
    const numOfBooks = user.books.length;
    const books = user.books.slice(numOfBooks - 10, numOfBooks);
    
    return (
      <>
        {books.map(book => (
          <div key={book.apiID} className="slide">
            <img src={book.volumeInfo.imageLinks.thumbnail} height="210" width="130" alt="" />
          </div>
        ))}
      </>
    );
  };

  render() {
    return (
      <div className="slider">
        <div className="slider-track">
          {this.renderSlides()}
          {this.renderSlides()}
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Slider);
