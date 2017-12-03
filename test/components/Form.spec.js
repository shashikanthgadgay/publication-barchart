import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import Form from 'components/Form.jsx';
import sinon from 'sinon';

chai.use(chaiEnzyme());

describe('Form Component', () => {
  const getPublicationsSpy = sinon.spy();

  it('should render the form', () => {
    const wrapper = mount(
      <Form getPublications={getPublicationsSpy} />
    );
    expect(wrapper).to.have.descendants('form');
    expect(wrapper).to.have.exactly(4).descendants('input');
    expect(wrapper.find('label').at(0).text()).to.eql('Title');
    expect(wrapper.find('label').at(1).text()).to.eql('Year Range');
  });

  it('should set title to state', () => {
    const wrapper = mount(
      <Form getPublications={getPublicationsSpy} />
    );
    wrapper.find('input').at(0).simulate('change', { target: { value: 'some title' } });
    expect(wrapper.state().title).to.eql('some title');
  });

  it('should set fromYear to state', () => {
    const wrapper = mount(
      <Form getPublications={getPublicationsSpy} />
    );
    wrapper.find('input').at(1).simulate('change', { target: { value: '2010' } });
    expect(wrapper.state().fromYear).to.eql('2010');

    wrapper.find('input').at(1).simulate('change', { target: { value: undefined } });
    expect(wrapper.state().fromYear).to.eql(undefined);
  });

  it('should set toYear to state', () => {
    const wrapper = mount(
      <Form getPublications={getPublicationsSpy} />
    );
    wrapper.find('input').at(2).simulate('change', { target: { value: '2017' } });
    expect(wrapper.state().toYear).to.eql('2017');

    wrapper.find('input').at(2).simulate('change', { target: { value: undefined } });
    expect(wrapper.state().toYear).to.eql(undefined);
  });


  it('should submit the form with only title', () => {
    const wrapper = mount(
      <Form getPublications={getPublicationsSpy} />
    );
    const onSubmit = wrapper.find('form').props().onSubmit;
    wrapper.find('input').at(0).simulate('change', { target: { value: 'some title' } });
    onSubmit({ preventDefault: () => {} });
    sinon.assert.calledOnce(getPublicationsSpy.withArgs('some title', undefined));
  });

  it('should submit the form with title and year range', () => {
    const wrapper = mount(
      <Form getPublications={getPublicationsSpy} />
    );
    const onSubmit = wrapper.find('form').props().onSubmit;
    wrapper.find('input').at(0).simulate('change', { target: { value: 'some title' } });
    wrapper.find('input').at(1).simulate('change', { target: { value: '2015' } });
    wrapper.find('input').at(2).simulate('change', { target: { value: '2017' } });

    onSubmit({ preventDefault: () => {} });
    sinon.assert.calledOnce(getPublicationsSpy.withArgs('some title', '[2015 TO 2017]'));
  });
});
