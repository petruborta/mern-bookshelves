import { Component } from "react";
import dummyCover from "../../images/dummy_cover.png";

class Book extends Component {
  render() {
    const {
      title,
      subtitle,
      authors,
      categories,
      imageLinks,
      publishedDate,
      infoLink
    } = this.props.bookData.volumeInfo;

    const publishedYear = publishedDate
      ? publishedDate.split('-')[0]
      : "";
    
    const openInNewWindow = (e) => {
      let baseClass = e.target.className.split(" ")[0];

      if (baseClass !== "material-icons") {
        window.open(infoLink, "_blank"); 
      }
    };

    const hideIfNoCategories = () => 
      categories === "" ? " invisible" : "";

    const getBookCover = () => 
      imageLinks ? imageLinks.thumbnail : dummyCover;

    return (
      <div className="book" 
        onClick={(e) => openInNewWindow(e)}
      >
        <div className="book-image">
          <span className={"categories" + hideIfNoCategories()}>{categories}</span>
          <img src={getBookCover()} alt="" />
          {this.props.children}
        </div>
        <div className="book-description">
          <h5><b>{title}</b></h5>
          <h6>{subtitle}</h6>
          <p>{authors && "By "}<b>{authors}</b>{authors && publishedYear && " · "}{publishedYear}</p>
        </div>
      </div>
    );
  }
}

export default Book;