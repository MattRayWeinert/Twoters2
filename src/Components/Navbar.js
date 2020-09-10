import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Assets/twooty5.png';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            isLoading: true
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

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

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {

        e.preventDefault();

        const User = {
            username: this.state.username,
            password: this.state.password
        }
        
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

    onLogout(e) {

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
        });
    }


    render() {

        const logoStyle = {
            width: "40px",
            height: "40px"
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#"><img src={ logo } style={ logoStyle }/></a>
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
                            <button onClick={this.onLogout} className="btn btn-link" type="button">Logout</button> : 
                            <form onSubmit={this.onSubmit} className="form-inline my-2 my-lg-0">
                                <FormGroup controlId="loginUsername">
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

                                <FormGroup controlId="loginPassowrd">
                                    <FormControl
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        // required
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        maxLength="20"
                                        style={{margin: "5px"}}
                                    />
                                </FormGroup>

                                {/* <input className="form-control mr-sm-2" type="Username" placeholder="Username" aria-label="Search" /> */}
                                {/* <input className="form-control mr-sm-2" type="Password" placeholder="Password" aria-label="Search" /> */}
                                <button className="btn btn-dark" type="subimt">Login</button>
                                <button className="btn btn-link" type="button">Forgot account?</button>
                            </form>
                    }

                </div>
            </nav>
        )
    }
}

export default Navbar;