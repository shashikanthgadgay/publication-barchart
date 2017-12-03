import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { PublicationsContainer } from 'components/PublicationsContainer.jsx';
import sinon from 'sinon';
import { httpInterceptor } from 'utils/httpInterceptor';
import { constants } from 'src/constants';

chai.use(chaiEnzyme());

describe('PublicationsContainer', () => {
  const publications = {
    resultList: {
      result: [
        {
          id: 1,
          title: 'name-1',
          pubYear: 1992,
        },
        {
          id: 2,
          title: 'name-2',
          pubYear: 2010,
        },
      ],
    },
  };

  it('should render Container', () => {
    const wrapper = mount(<PublicationsContainer />);

    const form = wrapper.find('Form');
    expect(form).to.have.prop('getPublications');

    const notification = wrapper.find('Notification');
    expect(notification).to.have.prop('notification');
  });

  it('should fetch publications and render bar chart', (done) => {
    const url = `${constants.searchUrl}?query=title:name&format=json&pageSize=1000`;
    sinon.stub(httpInterceptor, 'get').callsFake(() => Promise.resolve(publications));
    const wrapper = mount(<PublicationsContainer />);
    const getPublications = wrapper.find('Form').props().getPublications;
    const barChart = wrapper.find('BarChart');
    getPublications('name', undefined);
    setTimeout(() => {
      expect(barChart.prop('publications')).to.eql(publications.resultList.result);
      httpInterceptor.get.restore();
      done();
    }, 500);

    sinon.assert.calledWith(httpInterceptor.get, url);
  });

  it('should show error message when api throws an error', (done) => {
    const url = `${constants.searchUrl}?query=title:name&format=json&pageSize=1000`;
    sinon.stub(httpInterceptor, 'get').callsFake(() => Promise.reject({ message: 'Some Error' }));
    const wrapper = mount(<PublicationsContainer />);
    const getPublications = wrapper.find('Form').props().getPublications;
    const notification = wrapper.find('Notification');
    getPublications('name', undefined);
    setTimeout(() => {
      expect(notification.prop('notification')).to.eql({ type: 'error', message: 'Some Error' });
      httpInterceptor.get.restore();
      done();
    }, 500);

    sinon.assert.calledWith(httpInterceptor.get, url);
  });
});
