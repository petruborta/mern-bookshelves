import { Component } from "react";
import dummyCover from "../../images/dummy_cover.png";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.extractProps(props.bookData);
    this.addBook = props.addBook;
  }

  extractProps(data) {
    const {
      id: apiID,
      selfLink,
      volumeInfo
    } = data;

    const {
      title,
      subtitle,
      authors,
      publisher,
      publishedDate,
      description,
      industryIdentifiers,
      pageCount,
      categories,
      imageLinks,
      language,
      infoLink
    } = volumeInfo;

    const identifiers = {
      ISBN_13: industryIdentifiers[0].identifier,
      ISBN_10: industryIdentifiers[1].identifier
    };
    
    return {
      apiID,
      selfLink,
      volumeInfo: {
        title,
        subtitle,
        authors,
        publisher,
        publishedDate,
        description,
        industryIdentifiers: identifiers,
        pageCount,
        categories,
        imageLinks,
        language,
        infoLink
      }
    };
  }

  render() {
    let categories = (this.state.volumeInfo.categories !== undefined) ?
      Array.from(this.state.volumeInfo.categories).join(",") :
      "";
    
    return (
      <div className="book">
        <div className="book-image">
          <span className={`categories ${(categories === "") ? "invisible" : ""}`}>{categories}</span>
          <img 
            src={this.state.volumeInfo.imageLinks ? 
              this.state.volumeInfo.imageLinks.thumbnail : 
              dummyCover} 
            alt=""
          />
          <span className="material-icons" onClick={() => this.addBook(this.state)}>add_circle</span>
        </div>
        <div className="book-description">
          <h5>{this.state.volumeInfo.title}</h5>
          <h6>{this.state.volumeInfo.subtitle}</h6>
          <p>By {this.state.volumeInfo.authors} · {this.state.volumeInfo.publishedDate.split('-')[0]}</p>
        </div>
      </div>
    );
  }
}

export default Book;