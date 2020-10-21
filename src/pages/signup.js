import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import logo from '../Assets/twooty3.png';
import logoHead from '../Assets/twooty5.png';
import axios from 'axios';
import { Redirect } from 'react-router';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

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

    onChangeLoginUsername(e)
    {
        this.setState({
            loginUsername: e.target.value
        })
    }

    onChangeLoginPassword(e)
    {
        this.setState({
            loginPassword: e.target.value
        })
    }

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

    onChangePasswordConfirm(e)
    {
        this.setState({
            passwordConfirm: e.target.value
        })
    }

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
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            position: "relative",
            marginTop: "2%"
          };

        const signupDiv = {
            background: "#f8f9fa",
            padding: "45px",
            position: "relative",
            left: "30%"
        };

        const statementDiv = {
            maxWidth: "350px",
            position: "relative",
            left: "20%"
        }

        const logoStyle = {
            width: "40%",
            float: "left",
            padding: "15px"
        };

        const statementParagraph = {
            textAlign: "center"
        };

        const navbarLogo = {
            width: "40px",
            height: "40px"
        };

        return this.state.isLoading ? null : 
        this.state.isLoggedIn ? <Redirect to='/dashboard' /> :
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
                                    <button className="btn btn-link" type="button">Forgot account?</button>
                                </form>
                        }
                    </div>
                </nav>

                <div style={ signupPageParentDiv }>
                    <div style={ statementDiv }>
                        <h2> Teach, learn, improve, together.</h2>
                        <img src={ logo } style={ logoStyle } alt="Twooty"/>
                        <p style={ statementParagraph }>
                            Our goal is to share a platform for people to learn and teach. We believe that communication
                            and learning from eachother is most beneficial than learning by yourself.
                            This website provides a median for tutors and students.
                        </p>
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
            </div>
        )
    }
}

export default signup;