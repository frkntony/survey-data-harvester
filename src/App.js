import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Harvester from './components/harvester/Harvester.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Harvester />
      </div>
    );
  }
}

export default App;
