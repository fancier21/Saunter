import React, { Component } from "react";
import Modal from "../Modal/Modal";

export default class Header extends Component {
  state = {
    isModalOpen: false
  };

  toggleModal = () => {
    this.setState(state => ({ isModalOpen: !this.state.isModalOpen }));
  };

  render() {
    return (
      <div>
        <main>
          <nav>
            <div
              className="nav-wrapper white darken-2"
              style={{ padding: " 0 10px 0 10px" }}
            >
              <span className="brand-logo" style={{ color: "#000000" }}>
                Saunter
              </span>
              <ul className="right">
                <li>
                  <button
                    className="waves-effect waves-teal btn-flat"
                    onClick={this.toggleModal}
                  >
                    {!this.state.isModalOpen ? "Add Path" : "Close"}
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          {this.state.isModalOpen && <Modal onClose={this.toggleModal} />}
        </main>
      </div>
    );
  }
}
