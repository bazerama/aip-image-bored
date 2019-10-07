import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, Label, Container, Header, Button, Message, List } from 'semantic-ui-react';
import { registerAction } from '../actions/user.actions';
import * as EmailValidator from 'email-validator';
import zxcvbn from 'zxcvbn';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            submitted: false,
            emailValid: 'start',
            passwordValid: false,
            passwordError: '',
            formValid: false,
            usernameValid: 'start',
        };
    }

    handleError = () => {
        this.setState({ registerError: true });
        setTimeout(() => {
            this.setState({ registerError: false });
        }, 4000);
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

    //The following validation related classes are by learnetto
    //Have been altered to accomodate further validation
    //See //https://github.com/learnetto/react-form-validation-demo/blob/master/src/Form.js
    validateForm() {
        this.setState({ formValid: this.state.usernameValid && this.state.emailValid && this.state.passwordValid });
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
        let passwordStrength = null;
        let passwordPrint = null;

        switch (fieldName) {
            case 'email':
                emailValid = EmailValidator.validate(value);
                break;
            case 'password':
                passwordStrength = zxcvbn(value).score;
                passwordValid = zxcvbn(value).score >= 3;
                switch (passwordStrength) {
                    case 0:
                        passwordPrint = 'Too Weak';
                        break;
                    case 1:
                        passwordPrint = 'Weak';
                        break;
                    case 2:
                        passwordPrint = 'fair but needs more work';
                        break;
                    case 3:
                        passwordPrint = 'Good';
                        break;
                    case 4:
                        passwordPrint = 'Strong';
                        break;
                    default:
                        passwordPrint = 'Please enter a password';
                        break;
                }
                break;
            case 'username':
                var pattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;
                usernameValid = pattern.test(value);
                break;
            default:
                break;
        }
        this.setState(
            {
                emailValid: emailValid,
                passwordValid: passwordValid,
                passwordError: passwordPrint,
                usernameValid: usernameValid,
            },
            this.validateForm
        );
    }

    render() {
        const { registering, registerSuccessful, registerError, registerErrorMessage } = this.props;
        return (
            <div>
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
                                        name="username"
                                        onChange={this.handleChange}
                                        type="username"
                                        value={this.state.username}
                                        size="large"
                                    />
                                    {this.state.usernameValid === 'start' ? (
                                        <Label pointing prompt={true} size="large">
                                            Please Enter a Username
                                        </Label>
                                    ) : !!this.state.usernameValid === false ? (
                                        <Label pointing prompt={true} size="large">
                                            <List>
                                                <List.Item>Must be 6-15 Characters Long</List.Item>
                                                <List.Item>Must include at least 1 number and 1 letter</List.Item>
                                            </List>
                                        </Label>
                                    ) : null}
                                    <Input
                                        id="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.handleChange}
                                        type="password"
                                        value={this.state.password}
                                        size="large"
                                    />
                                    {!this.state.passwordValid ? (
                                        <Label pointing prompt={true} size="large">
                                            {!!this.state.passwordError ? 'Password is ' : 'Please Enter a Password'}
                                            {this.state.passwordError}
                                        </Label>
                                    ) : null}
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        size="large"
                                    />
                                    {this.state.emailValid === 'start' ? (
                                        <Label pointing prompt={true} size="large">
                                            Please Enter a Email
                                        </Label>
                                    ) : !!this.state.emailValid === false ? (
                                        <Label pointing prompt={true} size="large">
                                            Invalid Email
                                        </Label>
                                    ) : null}
                                </Form.Field>
                            </Form>
                            <Button
                                loading={registering}
                                disabled={!this.state.formValid}
                                onClick={this.handleSubmit}
                                secondary
                            >
                                Sign up!
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
