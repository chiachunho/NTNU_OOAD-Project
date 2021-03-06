import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import axiosInstance from '../api/Api';
import getUserName from '../utils/getUserName';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();

        axiosInstance
            .post('/auth/user/create/', {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
            })
            .then((response) => {
                window.location.href = '/account/login/';
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
                        <title>{'註冊新帳號'}</title>
                    </Helmet>
                    <div className='py-3'>
                        <h3>註冊新帳號</h3>
                        <Form className='my-3' onSubmit={this.handleSubmit}>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='輸入 Email'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <Form.Text id='emailHelpBlock'>
                                    {this.state.errors.email ? this.state.errors.email : null}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId='formBasicUsername'>
                                <Form.Label>帳號</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='輸入帳號'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Text id='usernameHelpBlock'>
                                    {this.state.errors.username ? this.state.errors.username : null}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>密碼</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='輸入密碼'
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
                                    註冊
                                </Button>
                                <div className={'text-muted small ml-3'}>
                                    已經有帳號了嗎？<a href={'/account/login/'}>點擊這裡登入</a>
                                </div>
                            </div>
                        </Form>
                    </div>
                </>
            );
        }
    }
}

export default Signup;
