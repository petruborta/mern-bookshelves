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
      if (!e.target.className.includes("material-icons")) {
        window.open(infoLink, "_blank"); 
      }
    };

    const hideIfNoCategories = () => 
      categories === "" ? " hidden" : "";

    const getBookCover = () => 
      imageLinks ? imageLinks.thumbnail : dummyCover;

    return (
      <div className="book" 
        onClick={(e) => openInNewWindow(e)}
      >
        <div className="book-image">
          <span className={"categories italic-500" + hideIfNoCategories()}>{categories}</span>
          <img src={getBookCover()} alt="" />
          {this.props.children}
        </div>
        <div className="book-description">
          <h2><b>{title}</b></h2>
          <h3 className="subtitle">{subtitle}</h3><br/>
          <p>{authors && "By "}<b>{authors}</b>{authors && publishedYear && " · "}{publishedYear}</p>
        </div>
      </div>
    );
  }
}

export default Book;
