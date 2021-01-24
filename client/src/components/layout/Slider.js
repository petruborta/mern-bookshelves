import React, { Component } from "react";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data
    }
  }

  renderSlides = () => {
    return (
      <>
        {this.state.books.map(book => (
          <div key={book.apiID} className="slide">
            <img src={book.volumeInfo.imageLinks.thumbnail} height="210" width="130" alt="" />
          </div>
        ))}
      </>
    );
  };

  render() {
    return (
      <React.Fragment>
        <h2>{this.state.heading}</h2><br/>

        <div className="slider">
          <div className="slider-track">
            {this.renderSlides()}
            {this.renderSlides()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Slider;
