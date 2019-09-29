import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, Label, Container, Header, Button, Message } from 'semantic-ui-react';
import { registerAction } from '../actions/user.actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            submitted: false,
        };
    }

    // TODO: add better validation
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.email.length > 0;
    }

    handleError = () => {
        this.setState({ registerError: true });
        setTimeout(() => {
            this.setState({ registerError: false });
        }, 4000);
    };

    handleChange = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { username, password, email } = this.state;
        const { dispatch } = this.props;
        if (username && password && email) {
            this.setState({ submitted: true });
            dispatch(registerAction(username, password, email));
        }
    };

    render() {
        const { registering, registerSuccessful, registerError, registerErrorMessage } = this.props;
        return (
            <div>
                <Container>
                    <Header textAlign="center" size="huge">
                        Register
                    </Header>
                    <Card centered={true}>
                        <Form>
                            <Form.Field>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    type="username"
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
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    type="email"
                                    value={this.state.email}
                                    size="large"
                                />
                                {!this.validateForm() ? (
                                    <Label pointing prompt={true} size="large">
                                        Please enter an email address
                                    </Label>
                                ) : null}
                            </Form.Field>
                        </Form>
                        <Button
                            loading={registering}
                            disabled={!this.validateForm()}
                            onClick={this.handleSubmit}
                            secondary
                        >
                            Submit
                        </Button>
                        {registerError ? (
                            <Message negative>
                                <Message.Header>User could not be registered...</Message.Header>
                                <p>{registerErrorMessage.toString()}</p>
                            </Message>
                        ) : null}
                        {registerSuccessful ? (
                            <Message positive>
                                <Message.Header>User successfully registered!</Message.Header>
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
        registering: state.register.registering,
        registerSuccessful: state.register.registerSuccessful,
        registerError: state.register.registerError,
        registerErrorMessage: state.register.registerErrorMessage,
    };
};

export default connect(mapStateToProps)(RegisterPage);
