import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";

class AddForm extends Component {
  state = {
    title: "",
    shortDesc: "",
    fullDesc: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, shortDesc, fullDesc } = this.state;

    if (title === "") {
      this.setState({ errors: { title: "Title is required!" } });
      return;
    }

    if (shortDesc === "") {
      this.setState({
        errors: { shortDesc: "Short Description is required!" }
      });
      return;
    }

    if (shortDesc.length > 160) {
      this.setState({
        errors: { shortDesc: "Short Description 160!" }
      });
      return;
    }

    if (fullDesc === "") {
      this.setState({ errors: { fullDesc: "Full Description is required!" } });
      return;
    }

    const newPath = {
      title,
      shortDesc,
      fullDesc
    };

    const { firestore } = this.props;
    firestore.add({ collection: "paths" }, newPath);

    this.props.onClose();

    this.setState({
      title: "",
      shortDesc: "",
      fullDesc: "",
      errors: {}
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, shortDesc, fullDesc, errors } = this.state;

    return (
      <div className="row">
        <form onSubmit={this.onSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={this.onChange}
                error={errors.title}
              />
              <label htmlFor="title">
                {!errors.title ? "Title" : errors.title}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                name="shortDesc"
                id="shortDesc"
                value={shortDesc}
                onChange={this.onChange}
                error={errors.shortDesc}
                className="materialize-textarea"
              />
              <label htmlFor="shortDesc">
                {!errors.shortDesc ? "Short Description" : errors.shortDesc}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                name="fullDesc"
                id="fullDesc"
                value={fullDesc}
                onChange={this.onChange}
                error={errors.fullDesc}
                className="materialize-textarea"
              />
              <label htmlFor="fullDesc">
                {!errors.fullDesc ? "Full Description" : errors.fullDesc}
              </label>
            </div>
          </div>
          <input
            className="waves-effect waves-light btn-large"
            type="submit"
            value="Add Path"
          />
        </form>
      </div>
    );
  }
}

export default firestoreConnect()(AddForm);
