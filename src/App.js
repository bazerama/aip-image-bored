import React, { Component } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ReactTestPage from './components/ReactTestPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/testpage" component={ReactTestPage} />
      </Router>
    )
  }
}

export default App;
