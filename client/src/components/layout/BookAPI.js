import React, { Component } from "react";
import Book from "./Book";
import { extractProps } from "../../actions/bookActions";

class BookApi extends Component {
  constructor(props) {
    super(props);
    this.state = extractProps(props.bookData);
    this.addBook = props.addBook;
  }

  render() {
    return(
      <Book bookData = {this.state}>
        <span 
          className="material-icons add" 
          onClick={() => this.addBook(this.state)}
        >
          add_circle
        </span>
      </Book>
    );
  }
}

export default BookApi;