import React, { Component } from "react";

class Alert extends Component {
  static show(message) {
    Alert.__singletonRef.__show(message);
  }

  constructor(props) {
    super(props);
    this.state = {
      display: "none",
      data: "",
      color: "",
      icon: "",
      timeOut: null,
      interval: null,
      remainingTime: 0,
      path: window.location.pathname
    };
    Alert.__singletonRef = this;

    this.totalTime = 3000;
    this.step = 10;
  }

  __show = (message) => {
    if (this.state.path !== window.location.pathname) {
      this.setState({ path: window.location.pathname });
    }

    let status = Object.keys(message)[0], 
      data = message[status], 
      display = "flex", 
      color, 
      icon;
    
    switch(status) {
      case "200":
        color = "success";
        icon = "check_circle";
        break;
      case "400":
      case "404":
      case "409":
        color = "danger";
        icon = "error";
        break;
      case "500":
        data = "Internal server error.";
        color = "danger";
        icon = "cloud_off";
        break;
      default:
    }
    
    this.setState({
      data,
      display,
      color,
      icon
    });

    const { remainingTime, timeOut, interval} = this.state;
    if (remainingTime !== 0) {
      clearTimeout(timeOut);
      clearInterval(interval);
    }

    this.setState({ timeOut: this.startTimeOut() });
  }

  startInterval = () => {
    let pastTime = 0;
    let interval = setInterval(() => {
      pastTime += this.step;
      this.setState({ remainingTime: this.totalTime - pastTime });
      
      if (this.state.path !== window.location.pathname) {
        this.setState({ path: window.location.pathname });
        clearTimeout(this.state.timeOut);
        clearInterval(this.state.interval);
        this.__hide();
      }
    }, this.step);

    return interval;
  }

  startTimeOut = () => {
    let interval = this.startInterval();
    this.setState({ interval });

    let timeOut = setTimeout(() => {
      this.__hide();
      clearInterval(interval);
    }, this.totalTime);

    return timeOut;
  }

  __hide = () => {
    this.setState({ 
      display: "none",
      timeOut: null,
      interval: null,
      remainingTime: 0
    });
  }

  render() {
    const { data, display, color, icon, remainingTime } = this.state;

    return (
      <div className={"alert " + color} style={{display: display}}>
        <i className="material-icons">{icon}</i>
        <p>{data}</p>
        <progress value={remainingTime} max={this.totalTime}></progress>
      </div>
    );
  }
}

export default Alert;
