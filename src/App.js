import React, { Component } from 'react';
import HomePage from './components/homepage/HomePage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import { Router, Route } from 'react-router-dom';
import { history } from './services/history.service';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Router>
        );
    }
}

export default App;
