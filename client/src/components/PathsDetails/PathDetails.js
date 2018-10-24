import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class PathDetails extends Component {
  onDeletePath = () => {
    const { path, firestore } = this.props;
    firestore.delete({ collection: "paths", doc: path.id });
  };
  render() {
    const { path } = this.props;
    if (path) {
      return (
        <div>
          <div className="card" />
          <div className="card-content">
            <ul>
              <h4>{path.title}</h4>
              <p>{path.shortDesc}</p>
              <p>{path.fullDesc}</p>
            </ul>
          </div>
          <div className="card-action">
            <button
              className="waves-effect waves-teal btn-flat"
              onClick={this.onDeletePath}
            >
              Delete Path
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "paths", storeAs: "path", doc: props.pathId }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    path: ordered.path && ordered.path[0]
  }))
)(PathDetails);
