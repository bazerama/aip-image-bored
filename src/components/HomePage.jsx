import React, { Component } from 'react';
import './HomePage.css';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.loginCallback = this.loginCallback.bind(this);
    }

    state = {
        activeItem: 'home',
        isLoggedIn: false
    }

    loginCallback = (status) => {
        this.setState({ isLoggedIn: status });
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        const { isLoggedIn } = this.state
        return (
            <div>
                <Menu secondary>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='friends'
                        active={activeItem === 'friends'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        {isLoggedIn ? (
                            <Menu.Item as={Link} to="/logout">
                                Logout
                            </Menu.Item>
                        ) : (
                            <Menu.Item as={Link} loginCallback={this.loginCallback} to="/login">
                                Login
                            </Menu.Item>
                        )}
                    </Menu.Menu>
                </Menu>

                <Segment>
                    <img alt="wireframe-media-paragraph" src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                </Segment>
            </div>
        )
    }
}
