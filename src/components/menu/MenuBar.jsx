import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../actions/user.actions';

/**
 * This MenuBar is used in limited locations but has been made into a module for easy
 * consumption by any future components. It checks to see if a user is logged in and
 * will variably render options in the menu. When logout is clicked, mapDispatchToProps
 * allows for logoutAction to be dispatched via props.logout()
 */

const MenuBar = props => {
    function handleLogout(event) {
        event.preventDefault();
        props.logout();
    }

    return (
        <Grid className="menu-bar">
            <Grid.Row columns="3">
                <Grid.Column verticalAlign="middle" textAlign="left">
                    <Button size="huge" name="home" as={Link} to="/">
                        Home
                    </Button>
                    {props.isLoggedIn ? (
                        <Button size="huge" name="uploadImage" onClick={props.openUploadModal}>
                            Upload Image
                        </Button>
                    ) : null}
                </Grid.Column>
                <Grid.Column verticalAlign="middle" textAlign="center" as={Link} to="/">
                    <Header color="blue" textAlign="center" size="huge">
                        Image Bored™
                    </Header>
                </Grid.Column>
                <Grid.Column verticalAlign="middle" textAlign="right">
                    {props.isLoggedIn ? (
                        <Button size="huge" onClick={handleLogout} position="right" as={Link} to="/">
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
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logoutAction()),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(MenuBar);
