import React, { Component } from "react";

class Confirm extends Component {
  static show(data) {
    Confirm.__singletonRef.__show(data);
  }

  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      title: "",
      description: {},
      callback: null
    };
    Confirm.__singletonRef = this;
  }

  __show = ({ title, description, callback }) => {  
    this.setState({
      dialogIsOpen: true,
      title,
      description,
      callback
    });
  }

  __hide = () => {
    this.setState({
      dialogIsOpen: false,
      title: "",
      description: {},
      callback: null
    });
  }

  __confirm = () => {
    this.state.callback();
    this.__hide();
  }

  clickedOnModal = e => e.target.className.includes("modal");

  render() {
    const { dialogIsOpen, title, description } = this.state;
    const { prefix, main, suffix } = description;
    
    return (
      <React.Fragment>
        {dialogIsOpen && (
          <div 
            className="modal"
            onClick={(e) => this.clickedOnModal(e) && this.__hide() }
          >
            <div className="modal-content">
              <h5>{title}</h5>
              <p>{prefix} <b>{main}</b> {suffix}</p>

              <button onClick={this.__hide}>Cancel</button>
              <button onClick={this.__confirm}>OK</button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Confirm;
