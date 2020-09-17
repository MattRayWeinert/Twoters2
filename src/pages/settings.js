import React, { Component } from 'react';
import logoHead from '../Assets/twooty5.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

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

            dbUsername: '',
            dbFirstName: '',
            dbLastName: '',
            dbEmail: '',
            dbUniversity: '',
            
            isLoggedIn: false,
            isLoading: true
        };

        this.onLogout = this.onLogout.bind(this);
        this.onDashboard = this.onDashboard.bind(this);
        this.onSettings = this.onSettings.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
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
                if (res.data != undefined)
                {
                    this.setState(() => (
                        {
                            dbUsername: res.data.username,
                            dbFirstName: res.data.firstName,
                            dbLastName: res.data.lastName,
                            dbEmail: res.data.email,
                            id: res.data._id
                        }
                    ))
                }

                else
                {
                    console.warn("Settings component did not properly mount.");
                }
            }).catch(err => { console.log(err) });
    }

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

    onChangeUsername(e)
    {
        this.setState({
            username: e.target.value
        });

        console.log(e.target.value);
    }

    onChangePassword(e)
    {
        this.setState({
            password: e.target.value
        });
    }

    onChangeFirstName(e)
    {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e)
    {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeEmail(e)
    {
        this.setState({
            email: e.target.value
        });
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
            id: this.state.id
        };

        // console.log(User);

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
                                <div>
                                    <button onClick={this.onDashboard} className="btn btn-link" type="button">Dashboard</button> 
                                    <button onClick={this.onSettings} className="btn btn-link" type="button">Settings</button> 
                                    <button onClick={this.onLogout} className="btn btn-link" type="button">Logout</button>
                                </div> :
                                null
                        }
                    </div>
                </nav>

                <div style={ settingsDiv }>
                    <h1 style={{ textAlign: "center" }}>Settings</h1>

                    <div>
                        <form onSubmit={ this.onSubmit }>
                            <table style={{ margin: "auto"}}>
                                <tr>
                                    <td><span>Username:</span></td>
                                    <td><FormControl style={{ margin: "10px", height: "28px" }} 
                                        name="username"
                                        type="text"
                                        placeholder={ this.state.dbUsername }
                                        // required
                                        value={ this.state.username }
                                        onChange={ this.onChangeUsername }
                                        maxLength="14"
                                    /></td>
                                </tr>

                                <tr>
                                    <td><span>First name:</span></td>
                                    <td><FormControl style={{ margin: "10px", height: "28px" }}
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
                                    <td><FormControl style={{ margin: "10px", height: "28px" }}
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
                                    <td><FormControl style={{ margin: "10px", height: "28px" }}
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
                                    <td><FormControl style={{ margin: "10px", height: "28px" }} 
                                        placeholder="UPDATE THIS FIELD IN FUTURE"
                                    /></td>
                                </tr>


                                <tr>
                                    <td><span>id:</span></td>
                                    <td><FormControl style={{ margin: "10px", height: "28px" }}
                                        name="email"
                                        type="text"
                                        placeholder={ this.state.id }
                                        maxLength="35"
                                    /></td>
                                </tr>

                                <tr>
                                    <button className="btn btn-dark" type="subimt" style={{ margin: "10px" }}>Apply</button>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default settings;