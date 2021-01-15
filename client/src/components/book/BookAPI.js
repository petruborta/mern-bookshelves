import React, { Component } from "react";
import Book from "./Book";

class BookApi extends Component {
  render() { 
    return (
      <Book bookData = {this.props.data}>
        <span 
          className="material-icons add" 
          onClick={() => this.props.action(this.props.data)}
        >
          add_circle
        </span>
      </Book>
    );
  }
}

export default BookApi;
