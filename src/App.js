import React from 'react';
import HomePage from './components/HomePage';
import ReactTestPage from './components/ReactTestPage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
        <HomePage default path="/" />
        <ReactTestPage path="/testpage" />
    </Router>
  );
}

export default App;
