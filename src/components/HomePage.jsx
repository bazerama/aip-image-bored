import React from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import * as image1 from '../resources/c1.jpg';
import * as image2 from '../resources/c2.jpg';
import * as image3 from '../resources/c3.jpg';
import * as image4 from '../resources/c4.jpg';
import * as image5 from '../resources/c5.jpg';
import * as reaction1 from '../resources/vince_wow.png';
import * as reaction2 from '../resources/spanish_laugh.png';
import * as reaction3 from '../resources/pogchamp.png';
import * as reaction4 from '../resources/tb_lul.png';
import * as reaction5 from '../resources/nick_young_confused.jpg';
import * as reaction6 from '../resources/peter_parker_cry.jpg';
import { Container, Header, Menu, Label, Grid, Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logoutAction, checkCredentialsAction } from '../actions/user.actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home',
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(checkCredentialsAction());
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleLogout = event => {
        const { dispatch } = this.props;
        event.preventDefault();
        dispatch(logoutAction());
    };

    render() {
        const { activeItem } = this.state;
        const { isLoggedIn } = this.props.isLoggedIn;
        return (
            <div>
                <Grid stackable>
                    <Grid.Row columns="3">
                        <Grid.Column verticalAlign="middle" textAlign="left">
                            <Button
                                size="huge"
                                name="home"
                                active={activeItem === 'home'}
                                onClick={this.handleItemClick}
                            >
                                Home
                            </Button>
                            <Button
                                size="huge"
                                name="messages"
                                active={activeItem === 'messages'}
                                onClick={this.handleItemClick}
                            >
                                Messages
                            </Button>
                        </Grid.Column>
                        <Grid.Column verticalAlign="middle" textAlign="center" as={Link} to="/">
                            <Header color="blue" textAlign="center" size="huge">
                                Image Bored™
                            </Header>
                        </Grid.Column>
                        <Grid.Column verticalAlign="middle" textAlign="right">
                            {isLoggedIn ? (
                                <Button size="huge" onClick={this.handleLogout} position="right">
                                    Logout
                                </Button>
                            ) : (
                                <React.Fragment>
                                    <Button size="huge" as={Link} to="/login">
                                        Login
                                    </Button>
                                    <Button size="huge" as={Link} to="/register">
                                        Register
                                    </Button>
                                </React.Fragment>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Container>
                    <Grid container celled="internally">
                        <Grid.Column width={12}>
                            <Card.Group>
                                <Card fluid>
                                    <Image src={image1} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 1 day ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div
                                            className="reaction-div"
                                            name="reaction1-div"
                                            onMouseEnter={this.handleMouseHover}
                                            onMouseLeave={this.handleMouseHover}
                                        >
                                            <Label color="black" image={reaction1}></Label>
                                        </div>
                                        <div
                                            className="reaction-div"
                                            name="reaction2-div"
                                            onMouseEnter={this.handleMouseHover}
                                            onMouseLeave={this.handleMouseHover}
                                        >
                                            <Label color="black" image={reaction2}></Label>
                                        </div>
                                        <div
                                            className="reaction-div"
                                            name="reaction3-div"
                                            onMouseEnter={this.handleMouseHover}
                                            onMouseLeave={this.handleMouseHover}
                                        >
                                            <Label color="black" image={reaction3}></Label>
                                        </div>
                                        <div
                                            className="reaction-div"
                                            name="reaction4-div"
                                            onMouseEnter={this.handleMouseHover}
                                            onMouseLeave={this.handleMouseHover}
                                        >
                                            <Label color="black" image={reaction4}></Label>
                                        </div>
                                        <div
                                            className="reaction-div"
                                            name="reaction5-div"
                                            onMouseEnter={this.handleMouseHover}
                                            onMouseLeave={this.handleMouseHover}
                                        >
                                            <Label color="black" image={reaction5}></Label>
                                        </div>
                                        <div
                                            className="reaction-div"
                                            name="reaction6-div"
                                            onMouseEnter={this.handleMouseHover}
                                            onMouseLeave={this.handleMouseHover}
                                        >
                                            <Label color="black" image={reaction6}></Label>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src={image2} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 2 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra></Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src={image3} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 3 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra></Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src={image4} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 4 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra></Card.Content>
                                </Card>
                                <Card fluid>
                                    <Image src={image5} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Description>Posted by u/bazerama 5 days ago</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra></Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header textAlign="left" size="large">
                                Leaderboard
                            </Header>
                            <Grid.Column>
                                <Menu vertical>
                                    <Menu.Item
                                        name="userFirst"
                                        active={activeItem === 'userFirst'}
                                        onClick={this.handleItemClick}
                                    >
                                        <Label color="brown">1st</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item
                                        name="userSecond"
                                        active={activeItem === 'userSecond'}
                                        onClick={this.handleItemClick}
                                    >
                                        <Label color="teal">2nd</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item
                                        name="userThird"
                                        active={activeItem === 'userThird'}
                                        onClick={this.handleItemClick}
                                    >
                                        <Label color="olive">3rd</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item
                                        name="userFourth"
                                        active={activeItem === 'userFourth'}
                                        onClick={this.handleItemClick}
                                    >
                                        <Label color="grey">4th</Label>
                                        UsernameHere
                                    </Menu.Item>
                                    <Menu.Item
                                        name="userFifth"
                                        active={activeItem === 'userFifth'}
                                        onClick={this.handleItemClick}
                                    >
                                        <Label color="grey">5th</Label>
                                        UsernameHere
                                    </Menu.Item>
                                </Menu>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.authentication,
    };
};

export default connect(mapStateToProps)(HomePage);
