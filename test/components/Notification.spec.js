import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import React from 'react';
import Notification from 'components/Notification';

chai.use(chaiEnzyme());

describe('Notification Component', () => {
  it('should render notification', () => {
    const notification = { message: 'message-1', type: 'type-1' };
    const wrapper = mount(
      <Notification notification= { notification } />
    );
    expect(wrapper.find('.notification--type-1').find('.message').text()).to.eql('message-1');
  });

  it('should not render notification', () => {
    const notification = { };
    const wrapper = mount(
      <Notification notification= { notification } />
    );
    expect(wrapper).to.be.blank();
  });
});
