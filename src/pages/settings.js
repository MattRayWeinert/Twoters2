import React, { Component } from 'react';
import logoHead from '../Assets/twooty5.png';
import createIcon from '../Assets/create-icon.svg';
import homeIcon from '../Assets/home-icon.svg';
import settingsIcon from '../Assets/settings-icon.svg';
import logoutIcon from '../Assets/logout-icon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';

/*
    Class responsible for creating the settings page and contains all
    it's frontend capability.
*/
class settings extends Component 
{
    constructor()
    {
        super();

        this.state = {
            id: '',

            username: '',
            firstName: '',
            lastName: '',
            email: '',
            university: '',

            usernameError: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            universityError: '',

            dbUsername: '',
            dbFirstName: '',
            dbLastName: '',
            dbEmail: '',
            dbUniversity: '',
            
            isLoggedIn: false,
            isLoading: true,
            disabled: true
        };

        this.onLogout = this.onLogout.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDashboard = this.onDashboard.bind(this);
        this.onSettings = this.onSettings.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUniversity = this.onChangeUniversity.bind(this);
    }

    componentDidMount(e)
    {
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

        axios.get('http://localhost:5000/user/data', { withCredentials: true })
            .then(res => {
                if (res.data !== undefined)
                {
                    this.setState(() => (
                        {
                            dbUsername: res.data.username,
                            dbFirstName: res.data.firstName,
                            dbLastName: res.data.lastName,
                            dbEmail: res.data.email,
                            id: res.data._id,
                            dbUniversity: res.data.university
                        }
                    ))
                }

                else
                {
                    console.warn("Settings component did not properly mount.");
                }
            }).catch(err => { console.log(err) });
    }

    /*
        Redirects the user to the create page after checking
        if the user is logged in. If not logged in, the user is sent
        to the signup page. 
    */    
    onCreate(e)
    {
        e.preventDefault(e);

        axios.get('http://localhost:5000/user/check')
        .then(res => {
            if (res.data === true)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: true }));
                window.location.href = 'http://localhost:3000/create';
            }

            if (res.data === false)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                window.location.href = 'http://localhost:3000/';
            }
        }).catch(err => { window.location.href = 'http://localhost:3000/'; });
    }

    /*
        Redirects the user to the dashboard page after checking
        if the user is logged in. If not logged in, the user is sent
        to the signup page. 
    */    
    onDashboard(e)
    {
        e.preventDefault(e);

        axios.get('http://localhost:5000/user/check')
        .then(res => {
            if (res.data === true)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: true }));
                window.location.href = 'http://localhost:3000/dashboard';
            }

            if (res.data === false)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                window.location.href = 'http://localhost:3000/';
            }
        }).catch(err => { window.location.href = 'http://localhost:3000/'; });
    }

    /*
        Redirects the user to the settings page after checking
        if the user is logged in. If not logged in, the user is sent
        to the signup page. 
    */    
    onSettings(e)
    {
        e.preventDefault(e);

        axios.get('http://localhost:5000/user/check')
        .then(res => {
            if (res.data === true)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: true }));
                window.location.href = 'http://localhost:3000/settings';
            }

            if (res.data === false)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                window.location.href = 'http://localhost:3000/';
            }
        }).catch(err => { window.location.href = 'http://localhost:3000/'; });
    }

    /*
        Handles user logout and terminating their login session
        then redirects them to the signup page. 
    */
    onLogout(e)
    {

        e.preventDefault(e);

        axios.post('http://localhost:5000/user/logout')
        .then(res => {
            if (res.data === true)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: true }));
            }

            if (res.data === false)
            {
                this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                window.location.href = 'http://localhost:3000/dashboard';
            }
        }).catch(err => { window.location.href = 'http://localhost:3000/'; });
    }

    /* 
        Event handler for changing the username state
    */
    onChangeUsername(e)
    {
        // this.setState({
        //     username: e.target.value
        // });

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
            if ((this.state.username) !== "" || (this.state.firstName) !== "" || (this.state.lastName) !== "" || (this.state.email) !== "" || (this.state.university) !== "") {
                this.setState({
                    disabled: false
                })
            } else {
                this.setState({
                    disabled: true
                })
            }
        })
    }

    /* 
        Event handler for changing the password state
    */
    onChangePassword(e)
    {
        this.setState({
            password: e.target.value
        });
    }

    /* 
        Event handler for changing the first name state
    */
    onChangeFirstName(e)
    {
        // this.setState({
        //     firstName: e.target.value
        // });

        if (e.target.value.length < 1)
        {
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
            if ((this.state.username) !== "" || (this.state.firstName) !== "" || (this.state.lastName) !== "" || (this.state.email) !== "" || (this.state.university) !== "") {
                this.setState({
                    disabled: false
                })
            } else {
                this.setState({
                    disabled: true
                })
            }
        })
    }

    /* 
        Event handler for changing the last name state
    */
    onChangeLastName(e)
    {
        // this.setState({
        //     lastName: e.target.value
        // });

        if (e.target.value.length < 1)
        {
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
            if ((this.state.username) !== "" || (this.state.firstName) !== "" || (this.state.lastName) !== "" || (this.state.email) !== "" || (this.state.university) !== "") {
                this.setState({
                    disabled: false
                })
            } else {
                this.setState({
                    disabled: true
                })
            }
        })
    }

    /* 
        Event handler for changing the email state
    */
    onChangeEmail(e)
    {
        // this.setState({
        //     email: e.target.value
        // });

        if (e.target.value.length < 1)
        {
            this.setState({
                emailError: 'Email is required'
            })
        } else {
            this.setState({
                emailError: ''
            })
        }
        
        this.setState({
            email: e.target.value
        }, () => {
            if ((this.state.username) !== "" || (this.state.firstName) !== "" || (this.state.lastName) !== "" || (this.state.email) !== "" || (this.state.university) !== "") {
                this.setState({
                    disabled: false
                })
            } else {
                this.setState({
                    disabled: true
                })
            }
        })
    }

    /* 
        Event handler for changing the university state
    */
   onChangeUniversity(e)
   {
    //    this.setState({
    //        university: e.target.value
    //    });

       if (e.target.value.length < 1)
       {
           this.setState({
               universityError: 'University is required'
           })
       } else {
           this.setState({
               universityError: ''
           })
       }
       
       this.setState({
           university: e.target.value
       }, () => {
            if ((this.state.username) !== "" || (this.state.firstName) !== "" || (this.state.lastName) !== "" || (this.state.email) !== "" || (this.state.university) !== "") {
                this.setState({
                    disabled: false
                })
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

        const User = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            id: this.state.id,
            university: this.state.university
        };

        axios.put('http://localhost:5000/user/update', User)
        .then(() => {
            window.location.href = 'http://localhost:3000/settings';
        })
        .catch(err => { console.log(err) });
    }

    render()
    {
        const navbarLogo = {
            width: "40px",
            height: "40px"
        };

        const settingsDiv ={
            margin: "auto",
            width: "50%"
        };

        return (
            <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/dashboard"><img src={ logoHead } style={ navbarLogo } alt="Logo" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/dashboard"><h2>Twoters</h2><span className="sr-only">(current)</span></a>
                            </li>
                        </ul>

                        {
                            this.state.isLoading ? 
                                null :
                                (
                                    this.state.isLoggedIn ? 
                                    <div style={{ marginLeft: "auto"}}>
                                        <button title='Dashboard' onClick={this.onDashboard} className="btn btn-light" type="button"><img src={homeIcon} style={{ height:"24px", width: "24px" }} /></button>
                                        <button title='Create' onClick={this.onCreate} className="btn btn-light" type="button"><img src={createIcon} style={{ height:"24px", width: "24px" }} /></button>
                                        <button title='Settings' onClick={this.onSettings} className="btn btn-light" type="button"><img src={settingsIcon} style={{ height:"24px", width: "24px" }} /></button> 
                                        <button title='Logout' onClick={this.onLogout} className="btn btn-light" type="button"><img src={logoutIcon} style={{ height:"24px", width: "24px" }}/></button>
                                    </div> :
                                    null
                                )
                        }
                    </div>
                </nav>

                <div style={ settingsDiv }>
                    <h1 style={{ textAlign: "center", marginTop: "4%" }}>Settings</h1>
                    <div>
                        <form onSubmit={ this.onSubmit }>
                            <table style={{ margin: "auto"}}>
                                <tbody>
                                    <tr>
                                        <td><span>Username:</span></td>
                                        <td><FormControl style={{ margin: "10px", height: "35px", width: "400px", fontWeight: "100" }} 
                                            name="username"
                                            type="text"
                                            placeholder={ this.state.dbUsername }
                                            value={ this.state.username }
                                            onChange={ this.onChangeUsername }
                                            maxLength="14"
                                        /></td>
                                    </tr>

                                    <tr>
                                        <td><span>First name:</span></td>
                                        <td><FormControl style={{ margin: "10px", height: "35px", width: "400px", fontWeight: "100" }}
                                            name="firstName"
                                            type="text"
                                            placeholder={ this.state.dbFirstName }
                                            value={ this.state.firstName }
                                            onChange={ this.onChangeFirstName }
                                            maxLength="20"
                                        /></td>
                                    </tr>

                                    <tr>
                                        <td><span>Last name:</span></td>
                                        <td><FormControl style={{ margin: "10px", height: "35px", width: "400px", fontWeight: "100" }}
                                            name="lastName"
                                            type="text"
                                            placeholder={ this.state.dbLastName }
                                            value={ this.state.lastName }
                                            onChange={ this.onChangeLastName }
                                            maxLength="20"
                                        /></td>
                                    </tr>

                                    <tr>
                                        <td><span>Email:</span></td>
                                        <td><FormControl style={{ margin: "10px", height: "35px", width: "400px", fontWeight: "100" }}
                                            name="email"
                                            type="text"
                                            placeholder={ this.state.dbEmail }
                                            value={ this.state.email }
                                            onChange={ this.onChangeEmail }
                                            maxLength="35"
                                        /></td>
                                    </tr>

                                    <tr>
                                        <td><span>University:</span></td>
                                        <td><FormControl style={{ margin: "10px", height: "35px", width: "400px", fontWeight: "100" }} 
                                            name="university"
                                            type="text"
                                            placeholder={ this.state.dbUniversity }
                                            value={ this.state.university }
                                            onChange={ this.onChangeUniversity }
                                            maxLength="35"
                                        /></td>
                                    </tr>

                                    {/* <tr>
                                        <td><span>id:</span></td>
                                        <td><FormControl style={{ margin: "10px", height: "35px", width: "400px" }}
                                            name="email"
                                            type="text"
                                            placeholder={ this.state.id }
                                            maxLength="35"
                                        /></td>
                                    </tr> */}
                                </tbody>                                
                            </table>

                            <button disabled={ this.state.disabled } className="btn btn-dark" type="subimt" style={{ marginLeft: "46%" }}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default settings;