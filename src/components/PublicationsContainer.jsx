import React, { Component } from 'react';
import { httpInterceptor } from 'utils/httpInterceptor';
import Notification from 'components/Notification';
import Spinner from 'components/Spinner';
import Form from 'components/Form.jsx';
import BarChart from 'components/BarChart.jsx';
import { constants } from 'src/constants';
import get from 'lodash/get';

export class PublicationsContainer extends Component {

  constructor() {
    super();
    this.state = { publications: [], notification: {}, loading: false };
    this.getPublications = this.getPublications.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setState = this.setState.bind(this);
  }

  getPublications(title, yearRange) {
    this.setState({ loading: true });
    const query = yearRange ? `title:${title} AND PUB_YEAR:${yearRange}` : `title:${title}`;
    httpInterceptor
      .get(`${constants.searchUrl}?query=${query}&format=json&pageSize=1000`)
      .then((data) => {
        const publications = data && data.resultList ? data.resultList.result : [];
        if (publications.length === 0) {
          this.setMessage('No publications matching the search criteria',
            constants.responseType.error);
        }
        this.setState({ publications, loading: false });
      })
      .catch((error) => {
        this.showErrors(error);
        this.setState({ loading: false });
      });
  }

  setMessage(message, type) {
    const errorNotification = { message, type };
    this.setState({ notification: errorNotification });
    setTimeout(() => {
      this.setState({ notification: {} });
    }, constants.toastTimeout);
  }

  showErrors(error) {
    if (error.response) {
      error.response.text().then((data) => {
        const message = get(data, 'error.message') || error.message;
        this.setMessage(message, constants.responseType.error);
      });
    } else {
      this.setMessage(error.message, constants.responseType.error);
    }
  }

  render() {
    return (
      <div className="publications-container">
        <h2>Publication histogram with High Charts</h2>
        <Spinner show={this.state.loading} />
        <Notification
          notification={this.state.notification}
        />
        <Form
          getPublications={this.getPublications}
        />
        <BarChart publications={this.state.publications} />
      </div>
    );
  }
}

export default PublicationsContainer;
