import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  constructor() {
    super();
    this.sectionAbout = createRef();
  }

  scrollToSectionAbout = () => {
    this.sectionAbout.current.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  render() {
    return (
      <main>
        <div className="parallax">
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
      </div>

      <section style={{height:"100vh"}} ref={this.sectionAbout}>

      </section>
      </main>
    );
  }
}

export default Landing;
