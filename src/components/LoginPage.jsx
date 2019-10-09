import React from 'react';
import { loginAction } from '../actions/user.actions';
import { Card, Form, Input, Label, Container, Header, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false,
        };
    }

    // TODO: add better validation
    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    };

    handleChange = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(loginAction(username, password));
        }
    };

    render() {
        const { loggingIn, loginError, loginErrorMessage, loginSuccessful } = this.props;
        return (
            <div>
                <Container>
                    <Header textAlign="center" size="huge">
                        Login
                    </Header>
                    <Card centered={true}>
                        <Form>
                            <Form.Field>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    type="text"
                                    value={this.state.username}
                                    size="large"
                                />
                                {!this.validateForm() ? (
                                    <Label pointing prompt={true} size="large">
                                        Please enter a username
                                    </Label>
                                ) : null}
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    type="password"
                                    value={this.state.password}
                                    size="large"
                                />
                                {!this.validateForm() ? (
                                    <Label pointing prompt={true} size="large">
                                        Please enter a password
                                    </Label>
                                ) : null}
                            </Form.Field>
                        </Form>
                        <Button
                            loading={loggingIn}
                            disabled={!this.validateForm()}
                            onClick={this.handleSubmit}
                            secondary
                            size="large"
                        >
                            Submit
                        </Button>
                        {loginError ? (
                            <Message negative>
                                <Message.Header>Error logging in, please try again</Message.Header>
                                <p>{loginErrorMessage.toString()}</p>
                            </Message>
                        ) : null}
                        {loginSuccessful ? (
                            <Message positive>
                                <Message.Header>Successfully logged in!</Message.Header>
                                <p>You will now be redirected to the front page</p>
                            </Message>
                        ) : null}
                    </Card>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggingIn: state.login.loggingIn,
        loginSuccessful: state.login.loginSuccessful,
        loginError: state.login.loginError,
        loginErrorMessage: state.login.loginErrorMessage,
    };
};

export default connect(mapStateToProps)(LoginPage);
