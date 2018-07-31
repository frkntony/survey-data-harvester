import React, { Component } from 'react'
const firebase = require('firebase')
const uuid = require('uuid')

// firebase config
const config = {
  apiKey: "AIzaSyCbrDe6FYXPecOe_yWTTn6HWscgeyLwvuI",
  authDomain: "survey-data-harvester.firebaseapp.com",
  databaseURL: "https://survey-data-harvester.firebaseio.com",
  projectId: "survey-data-harvester",
  storageBucket: "survey-data-harvester.appspot.com",
  messagingSenderId: "106669869699"
};
firebase.initializeApp(config);

export default class Harvester extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      uid: uuid.v1(), // time-based
      fullName: '',
      isSubmitted: false,
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      }

    } // this.state


  } // constructor 

  
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState( {fullName: this.refs.name.value}, () => console.log(this.state) )
  }
  
  render() {

    let nameGreetings;
    let formQuestions;

    if (this.state.fullName === '' && this.state.isSubmitted === false) {
      nameGreetings =
      <div>
        <h1>What's your name, buddy?</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholed='enter your name' ref='name'/>
        </form>
      </div>;
      formQuestions = ''
    } else if (this.state.fullName !== '' && this.state.isSubmitted === false) {
      nameGreetings = <h1>Welcome to personal data harvester, {this.state.fullName} </h1>
      formQuestions = <p>TO:DO questions</p>
    }

    return (
      <div>
        {nameGreetings}

        {formQuestions}
      </div>
    )
  }
}
