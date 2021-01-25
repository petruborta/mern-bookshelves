import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import classnames from "classnames";
import logo from "../../images/logo-sm.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home", //TODO: get current page name
      prevScrollpos: window.pageYOffset,
      visible: true
    };

    this.pages = {
      home: createRef(),
      register: createRef(),
      login: createRef(),
      dashboard: createRef(),
      myBooks: createRef(),
      atlasBooks: createRef(),
      suggestBook: createRef(),
      apiBooks: createRef(),
      manageBooks: createRef(),
      manageAdmins: createRef()
    };

    this.menuButton = createRef();
    this.mainNav = createRef();
  }

  onNavigation = (e) => {
    let { id: page } = e.target;

    if (page === "to-home-logo") page = "home";
    this.setState({ currentPage: page });
  }

  componentDidMount() {
    this.setCurrentPageAsActive();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
     if (this.state.currentPage !== prevState.currentPage) {
      this.removeActiveClassFromPages();
      this.setCurrentPageAsActive();
    }
  }

  removeActiveClassFromPages = () => {
    Object.keys(this.pages).map(page =>
      this.pages[page].current && this.removeActiveClassFromPage(page)
    );
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  removeActiveClassFromPage = (page) => {
    this.pages[page].current.classList.remove("active");
  }

  setCurrentPageAsActive = () => {
    this.pages[this.state.currentPage].current.classList.add("active");
  }

  handleScroll = () => {
    if (this.mainNav.current.classList.contains("visible")) {
      this.closeMenuButton();
    }

    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  }

  closeMenuButton = () => {
    this.menuButton.current.classList.remove("open");
    this.mainNav.current.classList.remove("visible");
  }

  toggleMenuButton = () => {
    this.menuButton.current.classList.toggle("open");
    this.mainNav.current.classList.toggle("visible");
  }
  
  getAdminOptions() {
    return (
      <React.Fragment>
        <Link 
          to="/dashboard/api-books" 
          id="apiBooks" 
          className="menu-item white-text" 
          onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
          ref={this.pages.apiBooks}
        >
          Add new books
        </Link>
        <Link 
          to="/dashboard/manage-books" 
          id="manageBooks" 
          className="menu-item white-text" 
          onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
          ref={this.pages.manageBooks}
        >
          Manage existing books
        </Link>
        <Link 
          to="/dashboard/manage-admins" 
          id="manageAdmins" 
          className="menu-item white-text" 
          onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
          ref={this.pages.manageAdmins}
        >
          Manage administrators
        </Link>
      </React.Fragment>
    );
  }

  renderMenu = () => {
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth;
      
      return (
        <React.Fragment>
          <Link 
            to="/" 
            id="home" 
            className="menu-item white-text" 
            onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
            ref={this.pages.home}
          >
            Home
          </Link>
          <br/>

          <Link 
            to="/dashboard" 
            id="dashboard" 
            className="menu-item white-text" 
            onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
            ref={this.pages.dashboard}
          >
            Dashboard
          </Link>
          <br/>

          <Link 
            to="/dashboard/my-books" 
            id="myBooks" 
            className="menu-item white-text" 
            onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
            ref={this.pages.myBooks}
          >
            My books
          </Link>

          <Link 
            to="/dashboard/atlas-books" 
            id="atlasBooks"  
            className="menu-item white-text" 
            onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
            ref={this.pages.atlasBooks}
          >
            Find books
          </Link>

          <Link 
            to="/dashboard/suggest-book" 
            id="suggestBook" 
            className="menu-item white-text" 
            onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
            ref={this.pages.suggestBook}
          >
            Suggest a book
          </Link>

          {user.isAdmin && this.getAdminOptions()}
          <br/>

          <Link 
            to="/login" 
            id="login" 
            className="menu-item white-text red-text" 
            onClick={(e) => {this.onNavigation(e); this.props.logoutUser(); this.toggleMenuButton()}} 
            ref={this.pages.login}
          >
            Log out
          </Link>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link 
          to="/" 
          id="home" 
          className="menu-item white-text" 
          onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
          ref={this.pages.home}
        >
          Home
        </Link>
        <br/>

        <Link 
          to="/register" 
          id="register" 
          className="menu-item white-text" 
          onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
          ref={this.pages.register}
        >
          Register
        </Link>

        <Link 
          to="/login" 
          id="login" 
          className="menu-item white-text red-text" 
          onClick={(e) => {this.onNavigation(e); this.toggleMenuButton()}} 
          ref={this.pages.login}
        >
          Log in
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <header 
        className={classnames("container fixed", {
          "header-hidden": !this.state.visible
        })}
      >
        <div 
          className={classnames("nav-bar centered", {
            "invisible": !this.state.visible
          })}
        >
          <nav>
            <div className="logo-container">
              <Link to="/" className="logo white-text" onClick={this.closeMenuButton}>
                <img src={logo} alt="bookshelves logo" className="logo-img"/>
                <span className="app-name">Bookshelves</span>
              </Link>
            </div>

            <div className="main-nav-container" ref={this.mainNav}>
              <div className="main-nav">
                {this.renderMenu()}
              </div>
            </div>
          </nav>

          <div className="menu-btn" onClick={this.toggleMenuButton} ref={this.menuButton}>
            <div className="menu-btn-lines"></div>
          </div>
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
