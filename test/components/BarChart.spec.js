import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import BarChart from 'components/BarChart.jsx';

chai.use(chaiEnzyme());

describe('BarChart Component', () => {
  it('should render null if publications are not available', () => {
    const wrapper = mount(
      <BarChart publications={[]} />
    );
    expect(wrapper).to.be.blank();
  });

  it('should render bar chart component', () => {
    const publications = [{ id: 1, title: 'someName', pubYear: 1999 }];
    const wrapper = shallow(
      <BarChart publications={publications} />
    );
    expect(wrapper.find('div').at(0).props().className).to.eql('chart-container');
  });
});
