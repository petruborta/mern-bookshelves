import React, { Component } from "react";

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      dialogIsOpen: false,
      callback: null
    }
  }

  showDialog = callback => {  
    this.setState({
      dialogIsOpen: true,
      callback: () => callback()
    });
  };

  hideDialog = () => {
    this.setState({
      dialogIsOpen: false,
      callback: null
    });
  };

  confirm = () => {
    this.state.callback();
    this.hideDialog();
  };

  clickedOnModal = e => e.target.className.includes("modal");

  render() {
    const { title, description } = this.props;
    const { prefix, main, suffix } = description;
    
    return (
      <React.Fragment>
        {this.props.children(this.showDialog)}

        {this.state.dialogIsOpen && (
          <div 
            className="modal"
            onClick={(e) => this.clickedOnModal(e) && this.hideDialog() }
          >
            <div className="modal-content">
              <h5>{title}</h5>
              <p>{prefix} <b>{main}</b> {suffix}</p>

              <button onClick={this.hideDialog}>Cancel</button>
              <button onClick={this.confirm}>OK</button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Confirm;