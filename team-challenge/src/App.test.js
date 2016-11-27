import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm from './TeamSignUp.js';
import {shallow} from 'enzyme';
import sinon from 'sinon.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

/*describe('email address input', () => {
  const wrapper = shallow(<EmailInput />);
  var input = wrapper.find('input');
  var handleChangeSpy = sinon.spy(EmailInput.prototype, 'handleChange');

  it('shows email blank error if email is blank', () => {
    input.simulate('change', {target:{value:''}});
  });

  it('shows email valid error if email is invalid', () => {
    input.simulate('change', {target:{value:'ryan'}});
  });

  it('does not show any errors when given a valid email', () => {
    input.simulate('change', {target:{value:'ry.magee@rocketmail.com'}})
  });
});

describe('birthday input', () => {
  const wrapper = shallow(<BirthdayInput />);
  var input = wrapper.find('input');
  var handleChangeSpy = sinon.spy(BirthdayInput.prototype, 'handleChange');

  it('shows a birthday required message if birthday is left blank', () => {
    input.simulate('change', {target:{value:''}});
  });

  it('shows an error if an invalid date is entered', () => {
    input.simulate('change', {target:{value:'407/199/202'}});
  });

  it('shows an error if the person is not above the age of 13', () => {
    input.simulate('change', {target:{value:'09/07/2010'}});
  });

  it('does not show an error if a valid date is entered', () => {
    input.simulate('change', {target:{value:'09/18/1995'}});
  });
});*/