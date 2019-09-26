import React from 'react';
import { loginAction } from '../actions/user.actions';
import { Card, Form, Input, Label, Container, Header, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submitted: false
        };
    }

    // TODO: add better validation
    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(loginAction(username, password));
        }
    }

    /*handleError = () => {
        this.setState({ loginErrorMessage: "It appears you've entered an incorrect email or password" })
        this.setState({ loginError: true })
        setTimeout(() => {
            this.setState({ loginError: false })
        }, 4000)
    }*/

    render() {
        const { loggingIn } = this.props.loggingIn
        const { loginError } = this.props.loginError
        const { loginErrorMessage } = this.props.loginErrorMessage
        const { loginSuccessful } = this.props.loginSuccessful
        return (
            <div>
                <Container>
                    <Header textAlign='center' size='huge'>Login</Header>
                    <Card centered={true}>
                        <Form>
                            <Form.Field>
                                <Input id="username" placeholder="Username" onChange={this.handleChange}type="username" value={this.state.username} size='large' />
                                {!this.validateForm() ? (
                                    <Label pointing prompt={true} size='large' >
                                        Please enter a username
                                    </Label>
                                ) : null}
                                <Input id="password" placeholder="Password" onChange={this.handleChange} type="password" value={this.state.password} size='large' />
                                {!this.validateForm() ? (
                                    <Label pointing prompt={true} size='large' >
                                        Please enter a password
                                    </Label>
                                ) : null}
                            </Form.Field>
                        </Form>
                        <Button loading={loggingIn} disabled={!this.validateForm()} onClick={this.handleSubmit} secondary size='large'>
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
                                <p>You will be redirected to the Home Page in a few seconds...</p>
                            </Message>
                        ) : null}
                    </Card>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggingIn: state.login,
        loginSuccessful: state.login,
        loginError: state.login,
        loginErrorMessage: state.login
    };
}

export default connect(mapStateToProps)(LoginPage);