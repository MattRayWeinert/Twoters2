import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Signup extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            email: '',

            usernameError: '',
            passwordError: '',
            passwordConfirmError: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',

            disabled: 'true'
        }
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    // componentDidMount() {
    //     axios.get('http://localhost:5000/user/')
    //         .then(response => {
    //         if (response.data.length > 0) {
    //             this.setState({
    //             users: response.data.map(user => user.username),
    //             username: response.data[0].username
    //             })
    //         }
    //         })
    //         .catch((error) => {
    //         console.log(error);
    //         })
    // }

    onChangeUsername(e) {

        if (e.target.value.length < 1) {
            this.setState({
                usernameError: 'Username is required'
            })
        } else {
            this.setState({
                usernameError: ''
            })
        }
        
        this.setState({
            username: e.target.value
        }, () => {

            if (this.state.usernameError === "" && this.state.passwordError === "" && this.state.firstNameError === "" && this.state.lastNameError === "" && this.state.emailError === "") {
                if ((this.state.username) !== "" && (this.state.password) !== "" && (this.state.firstName) !== ""
                && (this.state.lastName) !== "" && (this.state.email) !== "") {
                    this.setState({
                        disabled: ''
                    })
                }
            } else {
                this.setState({
                    disabled: 'true'
                })
            }
        })
    }

    onChangePassword(e) {

        if (e.target.value.length < 1) {
            this.setState({
                passwordError: 'Password is required'
            })
        } else {
            this.setState({
                passwordError: ''
            })
        }

        this.setState({
            password: e.target.value
        }, () => {

            if (this.state.usernameError === "" && this.state.passwordError === "" && this.state.firstNameError === "" && this.state.lastNameError === "" && this.state.emailError === "") {
                if ((this.state.username) !== "" && (this.state.password) !== "" && (this.state.firstName) !== ""
                && (this.state.lastName) !== "" && (this.state.email) !== "") {
                    this.setState({
                        disabled: ''
                    })
                }
            } else {
                this.setState({
                    disabled: 'true'
                })
            }
        })

    }

    onChangePasswordConfirm(e) {
        this.setState({
            passwordConfirm: e.target.value
        })
    }

    onChangeFirstName(e) {

        if (e.target.value.length < 1) {
            this.setState({
                firstNameError: 'First name is required'
            })
        } else {
            this.setState({
                firstNameError: ''
            })
        }

        this.setState({
            firstName: e.target.value
        }, () => {

            if (this.state.usernameError === "" && this.state.passwordError === "" && this.state.firstNameError === "" && this.state.lastNameError === "" && this.state.emailError === "") {
                if ((this.state.username) !== "" && (this.state.password) !== "" && (this.state.firstName) !== ""
                && (this.state.lastName) !== "" && (this.state.email) !== "") {
                    this.setState({
                        disabled: ''
                    })
                }
            } else {
                this.setState({
                    disabled: 'true'
                })
            }
        })


    }

    onChangeLastName(e) {

        if (e.target.value.length < 1) {
            this.setState({
                lastNameError: 'Last name is required'
            })
        } else {
            this.setState({
                lastNameError: ''
            })
        }

        this.setState({
            lastName: e.target.value
        }, () => {

            if (this.state.usernameError === "" && this.state.passwordError === "" && this.state.firstNameError === "" && this.state.lastNameError === "" && this.state.emailError === "") {
                if ((this.state.username) !== "" && (this.state.password) !== "" && (this.state.firstName) !== ""
                && (this.state.lastName) !== "" && (this.state.email) !== "") {
                    this.setState({
                        disabled: ''
                    })
                }
            } else {
                this.setState({
                    disabled: 'true'
                })
            }
        })
    }

    onChangeEmail(e) {
        
        if (e.target.value.length < 1) {
            this.setState({
                emailError: 'Email is required'
            })
        } else {
            if (validEmailRegex.test(e.target.value)) {
                this.setState({
                    emailError: ''
                })
            } else {
                this.setState({
                    emailError: 'Email is not valid'
                })
            }
        }

        this.setState({
            email: e.target.value
        }, () => {

            if (this.state.usernameError === "" && this.state.passwordError === "" && this.state.firstNameError === "" && this.state.lastNameError === "" && this.state.emailError === "") {
                if ((this.state.username) !== "" && (this.state.password) !== "" && (this.state.firstName) !== ""
                && (this.state.lastName) !== "" && (this.state.email) !== "") {
                    this.setState({
                        disabled: ''
                    })
                }
            } else {
                this.setState({
                    disabled: 'true'
                })
            }
        })
    }

    onSubmit(e) {
        
        e.preventDefault();

        // Checking if the errors are defined, if so then that means there are errors in the textfields
        if (this.state.usernameError === "" && this.state.passwordError === "" && this.state.firstNameError === "" && this.state.lastNameError === "" && this.state.emailError === "") {

            // Checks if the text fields are filled and properly filled
            if ((this.state.username) !== "" && (this.state.password) !== "" && (this.state.firstName) !== ""
             && (this.state.lastName) !== "" && (this.state.email) !== "") {

                const User = {
                    username: this.state.username,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email
                }
        
                axios.post('http://localhost:5000/user/', User)
                    .then(res => console.log(res.data));
        
                this.setState({
                    username: '',
                    password: '',
                    passwordConfirm: '',
                    firstName: '',
                    lastName: '',
                    email: ''
                })   
            }
        } else {

        }
      }

    render () {

        const signUpBox = {
            background: "#f8f9fa",
            padding: "45px",
            position: "relative",
            left: "30%"
        };

        return (

            <div className="signUpBox" style={ signUpBox }>
                <form onSubmit={this.onSubmit}>
                    <h2>Create a New Account</h2>

                    {this.state.usernameError.length > 0 && 
                        <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.usernameError}</span>}

                    <FormGroup controlId="signUpUsername">
                        <FormControl
                            name="username"
                            type="text"
                            placeholder="Username"
                            // required
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            maxLength="14"
                        />
                    </FormGroup>

                    {this.state.passwordError.length > 0 && 
                        <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.passwordError}</span>}

                    <FormGroup controlId="signUpPassword">
                        <FormControl
                            name="password"
                            type="password"
                            placeholder="Password"
                            // required
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            maxLength="20"
                        />
                    </FormGroup>
                    
                    
                    <FormGroup controlId="signUpConfirmPassword">
                        <FormControl 
                        name="passwordConfirm"
                        type="password"
                        placeholder="Confirm password"
                        // required
                        value={this.state.passwordConfirm}
                        onChange={this.onChangePasswordConfirm}
                        maxLength="20"
                        />
                    </FormGroup>
                    
                    {this.state.firstNameError.length > 0 && 
                        <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.firstNameError}</span>}

                    <FormGroup controlId="signUpFirstName">
                        <FormControl
                            name="firstName"
                            type="text"
                            placeholder="First name"
                            // required
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                            maxLength="20"
                        />
                    </FormGroup>
                    
                    {this.state.lastNameError.length > 0 && 
                        <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.lastNameError}</span>}

                    <FormGroup controlId="signUpLastName">
                        <FormControl
                            name="lastName"
                            type="text"
                            placeholder="Last name"
                            // required
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                            maxLength="20"
                        />
                    </FormGroup>
                    
                    {this.state.emailError.length > 0 && 
                        <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.emailError}</span>}

                    <FormGroup controlId="signUpEmail">
                        <FormControl
                            name="email"
                            type="text"
                            placeholder="Email"
                            // required
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            maxLength="35"
                        />
                    </FormGroup>

                    <button disabled={this.state.disabled} className="btn btn-dark" type="subimt">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup;