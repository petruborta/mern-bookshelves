import React, { Component } from "react";
import Book from "./Book";

class BookApi extends Component {
  render() { 
    return(
      <Book bookData = {this.props.bookData}>
        <span 
          className="material-icons add" 
          onClick={() => this.props.addBook(this.props.bookData)}
        >
          add_circle
        </span>
      </Book>
    );
  }
}

export default BookApi;