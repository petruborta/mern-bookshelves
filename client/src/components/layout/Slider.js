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
          <div key={book.apiID} className="slide cursor-pointer">
            <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
              <img src={book.volumeInfo.imageLinks.thumbnail} height="210" width="130" alt="Book cover of one of your latest 10 addings" />
            </a>
          </div>
        ))}
      </>
    );
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="margin-t-1">{this.state.heading}</h2><br/>

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
