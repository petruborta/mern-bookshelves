import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

class SearchingBooksAPI extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    var xmlhttp = new XMLHttpRequest();
    var url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.userInput}&maxResults=40&key=${process.env.REACT_APP_BOOKS_API_KEY}`;

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var response = JSON.parse(xmlhttp.responseText);
        console.log(response);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };

  render() {
    const { errors } = this.state;

    return(
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.userInput}
                  error={errors.userInput}
                  id="userInput"
                  type="text"
                  className={classnames("", {
                    invalid: errors.userInput
                  })}
                />
                <label htmlFor="userInput">Search for...</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchingBooksAPI;