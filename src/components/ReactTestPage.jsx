import React, { Component } from 'react';
import logo from '../resources/logo.svg';
import './ReactTestPage.css';

export default class ReactTestPage extends Component {
    render() {
        return (
            <div className="ReactTestPage">
                <header className="ReactTestPage-header">
                    <img src={logo} className="ReactTestPage-logo" alt="logo" />
                    <p>
                        Edit <code>src/ReactTestPage.js</code> and save to reload.
                    </p>
                    <a
                        className="ReactTestPage-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        )
    }
}
