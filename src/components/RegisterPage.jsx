import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Input, Label, Container, Header, Button, Message } from 'semantic-ui-react';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerError: false,
            registerSuccessful: false,
            username: "",
            password: "",
            email: "",
            dob: "",
        };
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.email.length > 0;
    }
    handleError = () => {
        this.setState({ registerError: true })
        setTimeout(() => {
            this.setState({ registerError: false })
        }, 4000)
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    render() {
        const { registerError } = this.state
        const { registerSuccessful } = this.state
        return (
            <div>
                <Container classname="RegisterPage-Container">
                    <Header textAlign='center' size='huge'>Register</Header>
                    <Card centered={true} classname="RegisterPage-Card">
                        <Form>
                            <Form.Field>
                                <Input id="username" placeholder="Username" onChange={this.handleChange} type="username" value={this.state.username} />
                                <Label pointing prompt={!this.validateForm()} >
                                    Please enter a username
                                </Label>
                                <Input id="password" placeholder="Password" onChange={this.handleChange} type="password" value={this.state.password} />
                                <Label pointing prompt={!this.validateForm()} >
                                    Please enter a password
                                </Label>
                                <Input id="email" placeholder="Email" onChange={this.handleChange} type="email" value={this.state.email} />
                                <Label pointing prompt={!this.validateForm()} >
                                    Please enter an email address
                                </Label>
                            </Form.Field>
                        </Form>
                        <Button disabled={!this.validateForm()} onClick={this.handleSubmit} secondary>
                            Submit
                        </Button>
                        {registerError ? (
                            <Message negative>
                                <Message.Header>Error registering...</Message.Header>
                                <p>Please try again</p>
                            </Message>
                        ) : null}
                        {registerSuccessful ? (
                            <Message>
                                <Message.Header>User successfully registered!</Message.Header>
                                <p>You will now be redirected to the front page</p>
                            </Message>
                        ) : null}
                    </Card>
                </Container>
            </div>
        )
    }
}
