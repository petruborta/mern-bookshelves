import { Component } from "react";
import dummyCover from "../../images/dummy_cover.png";

class Book extends Component {
  render() {
    const {
      categories,
      imageLinks,
      title,
      subtitle,
      authors,
      publishedDate,
      infoLink
    } = this.props.bookData.volumeInfo;

    let bookCategories = (categories !== undefined) ? categories.join(", ") : "";
    
    return (
      <div className="book" 
        onClick={(e) => {
          let baseClass = e.target.className.split(" ")[0];
          if (baseClass !== "material-icons") {
            window.open(infoLink, "_blank"); 
          }
        }}
      >
        <div className="book-image">
          <span className={`categories ${(bookCategories === "") ? "invisible" : ""}`}>{categories}</span>
          <img 
            src={imageLinks ? 
              imageLinks.thumbnail : 
              dummyCover} 
            alt=""
          />
          {this.props.children}
        </div>
        <div className="book-description">
          <h5>{title}</h5>
          <h6>{subtitle}</h6>
          <p>By {authors.join(", ")} · {publishedDate.split('-')[0]}</p>
        </div>
      </div>
    );
  }
}

export default Book;