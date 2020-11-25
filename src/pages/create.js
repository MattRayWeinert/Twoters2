import React, { Component } from 'react';
import logoHead from '../Assets/twooty5.png';
import createIcon from '../Assets/create-icon.svg';
import homeIcon from '../Assets/home-icon.svg';
import settingsIcon from '../Assets/settings-icon.svg';
import logoutIcon from '../Assets/logout-icon.svg';
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
            userId: '',

            titleError: '',
            universityError: '',
            descriptionError: '',
            locationError: '',

            disabled: 'true'
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
                        userId: res.data._id,
                        username: res.data.username
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
            userId: this.state.userId,
            username: this.state.username
        };

        console.log(Listing);

        axios.post('http://localhost:5000/listing/new', Listing)
        .then(() => {
            window.location.href = 'http://localhost:3000/dashboard';
        })
        .catch(err => { console.log(err) });
    }

    onChangeDescription(e)
    {
        // this.setState({
        //     description: e.target.value
        // });

        if (e.target.value.length < 1)
        {
            this.setState({
                descriptionError: 'Descrption is required'
            })
        } else {
            this.setState({
                descriptionError: ''
            })
        }
        
        this.setState({
            description: e.target.value
        }, () => {

            if (this.state.titleError === "" && this.state.universityError === "" && this.state.descriptionError === "" && this.state.locationError === "") {
                if ((this.state.title) !== "" && (this.state.university) !== "" && (this.state.description) !== ""
                && (this.state.location) !== "") {
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

    onChangeUniversity(e)
    {
        // this.setState({
        //     university: e.target.value
        // });

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

            if (this.state.titleError === "" && this.state.universityError === "" && this.state.descriptionError === "" && this.state.locationError === "") {
                if ((this.state.title) !== "" && (this.state.university) !== "" && (this.state.description) !== ""
                && (this.state.location) !== "") {
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

    onChangeLocation(e)
    {
        // this.setState({
        //     location: e.target.value
        // });

        if (e.target.value.length < 1)
        {
            this.setState({
                locationError: 'Location is required'
            })
        } else {
            this.setState({
                locationError: ''
            })
        }
        
        this.setState({
            location: e.target.value
        }, () => {

            if (this.state.titleError === "" && this.state.universityError === "" && this.state.descriptionError === "" && this.state.locationError === "") {
                if ((this.state.title) !== "" && (this.state.university) !== "" && (this.state.description) !== ""
                && (this.state.location) !== "") {
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

    onChangeTitle(e)
    {
        // this.setState({
        //     title: e.target.value
        // });

        if (e.target.value.length < 1)
        {
            this.setState({
                titleError: 'Title is required'
            })
        } else {
            this.setState({
                titleError: ''
            })
        }
        
        this.setState({
            title: e.target.value
        }, () => {

            if (this.state.titleError === "" && this.state.universityError === "" && this.state.descriptionError === "" && this.state.locationError === "") {
                if ((this.state.title) !== "" && (this.state.university) !== "" && (this.state.description) !== ""
                && (this.state.location) !== "") {
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

    render() 
    {
        const navbarLogo = {
            width: "40px",
            height: "40px"
        };

        const commonTextbox = {
            marginTop: "20px",
            height: "35px",
            width: "550px",
            fontWeight: "100"
        }

        const descTextbox = {
            marginTop: "20px",

        }

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
                                <div style={{ marginLeft: "auto"}}>
                                    <button title='Dashboard' onClick={this.onDashboard} className="btn btn-light" type="button"><img src={homeIcon} style={{ height:"24px", width: "24px" }} /></button>
                                    <button title='Create' onClick={this.onCreate} className="btn btn-light" type="button"><img src={createIcon} style={{ height:"24px", width: "24px" }} /></button>
                                    <button title='Settings' onClick={this.onSettings} className="btn btn-light" type="button"><img src={settingsIcon} style={{ height:"24px", width: "24px" }} /></button> 
                                    <button title='Logout' onClick={this.onLogout} className="btn btn-light" type="button"><img src={logoutIcon} style={{ height:"24px", width: "24px" }}/></button>
                                </div> :
                                null
                        }
                    </div>
                </nav>

                <div>

                    <h1 style={{ textAlign: "center", marginTop: "2%" }}>
                        Create a post
                    </h1>

                    <form onSubmit={ this.onSubmit }>
                        <table style={{ margin: "auto"}}>
                            <tbody>

                                <tr>
                                    <td><span>Title:</span></td>
                                    <td><FormControl style={ commonTextbox } 
                                        name="Title"
                                        type="text"
                                        value={ this.state.title }
                                        onChange={ this.onChangeTitle }
                                        maxLength="32"
                                    /></td>
                                </tr>

                                {/* {
                                    this.state.titleError.length > 0 && 
                                    <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.titleError}</span>
                                } */}

                                <tr>
                                    <td><span>University:</span></td>
                                    <td><FormControl style={ commonTextbox }
                                        name="University"
                                        type="text"
                                        value={ this.state.university }
                                        onChange={ this.onChangeUniversity }
                                        maxLength="32"
                                    /></td>
                                </tr>

                                {/* {
                                    this.state.universityError.length > 0 && 
                                    <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.universityError}</span>
                                } */}

                                <tr>
                                    <td><span>Location:</span></td>
                                    <td><FormControl style={ commonTextbox }
                                        name="Location"
                                        type="text"
                                        value={ this.state.location }
                                        onChange={ this.onChangeLocation }
                                        maxLength="32"
                                    /></td>
                                </tr>

                                {/* {
                                    this.state.locationError.length > 0 && 
                                    <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.locationError}</span>
                                } */}

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
                                    <td><span>Description:</span></td>
                                    <td><FormControl as="textarea" rows={10} style={ descTextbox }
                                        name="Description"
                                        type="text"
                                        value={ this.state.description }
                                        onChange={ this.onChangeDescription }
                                        maxLength="250"
                                    /></td>
                                </tr>

                                {/* {
                                    this.state.descriptionError.length > 0 && 
                                    <span className='error' style={{color: "red", fontSize: "0.625em"}}>{this.state.descriptionError}</span>
                                } */}

                            </tbody>                                
                        </table>

                        <button disabled={ this.state.disabled } className="btn btn-dark" type="subimt" style={{ marginLeft: "48%", marginTop: "20px" }}>Submit</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Create;