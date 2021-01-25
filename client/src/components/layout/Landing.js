import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

        <section className="container about" ref={this.sectionAbout}>
          <div className="row centered">
            <div className="col flex-col">
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
