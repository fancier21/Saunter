import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import PathDetails from "../PathsDetails/PathDetails";

class ItemList extends Component {
  state = {
    term: "",
    pathId: ""
  };

  onSelectedPath = id => {
    this.setState({ pathId: id });
  };

  renderItems(visibleItems) {
    return visibleItems.map(path => (
      <div key={path.id} onClick={() => this.onSelectedPath(path.id)}>
        <ul className="collection with-header">
          <li className="collection-item">
            <div>
              {path.title}
              <span href="#!" className="secondary-content">
                <i className="material-icons">send</i>
              </span>
            </div>
          </li>
        </ul>
      </div>
    ));
  }

  onSearchChange = e => {
    const term = e.target.value;
    this.setState({ term });
  };

  renderSearchPanel() {
    return (
      <input
        value={this.state.term}
        onChange={this.onSearchChange}
        placeholder="Search"
      />
    );
  }

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  render() {
    const { paths } = this.props;
    const { term } = this.state;

    const visibleItems = this.search(paths, term);

    const pathsList = !isLoaded(paths)
      ? "Loading"
      : isEmpty(paths)
        ? "List is empty"
        : this.renderItems(visibleItems);
    return (
      <div className="container" style={{ paddingTop: "20px" }}>
        <div className="row">
          <div className="col s6">
            <div>
              <div>{this.renderSearchPanel()}</div>
              <div>{pathsList}</div>
            </div>
          </div>
          <div className="col s6" style={{ paddingTop: "15px" }}>
            <PathDetails pathId={this.state.pathId} />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect([{ collection: "paths" }]),
  connect(state => ({
    paths: state.firestore.ordered.paths
  }))
)(ItemList);
