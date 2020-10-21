import React, { Component } from 'react';
import logoHead from '../Assets/twooty5.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';

class Create extends Component 
{
    constructor()
    {
        super();

        this.state = {
            isLoggedIn: false,
            isLoading: true,

            title: '',
            university: '',
            description: '',
            location: '',
            userId: ''
        };

        this.onLogout = this.onLogout.bind(this);
        this.onDashboard = this.onDashboard.bind(this);
        this.onSettings = this.onSettings.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUniversity = this.onChangeUniversity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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

    componentDidMount(e)
    {
        axios.defaults.withCredentials = true;

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
                        userId: res.data._id
                    }
                ))
            }

            else
            {
                console.warn("Settings component did not properly mount.");
            }
        }).catch(err => { console.log(err) });
    }

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

    onSubmit(e)
    {
        e.preventDefault();

        axios.defaults.withCredentials = true;

        const Listing = {
            title: this.state.title,
            university: this.state.university,
            location: this.state.location,
            description: this.state.description,
            userId: this.state.userId
        };

        console.log(Listing);

        axios.post('http://localhost:5000/listing/new', Listing)
        .then(() => {
            window.location.href = 'http://localhost:3000/settings';
        })
        .catch(err => { console.log(err) });
    }

    onChangeDescription(e)
    {
        this.setState({
            description: e.target.value
        });
    }

    onChangeUniversity(e)
    {
        this.setState({
            university: e.target.value
        });
    }

    onChangeLocation(e)
    {
        this.setState({
            location: e.target.value
        });
    }

    onChangeTitle(e)
    {
        this.setState({
            title: e.target.value
        });
    }

    render() 
    {
        const navbarLogo = {
            width: "40px",
            height: "40px"
        };

        return (
            <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/dashboard"><img src={ logoHead } style={ navbarLogo } alt="Twooty" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/dashboard" ><h2>Twoters</h2><span className="sr-only">(current)</span></a>
                            </li>
                        </ul>

                        {
                            this.state.isLoading ? null :
                                this.state.isLoggedIn ? 
                                <div>
                                    <button onClick={this.onCreate} className="btn btn-link" type="button">Create</button>
                                    <button onClick={this.onDashboard} className="btn btn-link" type="button">Dashboard</button> 
                                    <button onClick={this.onSettings} className="btn btn-link" type="button">Settings</button> 
                                    <button onClick={this.onLogout} className="btn btn-link" type="button">Logout</button>
                                </div> :
                                null
                        }
                    </div>
                </nav>

                <div>
                        <form onSubmit={ this.onSubmit }>
                            <table style={{ margin: "auto"}}>
                                <tbody>
                                    <tr>
                                        <td><FormControl style={{ margin: "10px", height: "28px" }} 
                                            name="Title"
                                            type="text"
                                            placeholder="Title"
                                            value={ this.state.title }
                                            onChange={ this.onChangeTitle }
                                            maxLength="32"
                                        /></td>
                                    </tr>

                                    <tr>
                                        <td><FormControl style={{ margin: "10px", height: "28px" }}
                                            name="University"
                                            type="text"
                                            placeholder="University"
                                            value={ this.state.university }
                                            onChange={ this.onChangeUniversity }
                                            maxLength="32"
                                        /></td>
                                    </tr>

                                    <tr>
                                        <td><FormControl style={{ margin: "10px", height: "28px" }}
                                            name="Location"
                                            type="text"
                                            placeholder="Location"
                                            value={ this.state.location }
                                            onChange={ this.onChangeLocation }
                                            maxLength="32"
                                        /></td>
                                    </tr>

                                    {/* <tr>
                                        <td><FormControl style={{ margin: "10px", height: "28px" }}
                                            name="Subject"
                                            type="text"
                                            placeholder="subject"
                                            value={ this.state.subject }
                                            onChange={ this.onChangeSubject }
                                            maxLength="32"
                                        /></td>
                                    </tr> */}

                                    <tr>
                                        <td><FormControl style={{ margin: "10px", height: "28px" }}
                                            name="Description"
                                            type="text"
                                            placeholder="Description"
                                            value={ this.state.description }
                                            onChange={ this.onChangeDescription }
                                            maxLength="250"
                                        /></td>
                                    </tr>
                                </tbody>                                
                            </table>

                            <button className="btn btn-dark" type="subimt" style={{ marginLeft: "50%" }}>Submit</button>

                        </form>
                    </div>
            </div>
        )
    }
}

export default Create;