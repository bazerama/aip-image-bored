import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Input, Label, Container, Header, Button, Message } from 'semantic-ui-react';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginSuccessful: false,
            loginError: false,
            username: '',
            password: '',
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/api/login', {
            username: this.state.username,
            password: this.state.password,
        });
        if (response.data.success) {
            this.setState({ loginSuccessful: true });
            setTimeout(() => {
                this.setState({ loginSuccessful: false });
            }, 4000);
            this.props.loginCallback(true);
        } else {
            this.handleError();
        }
    };

    handleError = () => {
        this.setState({ loginError: true });
        setTimeout(() => {
            this.setState({ loginError: false });
        }, 4000);
    };

    render() {
        const { loginError } = this.state;
        const { loginSuccessful } = this.state;
        return (
            <div>
                <Container classname="LoginPage-Container">
                    <Header textAlign="center" size="huge">
                        Login
                    </Header>
                    <Card centered={true} classname="LoginPage-Card">
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
                                <Label pointing prompt={!this.validateForm()} size="large">
                                    Please enter a username
                                </Label>
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    type="password"
                                    value={this.state.password}
                                    size="large"
                                />
                                <Label pointing prompt={!this.validateForm()} size="large">
                                    Please enter a password
                                </Label>
                            </Form.Field>
                        </Form>
                        <Button disabled={!this.validateForm()} onClick={this.handleSubmit} secondary size="large">
                            Submit
                        </Button>
                        {loginError ? (
                            <Message negative>
                                <Message.Header>Error logging in</Message.Header>
                                <p>It appears you've entered an incorrect email or password</p>
                            </Message>
                        ) : null}
                        {loginSuccessful ? (
                            <Message>
                                <Message.Header>Successfully logged in!</Message.Header>
                            </Message>
                        ) : null}
                    </Card>
                </Container>
            </div>
        );
    }
}
