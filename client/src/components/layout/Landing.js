import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooksAtlas } from "../../actions/bookActions";
import Slider from "./Slider";

class Landing extends Component {
  constructor() {
    super();
    this.sectionAbout = createRef();
  }

  componentDidMount() {
    this.props.fetchBooksAtlas();
  }

  scrollToSectionAbout = () => {
    this.sectionAbout.current.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  collectionHasAtLeastNBooks = (n) => {
    return this.props.auth.user.booksAtlas.length >= n;
  };

  render() {
    const heading = "Our newest books";
    const books = this.props.auth.user.booksAtlas.slice(0, 10);

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

Landing.propTypes = {
  fetchBooksAtlas: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchBooksAtlas }
)(Landing);
