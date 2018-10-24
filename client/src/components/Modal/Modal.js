import React, { Component } from "react";
import ReactDOM from "react-dom";

import AddPath from "../AddPath/AddPath";
import "./Modal.css";

export default class Modal extends Component {
  componentWillMount() {
    this.newElem = document.createElement("div");
    document.body.appendChild(this.newElem);
  }

  componentWillUnmount() {
    document.body.removeChild(this.newElem);
  }

  render() {
    return ReactDOM.createPortal(
      <div>
        <div className="modal">
          <div className="modal-content">
            <AddPath onClose={this.props.onClose} />
          </div>
        </div>
      </div>,
      this.newElem
    );
  }
}
