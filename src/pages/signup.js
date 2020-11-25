import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import groupStudy from '../Assets/groupStudy.jpg';
import logoHead from '../Assets/twooty5.png';
import axios from 'axios';
import { Redirect } from 'react-router';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

/*
    Class responsible for creating the signup page and all
    it's frontend capability.
*/
class signup extends Component
{
    
    constructor()
    {
        super();

        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            email: '',
            university: '',

            usernameError: '',
            passwordError: '',
            passwordConfirmError: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',

            disabled: true,
            isLoggedIn: false,
            isLoading: true,

            loginUsername: '',
            loginPassword: ''
        }
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onChangeLoginUsername = this.onChangeLoginUsername.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);

        axios.defaults.withCredentials = true;

        axios.get('http://localhost:5000/user/check', { withCredentials: true })
            .then(res => {
                if (res.data === true)
                {
                    this.setState(() => ({ isLoading: false, isLoggedIn: true }));
                }
    
                if (res.data === false)
                {
                    this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                }
            });
    }

    /*
        Event handler to update the state of the
        login username textfield
    */
    onChangeLoginUsername(e)
    {
        this.setState({
            loginUsername: e.target.value
        })
    }

    /*
        Event handler to update the state of the
        login password textfield
    */
    onChangeLoginPassword(e)
    {
        this.setState({
            loginPassword: e.target.value
        })
    }

    /*
        Event handler to update the state of the
        register username text field. 
        Also determines if the signup button is enabled or disabled.
    */
    onChangeUsername(e)
    {
        if (e.target.value.length < 1)
        {
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
                        disabled: false
                    })
                }
            } else {
                this.setState({
                    disabled: true
                })
            }
        })
    }

    /*
        Event handler to update the state of the
        register password text field. 
        Also determines if the signup button is enabled or disabled.
    */
    onChangePassword(e)
    {
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
                        disabled: false
                    })
                }
            } else {
                this.setState({
                    disabled: true
                })
            }
        })

    }

    /*
        Todo: Synq to signup button & compare this password textbox value
        to the other password textbox value to see if it is the same.
    */
    onChangePasswordConfirm(e)
    {
        this.setState({
            passwordConfirm: e.target.value
        })
    }

    /*
        Event handler to update the state of the
        register first name text field. 
        Also determines if the signup button is enabled or disabled.
    */
    onChangeFirstName(e)
    {
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
                        disabled: false
                    })
                }
            } else {
                this.setState({
                    disabled: true
                })
            }
        })


    }

    /*
        Event handler to update the state of the
        register last name text field. 
        Also determines if the signup button is enabled or disabled.
    */
    onChangeLastName(e)
    {
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
                        disabled: false
                    })
                }
            } else {
                this.setState({
                    disabled: true
                })
            }
        })
    }

    /*
        Event handler to update the state of the
        register email text field. 
        Also determines if the signup button is enabled or disabled.
    */    
    onChangeEmail(e)
    {
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
                        disabled: false
                    })
                }
            } else {
                this.setState({
                    disabled: true
                })
            }
        })
    }

    /* 
        Submits the user register data to the server and will create the account
        as long as it follows the schema rules. 
    */
    onSubmit(e)
    {
        e.preventDefault();
        axios.defaults.withCredentials = true;

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
                    email: this.state.email,
                    university: ' '
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
            /* Todo: if the user isn't created, handle that here */
        }
      }

    /* 
      Handles the login, if the user logs in it will redirect them to the 
      user's dashboard page.
    */
    onLogin(e)
    {
        e.preventDefault();

        const User = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        };
        
        axios.post('http://localhost:5000/user/login', User)
        .then(res => {
            if (res.data)
            {
                console.log(res.data);

                this.setState({
                    username: '',
                    password: '',
                    isLoggedIn: true
                })

                window.location.href = 'http://localhost:3000/dashboard';
            }
        });
    }

    render ()
    {

        const signupPageParentDiv = {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            background: "beige",
            marginTop: "3%"
          };

        const signupDiv = {
            background: "#f8f9fa",
            padding: "45px",
            position: "relative",
            marginLeft: "2%",
            margin: "20px"
        };

        const statementDiv = {
            maxWidth: "350px",
            position: "relative",
            width: "350px",
            margin: "3%"
        }

        const centerPageDiv = {
            position: "relative",
            maxWidth: "50%",
            margin: "auto"
        }

        const groupStudyStyle = {
            width: "-webkit-fill-available",
            float: "left",
            borderRadius: "5px"
        };

        const navbarLogo = {
            width: "40px",
            height: "40px"
        };

        const footerStyle = {
            maxHeight: "250px",
            height: "150px",
            marginTop: "10%",
            background: "#f8f9fa",
            bottom: "0px",
            position: "fixed",
            width: "100%"
        }

        const footerDiv = {
            padding: "4%",
            float: "right"
        }

        return this.state.isLoading ? 
            null : 
            this.state.isLoggedIn ? 
                <Redirect to='/dashboard' /> :
                (
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#"><img src={ logoHead } style={ navbarLogo }/></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link"><h2>Twoters</h2><span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>

                                {
                                    this.state.isLoading ? null :
                                        this.state.isLoggedIn ? 
                                        null : 
                                        <form onSubmit={this.onLogin} className="form-inline my-2 my-lg-0">
                                            <FormGroup controlId="loginUsername">
                                                <FormControl
                                                    name="loginUsername"
                                                    type="text"
                                                    placeholder="Username"
                                                    value={this.state.loginUsername}
                                                    onChange={this.onChangeLoginUsername}
                                                    maxLength="14"
                                                />
                                            </FormGroup>

                                            <FormGroup controlId="loginPassowrd">
                                                <FormControl
                                                    name="loginPassword"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={this.state.loginPassword}
                                                    onChange={this.onChangeLoginPassword}
                                                    maxLength="20"
                                                    style={{margin: "5px"}}
                                                />
                                            </FormGroup>

                                            <button className="btn btn-dark" type="subimt">Login</button>
                                            {/* <button className="btn btn-link" type="button">Forgot account?</button> */}
                                        </form>
                                }
                            </div>
                        </nav>

                        <div style={ signupPageParentDiv }>
                            <div style={ statementDiv }>
                                <h2> Connect,</h2>
                                <h2>teach,</h2>
                                <h2>learn,</h2>
                                <h2 style={{ paddingBottom: "20px" }}>together.</h2>
                                <p style={{ fontSize: "20px" }}>
                                    Our mission here at Twoters is to help people learn new things so they can achieve new heights.
                                    This platform aims to connect people for education oppertunities across the country. Sign up and 
                                    log in and get connected today.
                                </p>
                            </div>

                            <div style={ centerPageDiv }>
                                <img src={ groupStudy } style={ groupStudyStyle } alt="Study Group"/>
                            </div>

                            <div className="signUpBox" style={ signupDiv }>
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
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            maxLength="35"
                                            />
                                    </FormGroup>
                                    
                                    <button disabled={this.state.disabled} className="btn btn-dark" type="subimt">Sign Up</button>
                                </form>
                            </div>
                        </div>

                        <footer style={ footerStyle }>
                            <div>
                                <p style={ footerDiv }>Twoters ©</p>
                            </div>
                        </footer>

                    </div>
                )
    }
}

export default signup;