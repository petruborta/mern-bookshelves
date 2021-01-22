import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import store from '../../store';

function Announcement(props) {
  const [display, setDisplay] = useState("flex");
  const history = useHistory();
  const location = useLocation();
  const pathToSuggestBook = "/dashboard/suggest-book";
  const { title, description } = props.data;
  
  function userIsAuthenticated() {
    let state = store.getState();
    const { isAuthenticated } = state.auth;
    
    return isAuthenticated;
  }

  store.subscribe(userIsAuthenticated);
  
  function atSuggestBookPage() {
    return location.pathname === pathToSuggestBook;
  }

  function announcementIsVisible() {
    return display === "flex";
  }

  function closeAnnouncement() {
    return setDisplay("none");
  }

  function redirectTo(path, e) {
    if (!e.target.className.includes("close")) {
      history.push(path);
      if (userIsAuthenticated()) {
        closeAnnouncement();
      }
    }
  }

  if (userIsAuthenticated() && atSuggestBookPage() && announcementIsVisible()) {
    closeAnnouncement();
  }

  return (
    <div 
      className="container announcement sub-nav cursor-pointer"
      style={{display:display}}
      onClick={(e) => redirectTo(pathToSuggestBook, e)}
    >
      <i className="material-icons megaphone">
        campaign
      </i>
      <div className="announcement-content flex-col">
        <h4>{title}</h4>
        <h4>{description}</h4>
      </div>
      <span
        className="material-icons close cursor-pointer"
        onClick={closeAnnouncement}
      >
        clear
      </span>
    </div>
  );
}

export default Announcement;
