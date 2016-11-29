import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {SignUpForm, EmailInput, BirthdayInput} from './TeamSignUp.js';
import {shallow} from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('email address input', () => {
  var validateSpy = sinon.spy(EmailInput.prototype, 'validate');
  var updateSpy = sinon.spy();

  it('shows email blank error if email is blank', () => {
    

    const wrapper = shallow(<EmailInput updateParent={updateSpy} value={''} />);

    //check that validate method returned correctly
    var returnedMissing = validateSpy.returned({missing: true, isValid: false});
    expect(returnedMissing).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-missing')).toEqual(true);

    //check that updateParent was called with the correct value
    var expectedReturn = {
      'email': {
        value:"ryan",
        valid:false
      }
    }
    expect(updateSpy.called).toEqual(true);
  });

  it('shows email valid error if email is invalid', () => {

    const wrapper = shallow(<EmailInput value='ryan'/>);

    //check that validate method returned correctly
    var returnedInvalid = validateSpy.returned({invalidEmail:true, isValid:false});
    expect(returnedInvalid).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-invalid')).toEqual(true);

    //check that updateParent was called with the correct value
    
  });

  it('does not show any errors when given a valid email', () => {

    var updateSpy = sinon.spy();

    const wrapper = shallow(<EmailInput value={'ryanmagee47@gmail.com'} updateParent={updateSpy} />);

    //check that validate method returned correctly
    var returnedValid = validateSpy.returned({isValid: true});
    expect(returnedValid).toEqual(true);

    //check that the error paragraph did not render
    expect(wrapper.find('p').length).toEqual(0);

    //check that updateParent was called with the correct value
    expect(updateSpy.called).toEqual(true);

  });
});

describe('birthday input', () => {
  var validateSpy = sinon.spy(BirthdayInput.prototype, 'validate');

  it('shows a birthday required message if birthday is left blank', () => {

    var updateSpy = sinon.spy();

    const wrapper = shallow(<BirthdayInput updateParent={updateSpy} value =''/>);

    //check that validate method returned correctly
    var returnedMissing = validateSpy.returned({missing:true, isValid:false});
    expect(returnedMissing).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-missing')).toEqual(true);

    //check that updateParent was called with the correct value
    expect(updateSpy.called).toEqual(true);
  });

  it('shows an error if an invalid date is entered', () => {

    const wrapper = shallow(<BirthdayInput value ='hello'/>);

    ////check that validate method returned correctly
    var returnedInvalid = validateSpy.returned({notDate:true, isValid:false});
    expect(returnedInvalid).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-invalid')).toEqual(true);

    //check that updateParent was called with the correct value
    
  });

  it('shows an error if the person is not above the age of 13', () => {

    const wrapper = shallow(<BirthdayInput value ='11/21/2010'/>);

    //check that validate returned correctly
    var returnedUnderage = validateSpy.returned({notOldEnough:true, isValid:false});
    expect(returnedUnderage).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-not-old')).toEqual(true);

    //check that updateParent was called with the correct value
    
  });

  it('does not show an error if a valid date is entered', () => {

    const wrapper = shallow(<BirthdayInput value ='09/18/1995'/>);

    //check that validate returned correctly
    var returnedValid = validateSpy.returned({isValid: true});
    expect(returnedValid).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(0);

    //check that updateParent was called with the correct value
    
  });
});