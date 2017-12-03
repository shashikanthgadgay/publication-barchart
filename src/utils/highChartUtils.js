import maxBy from 'lodash/maxBy';

export const highChartUtils = {
  setTheme: (reactHighCharts) => {
    reactHighCharts.Highcharts.theme = { // eslint-disable-line no-param-reassign
      colors: ['#f45b5b'],
      chart: {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40'],
          ],
        },
        style: {
          fontFamily: '\'Unica One\', sans-serif',
        },
        plotBorderColor: '#606063',
      },
      title: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px',
        },
      },
      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
        },
      },
      xAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3',
          },
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
          style: {
            color: '#A0A0A3',

          },
        },
      },
      yAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3',
          },
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          style: {
            color: '#A0A0A3',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0',
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            color: '#B0B0B3',
          },
          marker: {
            lineColor: '#333',
          },
        },
      },
      legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      background2: '#505053',
      dataLabelsColor: '#B0B0B3',
      textColor: '#C0C0C0',
      contrastTextColor: '#F0F0F3',
      maskColor: 'rgba(255,255,255,0.3)',
    };
    reactHighCharts.Highcharts.setOptions(reactHighCharts.Highcharts.theme);
  },

  getMostCited(publications) {
    return maxBy(publications, 'citedByCount');
  },

  getCountByYear(publications) {
    const publicationsByYear = [];
    Object.keys(publications).forEach((year) => {
      publicationsByYear.push({
        y: publications[year].length,
        mostCited: highChartUtils.getMostCited(publications[year]),
      });
    });
    return publicationsByYear;
  },

  getCategories(publications) {
    return Object.keys(publications);
  },

  getConfig: (publications) => {
    const config = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Number of publications per year',
      },
      xAxis: {
        categories: highChartUtils.getCategories(publications),
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of publications',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter() {
          return `Total publications: <b>${this.point.y}</b> <br/>`
            + 'Most Cited Publication:<br/>' +
            `Title: <b>${this.point.mostCited.title}</b> <br/>` +
            `Number of Times Cited: <b>${this.point.mostCited.citedByCount}</b>`;
        },
      },
      series: [{
        name: 'Publications',
        data: highChartUtils.getCountByYear(publications),
      }],
    };
    return config;
  },
};
