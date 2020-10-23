import React, { Component } from 'react';
import logoHead from '../Assets/twooty5.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';

class dashboard extends Component 
{
    constructor()
    {
        super();

        this.state = {
            isLoggedIn: false,
            isLoading: true,
            searchValue: ''
        };

        this.onLogout = this.onLogout.bind(this);
        this.onDashboard = this.onDashboard.bind(this);
        this.onSettings = this.onSettings.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);

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

    onChangeSearchValue(e)
    {
        this.setState({
            searchValue: e.target.value
        });
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
        e.preventDefault(e);

        console.log(e.target.value);
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

                    <a className="navbar-brand" href="!#"><img src={ logoHead } style={ navbarLogo } alt="Twoters Logo"/></a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/dashboard"><h2>Twoters</h2><span className="sr-only">(current)</span></a>
                            </li>
                        </ul>

                        <div style={{ width: "25%"}}>

                        </div>

                        {
                            this.state.isLoading ? null :
                                this.state.isLoggedIn ? 
                                <div style={{ display: "flex", width: "100%"}}>
                                    <div style={{ width: "55%"}}>
                                        <form onSubmit={ this.onSubmit } style={{ display: "inline-block", width: "75%", marginLeft: "5%" }}>
                                        <FormControl style={{ paddingTop: "1px" }}
                                            name="search"
                                            type="text"
                                            placeholder="Search"
                                            value={ this.state.searchValue }
                                            onChange={ this.onChangeSearchValue }
                                            maxLength="14"
                                        />
                                        </form>
                                
                                        <button className="btn btn-dark" type="subimt" style={{ marginLeft: "2%"}}>Search</button>
                                    </div>

                                    <div style={{ marginLeft: "12.5%"}}>
                                        <button onClick={this.onCreate} className="btn btn-link" type="button">Create</button>
                                        <button onClick={this.onDashboard} className="btn btn-link" type="button">Dashboard</button> 
                                        <button onClick={this.onSettings} className="btn btn-link" type="button">Settings</button> 
                                        <button onClick={this.onLogout} className="btn btn-link" type="button">Logout</button>
                                    </div>
                                </div> :
                                null
                        }
                    </div>
                </nav>

                <div>
                    <h1>dashboard</h1>
                    
                </div>
            </div>
        )
    }
}

export default dashboard;