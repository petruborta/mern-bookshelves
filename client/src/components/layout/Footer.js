import React, { Component } from "react"
import logo from "../../images/petruborta-logo.png";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="centered">
            <div className="flex-col content-center">
              <h3>Credits:</h3>
              
              <a href="https://www.pexels.com/photo/light-inside-library-590493/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels" target="blank">Landing page photo by Janko Ferlic</a> 
              <a href="https://icons8.com/">Dashboard icons by Icons8</a>
              <a href="https://www.freepik.com/free-vector/404-error-abstract-concept-illustration_11668755.htm#page=1&query=not%20found&position=23" target="blank">404 error not found vector created by vectorjuice</a>
              <a href="https://www.freepik.com/free-vector/403-error-forbidden-with-police-concept-illustration_8030434.htm#page=1&query=forbidden&position=16" target="blank">403 error forbidden vector created by stories</a>
              <a href="https://www.freepik.com/free-vector/construction-landing-page-template_4741650.htm#page=1&query=under%20construction&position=3" target="blank">Under construction vector created by pikisuperstar</a>

              <p className="copyright"><span>&#169;</span>2021 Bookshelves. All Rights Reserved.</p>
              
              <div className="author">
                <p>DESIGN &#38; DEVELOPMENT</p>
                <a href="https://petruborta.com" target="_blank" rel="noopener noreferrer"><img src={logo} alt="Petru Borta logo"/></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;