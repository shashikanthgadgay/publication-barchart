import React, { Component, PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';
import groupBy from 'lodash/groupBy';
import { highChartUtils } from 'utils/highChartUtils';

export default class BarChart extends Component {

  constructor(props) {
    super(props);
    highChartUtils.setTheme(ReactHighcharts);
  }

  groupPublications(publications) {
    return groupBy(publications, 'pubYear');
  }

  render() {
    const { publications } = this.props;
    if (publications.length > 0) {
      const config = highChartUtils.getConfig(this.groupPublications(publications));
      return (
        <div className="chart-container">
          <ReactHighcharts config = {config} />
        </div>
      );
    }
    return null;
  }
}

BarChart.propTypes = {
  publications: PropTypes.array.isRequired,
};
