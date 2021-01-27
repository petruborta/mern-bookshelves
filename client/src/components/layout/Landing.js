import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import suggestBook from "../../images/suggest-book.png";
import findBooks from "../../images/find-books.png";
import favoriteBooks from "../../images/favorite-books.png";
import addBooks from "../../images/extend-collection.png";
import manageBooks from "../../images/manage-books.png";
import manageAdmins from "../../images/manage-admins.png";
import Slider from "./Slider";
import Alert from "./Alert";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
    this.sectionAbout = createRef();
  }

  componentDidMount() {
    axios
      .get("/books/")
      .then(res => this.setState({ books: res.data.slice(0, 10) }))
      .catch(err => {
        const { status, data } = err.response;
        Alert.show({ [status]: data });
      });
  }

  scrollToSectionAbout = () => {
    this.sectionAbout.current.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  collectionHasAtLeastNBooks = (n) => {
    return this.state.books.length >= n;
  };

  render() {
    const heading = "Our newest books";
    const { books } = this.state;

    return (
      <main>
        <section className="parallax">
          <div className="container">
            <div className="row centered">
              <div className="parallax-content">
                <h1 className="large-text">All</h1>
                <h1>your favorite books</h1>
                <h1>in one place</h1>
                <br/><br/>
                <Link to="/dashboard/atlas-books" className="btn btn-browse">Browse collection</Link>

                <div className="explore-btn-container centered" onClick={this.scrollToSectionAbout}>
                  <span className="material-icons explore-btn cursor-pointer">
                    arrow_drop_down_circle
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container" ref={this.sectionAbout}>
          <div className="row centered">
            <div className="col flex-col">
              <h1 className="section-title">About Bookshelves</h1>
              <div className="margin-b-3">
                <h2 className="margin-t-1">With us you can</h2>
                <div className="options-container margin-b-1">
                  <Link to="/dashboard/suggest-book" className="option">
                    <img src={suggestBook} alt="Suggest a book to be added to our collection" className="option-img"/>
                    <div>
                      <h3 className="margin-b-1">Suggest us a book</h3>
                      <p>Can't find a favorite book? Tell us which one it is and we will surely add it to collection.</p>
                    </div>
                  </Link>
                  <Link to="/dashboard/atlas-books" className="option">
                    <img src={findBooks} alt="Find books from our collection" className="option-img"/>
                    <div>
                      <h3 className="margin-b-1">Search for books</h3>
                      <p>Our collection includes books of various genres. You will definitely find a book you like.</p>
                    </div>
                  </Link>
                  <Link to="/dashboard/my-books" className="option">
                    <img src={favoriteBooks} alt="Your own collection of favorite books" className="option-img"/>
                    <div>
                      <h3 className="margin-b-1">Manage favorite books</h3>
                      <p>Your own collection of your preffered books. And there is no limit! Isn't it wonderful?</p>
                    </div>
                  </Link>
                </div>

                <h2 className="margin-t-1">Administrators also can</h2>
                <div className="options-container margin-b-1">
                  <Link to="/dashboard/api-books" className="option">
                    <img src={addBooks} alt="Extend collection with new books" className="option-img"/>
                    <div>
                      <h3 className="margin-b-1">Extend collection</h3>
                      <p>New books (including the ones suggested by you) can be added to fill the bookshelves.</p>
                    </div>
                  </Link>
                  <Link to="/dashboard/manage-books" className="option">
                    <img src={manageBooks} alt="Manange conllection's books" className="option-img"/>
                    <div>
                      <h3 className="margin-b-1">Manage existing books</h3>
                      <p>Our #1 priority is keeping bookshelves neat. Every part of space is worth like gold.</p>
                    </div>
                  </Link>
                  <Link to="/dashboard/manage-admins" className="option">
                    <img src={manageAdmins} alt="Manage administrators" className="option-img"/>
                    <div>
                      <h3 className="margin-b-1">Manage administrators</h3>
                      <p>Administrators are working hard to keep everything running. You can join us as well!</p>
                    </div>
                  </Link>
                </div>
              </div>

              {this.collectionHasAtLeastNBooks(10) && <Slider data={{heading, books}} />}

              <Link to="/dashboard" className="btn btn-fit-content centered">Go to Dashboard</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Landing;
