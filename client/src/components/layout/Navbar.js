import React, { Component, createRef } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import classnames from "classnames";
import logo from "../../images/logo-sm.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      prevScrollPosition: window.pageYOffset,
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

  componentDidMount() {
    this.setCurrentPageAsActive();
    window.addEventListener("scroll", this.handleScroll);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { location } = nextProps;
    const onNavigation = (location) => {
      const { pathname } = location;
      let page;
  
      switch(pathname) {
        case "/": page = "home"; break;
        case "/register": page = "register"; break;
        case "/login": page = "login"; break;
        case "/dashboard": page = "dashboard"; break;
        case "/dashboard/my-books": page = "myBooks"; break;
        case "/dashboard/atlas-books": page = "atlasBooks"; break;
        case "/dashboard/suggest-book": page = "suggestBook"; break;
        case "/dashboard/api-books": page = "apiBooks"; break;
        case "/dashboard/manage-books": page = "manageBooks"; break;
        case "/dashboard/manage-admins": page = "manageAdmins"; break;
        default:
          page = null;
      }
  
      return page;
    };

    const nextPage = onNavigation(location);

    return nextPage !== prevState.currentPage 
      ? { currentPage: nextPage }
      : null;
  }

  componentDidUpdate(prevProps, prevState) {
     if (this.state.currentPage !== prevState.currentPage) {
      this.removeActiveClassFromPages();
      this.setCurrentPageAsActive();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  removeActiveClassFromPages = () => {
    Object.keys(this.pages).map(page =>
      this.pages[page].current && this.removeActiveClassFromPage(page)
    );
  }

  removeActiveClassFromPage = (page) => {
    this.pages[page].current.classList.remove("active");
  }

  setCurrentPageAsActive = () => {
    const currentPage = this.pages[this.state.currentPage];
    
    if (currentPage !== undefined && currentPage !== null) {
      if (currentPage.current !== null) {
        currentPage.current.classList.add("active");
      }
    }
  }

  handleScroll = () => {
    const { prevScrollPosition } = this.state;

    const currentScrollPosition = window.pageYOffset;
    const visible = prevScrollPosition > currentScrollPosition;

    this.setState({
      prevScrollPosition: currentScrollPosition,
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
  
  mainNavIsVisible = () => {
    return this.mainNav.current && this.mainNav.current.classList.contains("visible");
  }

  getAdminOptions() {
    return (
      <React.Fragment>
        <Link 
          to="/dashboard/api-books" 
          id="apiBooks" 
          className="menu-item white-text" 
          onClick={this.toggleMenuButton} 
          ref={this.pages.apiBooks}
        >
          Add new books
        </Link>
        <Link 
          to="/dashboard/manage-books" 
          id="manageBooks" 
          className="menu-item white-text" 
          onClick={this.toggleMenuButton} 
          ref={this.pages.manageBooks}
        >
          Manage existing books
        </Link>
        <Link 
          to="/dashboard/manage-admins" 
          id="manageAdmins" 
          className="menu-item white-text" 
          onClick={this.toggleMenuButton} 
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
            onClick={this.toggleMenuButton} 
            ref={this.pages.home}
          >
            Home
          </Link>
          <br/>

          <Link 
            to="/dashboard" 
            id="dashboard" 
            className="menu-item white-text" 
            onClick={this.toggleMenuButton} 
            ref={this.pages.dashboard}
          >
            Dashboard
          </Link>
          <br/>

          <Link 
            to="/dashboard/my-books" 
            id="myBooks" 
            className="menu-item white-text" 
            onClick={this.toggleMenuButton} 
            ref={this.pages.myBooks}
          >
            My books
          </Link>

          <Link 
            to="/dashboard/atlas-books" 
            id="atlasBooks"  
            className="menu-item white-text" 
            onClick={this.toggleMenuButton} 
            ref={this.pages.atlasBooks}
          >
            Find books
          </Link>

          <Link 
            to="/dashboard/suggest-book" 
            id="suggestBook" 
            className="menu-item white-text" 
            onClick={this.toggleMenuButton} 
            ref={this.pages.suggestBook}
          >
            Suggest a book
          </Link>

          {user.isAdmin && this.getAdminOptions()}
          <br/>

          <Link 
            to="/login" 
            id="login" 
            className="menu-item white-text" 
            onClick={() => {this.props.logoutUser(); this.toggleMenuButton()}} 
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
          onClick={this.toggleMenuButton} 
          ref={this.pages.home}
        >
          Home
        </Link>
        <br/>

        <Link 
          to="/register" 
          id="register" 
          className="menu-item white-text" 
          onClick={this.toggleMenuButton} 
          ref={this.pages.register}
        >
          Register
        </Link>

        <Link 
          to="/login" 
          id="login" 
          className="menu-item white-text red-text" 
          onClick={this.toggleMenuButton} 
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
          "header-hidden": !this.mainNavIsVisible() && !this.state.visible
        })}
      >
        <div 
          className={classnames("nav-bar centered", {
            "invisible": !this.mainNavIsVisible() && !this.state.visible
          })}
        >
          <nav>
            <div className="logo-container cursor-pointer">
              <Link to="/" className="logo white-text" onClick={this.closeMenuButton}>
                <img src={logo} alt="Bookshelves logo" className="logo-img"/>
                <span className="app-name">Bookshelves</span>
              </Link>
            </div>

            <div className="main-nav-container" ref={this.mainNav}>
              <div className="main-nav">
                {this.renderMenu()}
              </div>
            </div>
          </nav>

          <div className="menu-btn cursor-pointer" onClick={this.toggleMenuButton} ref={this.menuButton}>
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

export default withRouter(connect(
  mapStateToProps,
  { logoutUser }
)(Navbar));
