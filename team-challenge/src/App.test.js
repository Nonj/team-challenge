import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TeamSignUp from './TeamSignUp';
import { EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput } from './TeamSignUp';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('email address input', () => {
  var validateSpy = sinon.spy(EmailInput.prototype, 'validate');

  it('shows email blank error if email is blank', () => {
    
    const wrapper = shallow(<EmailInput value={''} />);

    //check that validate method returned correctly
    var returnedMissing = validateSpy.returned({ missing: true, isValid: false });
    expect(returnedMissing).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-missing')).toEqual(true);
  });

  it('shows email valid error if email is invalid', () => {

    const wrapper = shallow(<EmailInput value='ryan' />);

    //check that validate method returned correctly
    var returnedInvalid = validateSpy.returned({ invalidEmail: true, isValid: false });
    expect(returnedInvalid).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-invalid')).toEqual(true);
  });

  it('does not show any errors when given a valid email', () => {

    const wrapper = shallow(<EmailInput value={'ryanmagee47@gmail.com'} />);

    //check that validate method returned correctly
    var returnedValid = validateSpy.returned({ isValid: true });
    expect(returnedValid).toEqual(true);

    //check that the error paragraph did not render
    expect(wrapper.find('p').length).toEqual(0);
  });
});

describe('birthday input', () => {
  var validateSpy = sinon.spy(BirthdayInput.prototype, 'validate');

  it('shows a birthday required message if birthday is left blank', () => {

    const wrapper = shallow(<BirthdayInput value ={''} />);

    //check that validate method returned correctly
    var returnedMissing = validateSpy.returned({ missing: true, isValid: false });
    expect(returnedMissing).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-missing')).toEqual(true);
  });

  it('shows an error if an invalid date is entered', () => {

    const wrapper = shallow(<BirthdayInput value={'hello'} />);

    ////check that validate method returned correctly
    var returnedInvalid = validateSpy.returned({ notDate: true, isValid: false });
    expect(returnedInvalid).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-invalid')).toEqual(true);
  });

  it('shows an error if the person is not above the age of 13', () => {

    const wrapper = shallow(<BirthdayInput value={'11/21/2010'} />);

    //check that validate returned correctly
    var returnedUnderage = validateSpy.returned({ notOldEnough: true, isValid: false });
    expect(returnedUnderage).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(1);

    //check that the error displayed is the correct error
    expect(wrapper.find('p').hasClass('help-block error-not-old')).toEqual(true);
  });

  it('does not show an error if a valid date is entered', () => {

    const wrapper = shallow(<BirthdayInput value={'09/18/1995'} />);

    //check that validate returned correctly
    var returnedValid = validateSpy.returned({ isValid: true });
    expect(returnedValid).toEqual(true);

    //check that the error paragraph rendered
    expect(wrapper.find('p').length).toEqual(0);
  });
});


describe('RequiredInput name & password component', () => {
  var validationSpy = sinon.spy(RequiredInput.prototype, 'validate');

  it('show an error if the name is blank', () => {
    const wrapper = shallow(<RequiredInput value={''} />);

    var returnMissing = validationSpy.returned({ required: true, isValid: false });
    expect(returnMissing).toEqual(true);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').hasClass('help-block error-missing')).toEqual(true);
  });

  it('does not show an error if a name is entered', () => {
    const wrapper = shallow(<RequiredInput value={'Darryl'} />);

    var returnValid = validationSpy.returned({ isValid: true });
    expect(returnValid).toEqual(true);
    expect(wrapper.find('p').length).toEqual(0);
  });

  it('should show an error if the password is blank', () => {
    const wrapper = shallow(<RequiredInput value={''} />);

    var returnMissing = validationSpy.returned({ required: true, isValid: false });
    expect(returnMissing).toEqual(true);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').hasClass('help-block error-missing')).toEqual(true);
  });

   it('does not show an error if a password is entered', () => {
    const wrapper = shallow(<RequiredInput value={'Password'} />);

    var returnValid = validationSpy.returned({ isValid: true });
    expect(returnValid).toEqual(true);
    expect(wrapper.find('p').length).toEqual(0);
  }); 
});

describe('PasswordConfirmationInput component', () => {
  var validationSpy = sinon.spy(PasswordConfirmationInput.prototype, 'validate');

  it('sees whether the form is empty', () => {
    const wrapper = shallow(<PasswordConfirmationInput value={''} />);

    var returnMissing = validationSpy.returned({ isValid: true });
    expect(returnMissing).toEqual(true);
    expect(wrapper.find('p').length).toEqual(1);
  });

  it('show an error if the passwords do not match', () => {
    const wrapper = shallow(<PasswordConfirmationInput value={'password'} password={'wordpass'} />)

    var returnMismatch = validationSpy.returned({ mismatched: true, isValid: true });
    expect(returnMismatch).toEqual(true);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').hasClass('help-block error-mismatched')).toEqual(true);
  });
  it('does not show an error if passwords match', () => {
    const wrapper = shallow(<PasswordConfirmationInput value={'password'} password={'password'} />)

    var returnMatch = validationSpy.returned({ isValid: true });
    expect(returnMatch).toEqual(true);
    expect(wrapper.find('p').length).toEqual(0);
  });
});


describe('reset button functionality', () => {
  let wrapper;
  let handleResetSpy;
  // create spy
  beforeAll(() => {
    handleResetSpy = sinon.spy(TeamSignUp.prototype, 'handleReset');
  });

  beforeEach(() => {
    wrapper = mount(<TeamSignUp />);
    wrapper.find('EmailInput input').simulate('change', { target: { value: "drew@gmail.com" } });
    wrapper.find('#name input').simulate('change', { target: { value: "Andrew" } });
    wrapper.find('BirthdayInput input').simulate('change', { target: { value: "10/20/1995" } });
    wrapper.find('#password input').simulate('change', { target: { value: "Password123" } });
    wrapper.find('PasswordConfirmationInput input').simulate('change', { target: { value: "Password123" } });
  });
  
  afterEach(() => {
    wrapper = undefined;
    handleResetSpy.reset();
  });

  it('should set form fields to empty', () => {
    wrapper.find('#resetButton').simulate('click', {});
    expect(handleResetSpy.callCount).toEqual(1);
    expect(wrapper.find('EmailInput input').text()).toEqual('');
    expect(wrapper.find('#name input').text()).toEqual('');
    expect(wrapper.find('BirthdayInput input').text()).toEqual('');
    expect(wrapper.find('#password input').text()).toEqual('');
    expect(wrapper.find('PasswordConfirmationInput input').text()).toEqual('');

    expect(wrapper.find('.invalid').reduce((sum, cur) => { return sum + 1 }, 0)).toEqual(4);
  });

  it('should set state to empty', () => {
    wrapper.find('#resetButton').simulate('click', {});
    expect(handleResetSpy.callCount).toEqual(1);
    expect(wrapper.state(['email']).value).toEqual('');
    expect(wrapper.state(['email']).valid).toBeFalsy();
    expect(wrapper.state(['name']).value).toEqual('');
    expect(wrapper.state(['name']).valid).toBeFalsy();
    expect(wrapper.state(['dob']).value).toEqual('');
    expect(wrapper.state(['dob']).valid).toBeFalsy();
    expect(wrapper.state(['password']).value).toEqual('');
    expect(wrapper.state(['password']).valid).toBeFalsy();
    expect(wrapper.state(['passwordConf']).value).toEqual('');
    expect(wrapper.state(['passwordConf']).valid).toBeFalsy();
  });
});


describe('Submit button of form', () => {
  it('should be enabled if all of the forms are valid', () => {
    const wrapper = mount(<TeamSignUp />);
    // valid email consts
    const email = 'mail@yahoo.com';
    const name = 'Non';
    const dob = '12/12/1900';
    const password = 'password';

    // simulate valid inputs
    wrapper.find('#email').simulate('change', { target: { value: email } });
    wrapper.find('#name').simulate('change', { target: { value: name } });
    wrapper.find('#dob').simulate('change', { target: { value: dob } });
    wrapper.find('#password').simulate('change', { target: { value: password } });
    wrapper.find("#passwordConf").simulate('change', { target: { value: password } });
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(false);
  });

  it('should be disabled if any of the forms are invalid', () => {
    const wrapper = mount(<TeamSignUp />);
    // valid email consts
    const email = 'Mail@mail.com';
    const name = 'Non';
    const dob = 'asdf';
    const password = 'password';

    // check email field
    wrapper.find('#email').simulate('change', { target: { value: 'Email' } });
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#email').simulate('change', { target: { value: email } }); // change back to be valid

    // check name field
    wrapper.find('#name').simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#name').simulate('change', { target: { value: name } }); // change back to be valid

    // check date of birth field
    wrapper.find('#dob').simulate('change', { target: { value: 'Luis' } });
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#dob').simulate('change', { target: { value: dob } }); // change back to be valid

    // check password field
    wrapper.find('#password').simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find('#password').simulate('change', { target: { value: password } }); // change back to be valid

    // check same password field
    wrapper.find("#passwordConf").simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
    wrapper.find("#passwordConf").simulate('change', { target: { value: password } }); // change back to be valid
  })

  it('should handle submit callback in App', () => {

    // set up a sinon spy on the handleSubmit callback of the app
    const handleSubmitSpy = sinon.spy(App.prototype, 'handleSubmit');
    const wrapper = mount(<App />);

    // valid form consts
    const email = 'mail@yahoo.com';
    const name = 'Non';
    const dob = '12/12/1900';
    const password = 'password';

    //simulate valid inputs
    wrapper.find('#email').simulate('change', { target: { value: email } });
    wrapper.find('#name').simulate('change', { target: { value: name } });
    wrapper.find('#dob').simulate('change', { target: { value: dob } });
    wrapper.find('#password').simulate('change', { target: { value: password } });
    wrapper.find('#passwordConf').simulate('change', { target: { value: password } });

    wrapper.find('form').simulate('submit');

    expect(handleSubmitSpy.called).toEqual(true); // check the sinon spy
    expect(wrapper.find('.alert-success').length).toEqual(1); // check if the alert showed up

  });

  it('should show the proper alert-success element when submit is clicked', () => {
    const wrapper = mount(<App />);
    // valid form consts
    const email = 'mail@yahoo.com';
    const name = 'Non';
    const dob = '12/12/1900';
    const password = 'password';

    //simulate valid inputs
    wrapper.find('#email').simulate('change', { target: { value: email } });
    wrapper.find('#name').simulate('change', { target: { value: name } });
    wrapper.find('#dob').simulate('change', { target: { value: dob } });
    wrapper.find('#password').simulate('change', { target: { value: password } });
    wrapper.find('#passwordConf').simulate('change', { target: { value: password } });

    wrapper.find('form').simulate('submit');

    expect(wrapper.find('.alert-success').length).toEqual(1); // check if the alert showed up
  });

});
