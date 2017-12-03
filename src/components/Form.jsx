import React, { Component, PropTypes } from 'react';

export default class Form extends Component {

  constructor() {
    super();
    this.state = { title: undefined, fromYear: undefined, toYear: undefined };
    this.createForm = this.createForm.bind(this);
  }

  setTitle(title) {
    if (title && title.trim().length > 0) {
      this.setState({ title });
    }
  }

  setFromYear(year) {
    const fromYear = year && year.trim().length > 0 ? year : undefined;
    this.setState({ fromYear });
  }

  setToYear(year) {
    const toYear = year && year.trim().length > 0 ? year : undefined;
    this.setState({ toYear });
  }

  createForm(e) {
    e.preventDefault();
    const { title, fromYear, toYear } = this.state;
    const yearRange = (fromYear && toYear) ? `[${fromYear} TO ${toYear}]` : undefined;
    this.props.getPublications(title, yearRange);
  }

  render() {
    return (
      <div className="input-form">
        <form onSubmit={(e) => this.createForm(e)}>
          <div className="row">
            <div className="col-25">
              <label>Title</label>
            </div>
            <div className="col-75">
              <input onChange={(e) => this.setTitle(e.target.value)} required type="text" />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Year Range</label>
            </div>
            <div className="col-75">
              <input onChange={(e) => this.setFromYear(e.target.value)} type="text" />
              <span> to </span>
              <input onChange={(e) => this.setToYear(e.target.value)} type="text" />
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  getPublications: PropTypes.func.isRequired,
};
