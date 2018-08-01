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

  handleQuestions = (e) => {
    e.preventDefault()
    this.setState( {
      answers: {
        answer1 : this.refs.formQ1.value,
        answer2 : this.refs.formQ2.value,
        answer3 : this.refs.formQ3.value
      }
    }, () => {
      firebase.database().ref('surveyAnswers/' + this.state.uid).set({
        // setup my data in firebase
        fullName: this.state.fullName,
        answers: this.state.answers
      })
    })
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
      formQuestions = <div>

        <form onSubmit={this.handleQuestions}>
          <label htmlFor='formQ1'><p>Where do you live?</p></label>
          <input id='formQ1' ref='formQ1' type='text' placeholder='I live...' />
          <br />
          <label htmlFor='formQ2'><p>What are your guilty pleasures?</p></label>
          <input id='formQ2' ref='formQ2' type='text' placeholder='My guilty pleasures are...' />
          <br />
          <label htmlFor='formQ3'><p>How much money do you make?</p></label>
          <input id='formQ3' ref='formQ3' type='text' placeholder='I make...' />
          <button type='submit'>Submit</button>
        </form>

      </div>
    }

    return (
      <div>
        {nameGreetings}

        {formQuestions}
      </div>
    )
  }
}
