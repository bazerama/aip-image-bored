import React from 'react';
import logo from '../resources/logo.svg';
import './ReactTestPage.css';

function ReactTestPage() {
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
    );
}

export default ReactTestPage;
