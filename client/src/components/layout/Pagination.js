import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);

    const rowsPerPage = this.getRowsPerPage(),
      elementsPerRow = this.getElementsPerRow(),
      elementsCount = props.data.elements.length,
      totalRows = Math.ceil(elementsCount / elementsPerRow),
      pagesCount = Math.ceil(totalRows / rowsPerPage);
    
    this.state = {
      ...props.data,
      rowsPerPage,
      elementsPerRow,
      elementsCount,
      totalRows,
      pagesCount,
      currentPage: 1,
      maxPagesOnAnySideOfCurrentPage: 3
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.setProperties);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { elements: nextElements } = nextProps.data;
    const { elements: prevElements } = prevState;
    
    return nextElements !== prevElements
      ? { elements: nextElements }
      : null;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setProperties);
  }

  onPageClick = (e) => {
    const { innerText: clickedPage } = e.target;

    if (clickedPage > 0) {
      this.setState({ currentPage: Number(clickedPage) });
    }
  }

  setProperties = () => {
    const rowsPerPage = this.getRowsPerPage(),
      elementsPerRow = this.getElementsPerRow();
    
    if (rowsPerPage !== this.state.rowsPerPage) {
      const pagesCount = Math.ceil(this.state.totalRows / rowsPerPage);
      
      this.setState({
        rowsPerPage,
        pagesCount,
        currentPage: 1
      });
    }
    
    if (elementsPerRow !== this.state.elementsPerRow) {
      const totalRows = Math.ceil(this.state.elementsCount / elementsPerRow),
        pagesCount = Math.ceil(totalRows / rowsPerPage);
      
      this.setState({
        elementsPerRow,
        totalRows,
        pagesCount,
        currentPage: 1
      });
    }
  }
  
  getRowsPerPageBasedOnWindowHeight() {
    const windowHeight = window.innerHeight;
    let rowsPerPage = 3;

    if (windowHeight >= 1500) {
      rowsPerPage = 4;
    }

    return rowsPerPage;
  }

  getRowsPerPage = () => {
    const { pathname } = window.location;
    const coefficient = this.getRowsPerPageBasedOnWindowHeight();

    if (pathname.includes("manage")) {
      if (pathname.includes("admins")) {
        return coefficient * 4;
      }
      if (pathname.includes("books")) {
        return coefficient * 2;
      }
    } 
    
    return coefficient;
  }
 
  getElementsPerRowBasedOnWindowWidth() {
    const windowWidth = window.innerWidth;
    let elementsPerRow = 1;

    if (windowWidth >= 2560) {
      elementsPerRow = 6;
    } else if (windowWidth >= 1920) {
      elementsPerRow = 5;
    } else if (windowWidth >= 1024) {
      elementsPerRow = 4;
    } else if (windowWidth >= 768) {
      elementsPerRow = 3;
    } else if (windowWidth >= 576) {
      elementsPerRow = 2;
    }

    return elementsPerRow;
  }

  getElementsPerRow = () => {
    const { pathname } = window.location;

    if (pathname.includes("manage")) {
      return 1;
    } else {
      return this.getElementsPerRowBasedOnWindowWidth();
    }
  }

  createPage(tabIndex, pageKey, pageNumber, active = "") {
    return (
      <li 
        key={pageKey} 
        className={`page cursor-pointer ${active}`} 
        tabIndex={tabIndex} 
        onClick={this.onPageClick}
      >
        {pageNumber}
      </li>
    );
  }

  createPages(startIndex, endIndex) {
    const { currentPage } = this.state;
    let pages = [];

    for (let i = startIndex; i <= endIndex; ++i) {
      i === currentPage
      ? pages.push(this.createPage(0, i, i, "active"))
      : pages.push(this.createPage(0, i, i));
    }

    return pages;
  }

  atLastPage() {
    const { currentPage, pagesCount } = this.state;

    return currentPage === pagesCount;
  }

  currentPageAmongTheFirst() {
    const { currentPage: currentPageNumber, maxPagesOnAnySideOfCurrentPage } = this.state;
    const firstPage = 1, currentPage = 1;
    const numberOfFirstNPages = firstPage + maxPagesOnAnySideOfCurrentPage + currentPage;
    
    return currentPageNumber <= numberOfFirstNPages;
  }

  createTheFirstPages() {
    const { pagesCount, currentPage, maxPagesOnAnySideOfCurrentPage } = this.state;
    let pages = [];

    pages.push(this.createPages(1, currentPage + maxPagesOnAnySideOfCurrentPage));
    pages.push(this.createPage(-1, -1, "..."));
    pages.push(this.createPage(pagesCount, pagesCount, pagesCount));

    return pages;
  }

  currentPageAmongTheMiddle() {
    const { currentPage: currentPageNumber, maxPagesOnAnySideOfCurrentPage, pagesCount } = this.state;
    const firstPage = 1, currentPage = 1, lastPage = 1;
    const numberOfFirstNPages = firstPage + maxPagesOnAnySideOfCurrentPage + currentPage;
    const numberOfLastNPages = pagesCount - maxPagesOnAnySideOfCurrentPage - lastPage;

    return currentPageNumber > numberOfFirstNPages 
      && currentPageNumber < numberOfLastNPages;
  }

  createTheMiddlePages() {
    const { pagesCount, currentPage, maxPagesOnAnySideOfCurrentPage } = this.state;
    let pages = [];

    pages.push(this.createPage(1, 1, 1));
    pages.push(this.createPage(-1, -1, "..."));
    pages.push(this.createPages(currentPage - maxPagesOnAnySideOfCurrentPage, currentPage + maxPagesOnAnySideOfCurrentPage));
    pages.push(this.createPage(-2, -2, "..."));
    pages.push(this.createPage(pagesCount, pagesCount, pagesCount));

    return pages;
  }

  currentPageAmongTheLast() {
    const { currentPage: currentPageNumber, maxPagesOnAnySideOfCurrentPage, pagesCount } = this.state;
    const lastPage = 1;
    const numberOfLastNPages = pagesCount - maxPagesOnAnySideOfCurrentPage - lastPage;

    return currentPageNumber >= numberOfLastNPages;
  }

  createTheLastPages() {
    const { pagesCount, currentPage, maxPagesOnAnySideOfCurrentPage } = this.state;
    let pages = [];

    pages.push(this.createPage(1, 1, 1));
    pages.push(this.createPage(-1, -1, "..."));
    pages.push(this.createPages(currentPage - maxPagesOnAnySideOfCurrentPage, pagesCount));

    return pages;
  }

  renderPages() {
    const { pagesCount } = this.state;

    if (pagesCount < 2) return null;
    if (pagesCount <= 10) {
      return this.createPages(1, pagesCount);
    } else {
      if (this.state.currentPage < 0) return null;
      if (this.currentPageAmongTheFirst()) {
        return this.createTheFirstPages();
      } 
      else if (this.currentPageAmongTheMiddle()) {
        return this.createTheMiddlePages();
      } 
      else if (this.currentPageAmongTheLast()) {
        return this.createTheLastPages();
      }
    }
  }

  getElementsForCurrentPage() {
    const { rowsPerPage, elementsPerRow, currentPage } = this.state;
    const from = (currentPage - 1) * rowsPerPage * elementsPerRow;

    if (!this.atLastPage()) {
      const to = currentPage * rowsPerPage * elementsPerRow;
      return this.state.elements.slice(from, to);
    }
    
    return this.state.elements.slice(from);
  }

  renderElements() {
    const elements = this.getElementsForCurrentPage();
    const { elementsType: Component, action } = this.state;

    return elements.map(element => (
      <Component 
        key={element.apiID || element.id} 
        data={element} 
        action={action} 
      />
    ));
  }

  render() {
    return (
      <React.Fragment>
        {this.renderElements()}
        <div className="pagination-container">
          <ul className="pagination">
            {this.renderPages()}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Pagination;
