import React, { Component } from 'react';
import './HomePage.css';
import { Container, Menu, Label, Grid, Card, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.loginCallback = this.loginCallback.bind(this);
        this.registerCallback = this.registerCallback.bind(this);
    }

    state = {
        activeItem: 'home',
        isLoggedIn: false
    }

    loginCallback = (status) => {
        this.setState({ isLoggedIn: status });
    }
    registerCallback = (status) => {
        this.setState({ isRegisterd: status });
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        const { isLoggedIn } = this.state
        return (
            <div>
                <Menu stackable inverted size='huge'>
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
                        {isLoggedIn ? (
                            <Menu.Item as={Link} to="/logout" position='right'>
                                Logout
                            </Menu.Item>
                        ) : (
                            <Menu.Menu position='right'>
                                <Menu.Item as={Link} loginCallback={this.loginCallback} to="/login">
                                    Login
                                </Menu.Item>
                                <Menu.Item as={Link} registerCallback={this.registerCallback} to="/register">
                                    Register
                                </Menu.Item>
                            </Menu.Menu>
                        )}
                </Menu>
                <Container classname="HomePage-Container">
                    <Grid container celled='internally'>
                        <Grid.Column width={12}>
                            <Card.Group>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 1 day ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 2 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 3 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 4 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 5 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 6 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 7 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 8 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 9 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 10 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='reaction'></Icon>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Grid.Column>
                                <Menu borderless vertical>
                                    <Menu.Item name='userFirst' active={activeItem === 'userFirst'} onClick={this.handleItemClick}>
                                        <Label color='gold'>1</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item name='userSecond' active={activeItem === 'userSecond'} onClick={this.handleItemClick}>
                                        <Label color='silver'>2</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item name='userThird' active={activeItem === 'userThird'} onClick={this.handleItemClick}>
                                        <Label color='bronze'>3</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item name='userFourth' active={activeItem === 'userFourth'} onClick={this.handleItemClick}>
                                        <Label>4</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item name='userFifth' active={activeItem === 'userFifth'} onClick={this.handleItemClick}>
                                        <Label>5</Label>
                                        UsernameHere
                                    </Menu.Item>
                                </Menu>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}
