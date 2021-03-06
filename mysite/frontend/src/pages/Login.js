import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import axiosInstance from '../api/Api';
import getUserName from '../utils/getUserName';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            redirectURL: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const queryString = require('query-string');
        const parsed = queryString.parse(this.props.location.search);
        if ('next' in parsed) {
            this.setState({ redirectURL: parsed.next });
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();

        axiosInstance
            .post('/auth/token/obtain/', {
                username: this.state.username,
                password: this.state.password,
            })
            .then((response) => {
                axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                if (this.state.redirectURL) {
                    window.location.href = this.state.redirectURL;
                } else {
                    window.location.href = '/games/';
                }
            })
            .catch((err) => {
                console.error(err.response);
                this.setState({
                    errors: err.response.data,
                });
                console.error(this.state.errors);
            });
    }

    render() {
        if (getUserName()) {
            window.location.href = '/games/';
        } else {
            return (
                <>
                    <Helmet>
                        <title>{'??????'}</title>
                    </Helmet>
                    <div className='py-3'>
                        <h3>??????</h3>
                        <Alert variant='danger' show={!!this.state.errors.detail}>
                            {this.state.errors.detail ? this.state.errors.detail : null}
                        </Alert>
                        <Form className='my-3' onSubmit={this.handleSubmit}>
                            <Form.Group controlId='formBasicUsername'>
                                <Form.Label>??????</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='????????????'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Text id='usernameHelpBlock'>
                                    {this.state.errors.username ? this.state.errors.username : null}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>??????</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='??????'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Form.Text id='passwordHelpBlock'>
                                    {this.state.errors.password ? this.state.errors.password : null}
                                </Form.Text>
                            </Form.Group>

                            <div className={'d-flex align-items-center'}>
                                <Button variant='brown' type='submit'>
                                    ??????
                                </Button>
                                <div className={'text-muted small ml-3'}>
                                    ?????????????????????<a href={'/account/signup/'}>??????????????????</a>
                                </div>
                            </div>
                        </Form>
                    </div>
                </>
            );
        }
    }
}

export default Login;
