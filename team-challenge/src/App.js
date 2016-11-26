import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';

class App extends Component {
  render() {
    return (
      <div className="App container well">
        <div className="App-header">
          <h1>Sign Up</h1>
          <p>Our Service is fun and awesome, but you must be 13 years old to join.</p>
        </div>
        <br />
        <SignUpForm />
      </div>
    );
  }
}

export default App;
