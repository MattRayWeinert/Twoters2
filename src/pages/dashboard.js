import React, { Component } from 'react';
import logoHead from '../Assets/twooty5.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

class dashboard extends Component 
{
    constructor()
    {
        super();

        this.state = {
            isLoggedIn: false,
            isLoading: true
        };

        this.onLogout = this.onLogout.bind(this);
        this.onDashboard = this.onDashboard.bind(this);
        this.onSettings = this.onSettings.bind(this);

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


    render() 
    {
        const navbarLogo = {
            width: "40px",
            height: "40px"
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

                <div>
                    <h1>dashboard</h1>
                    
                </div>
            </div>
        )
    }
}

export default dashboard;