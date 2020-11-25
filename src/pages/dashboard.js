import React, { Component } from 'react';
import logoHead from '../Assets/twooty5.png';
import createIcon from '../Assets/create-icon.svg';
import homeIcon from '../Assets/home-icon.svg';
import settingsIcon from '../Assets/settings-icon.svg';
import logoutIcon from '../Assets/logout-icon.svg';
import searchIcon from '../Assets/search-icon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';
import { wait } from '@testing-library/react';

/*
    Class responsible for creating the dashboard page and contains all
    it's frontend capability.
*/
class dashboard extends Component 
{
    constructor()
    {
        super();

        this.state = {
            userID: '',
            username: '',

            isLoggedIn: false,
            isLoading: true,

            searchValue: '',
            searchResults: [],

            usersPosts: []
        };

        this.onLogout = this.onLogout.bind(this);
        this.onDashboard = this.onDashboard.bind(this);
        this.onSettings = this.onSettings.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onSearch = this.onSearch.bind(this);

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

    async componentDidMount(e)
    {
        axios.defaults.withCredentials = true;

        await axios.get('http://localhost:5000/user/data', { withCredentials: true })
        .then(res => {
            if (res.data !== undefined)
            {
                this.setState(() => (
                    {
                        userID: res.data._id,
                        username: res.data.username
                    }
                ))
            }
            else
            {
                console.warn("Settings component did not properly mount.");
            }
        }).catch(err => { console.log(err) });


        const userID = {
            userID: this.state.userID
        };

        axios.post('http://localhost:5000/listing/userPosts', userID)
        .then(res => {
            this.setState(() => (
                {
                    userPosts: res.data
                }
            ));
            console.log(this.state.userPosts);
        }).catch(err => { console.log(err) });
    }

    /*
        Event handler to update the state of the
        search value textfield
    */
    onChangeSearchValue(e)
    {
        this.setState({
            searchValue: e.target.value
        });
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
        Handles searching the database for the titles
        with similar values to what the search value state contains
        and returns the data into the searchResults state.
    */
    onSearch(e)
    {
        e.preventDefault(e);

        const Search = {
            searchText: this.state.searchValue
        };

        axios.post('http://localhost:5000/listing/search', Search)
        .then(res => {
            if(this.state.searchValue != '')
            {
                this.setState(() => (
                    {
                        searchResults: res.data
                    }
                ));

                console.log(res.data);
            }
        }).catch(err => { console.log(err) });
    }

    render()
    {
        const navbarLogo = {
            width: "40px",
            height: "40px"
        };

        const searchResult = {
            margin: "auto",
            width: "600px",
            maxWidth: "600px",
            border: "solid 1px black",
            borderCollapse: "inherit"
        };

        const searchResult2 = {
            margin: "auto",
            width: "600px",
            maxWidth: "600px",
            border: "solid 1px black",
            borderCollapse: "inherit",
            borderTop: "none"
        };

        const searchResultUsername = {
            wordWrap: "break-word",
            textAlign: "left",
            padding: "0px 5px",
            fontWeight: "bold"
        };

        const searchResultUniversity = {
            wordWrap: "break-word",
            textAlign: "left",
            padding: "0px 5px",
            fontWeight: "lighter"
        };

        const searchResultTitle = {
            wordWrap: "break-word",
            textAlign: "left",
            fontWeight: "lighter",
            padding: "0px 5px"
        };

        const searchResultDesc = {
            wordWrap: "break-word",
            textAlign: "left",
            padding: "25px",
            wordBreak: "break-word"
        };

        const userPostsTable = []

        for(let x = 0; x < this.state.usersPosts.length; x++)
        {
            userPostsTable.push(
                (x < 1) ? 
                (
                    <table style={ searchResult }>
                        <tr>
                            <td style={ searchResultUsername }>@{ this.state.usersPosts[x].username }</td>
                            <td style={ searchResultUniversity }>{ this.state.usersPosts[x].university }</td>
                        </tr>
                        <tr>
                            <td style={ searchResultTitle }>{ this.state.usersPosts[x].title }</td>
                        </tr>
                        <tr>
                            <td style={ searchResultDesc }>{ this.state.usersPosts[x].description }</td>
                        </tr>
                    </table>
                ) :
                (
                    <table style={ searchResult2 }>
                        <tr>
                            <td style={ searchResultUsername }>{ this.state.usersPosts[x].username }</td>
                            <td style={ searchResultUniversity }>{ this.state.usersPosts[x].university }</td>
                        </tr>
                        <tr>
                            <td style={ searchResultDesc }>{ this.state.usersPosts[x].description }</td>
                        </tr>
                    </table>
                )
            )
        }

        const searchResultTable = []

        for(let i = 0; i < this.state.searchResults.length; i++)
        {
            searchResultTable.push(
                (i < 1) ? 
                (
                    <table style={ searchResult }>
                        <tr>
                            <td style={ searchResultUsername }>@{ this.state.searchResults[i].username }</td>
                            <td style={ searchResultUniversity }>{ this.state.searchResults[i].university }</td>
                        </tr>
                        <tr>
                            <td style={ searchResultTitle }>{ this.state.searchResults[i].title }</td>
                        </tr>
                        <tr>
                            <td style={ searchResultDesc }>{ this.state.searchResults[i].description }</td>
                        </tr>
                    </table>
                ) :
                (
                    <table style={ searchResult2 }>
                        <tr>
                            <td style={ searchResultUsername }>{ this.state.searchResults[i].username }</td>
                            <td style={ searchResultUniversity }>{ this.state.searchResults[i].university }</td>
                        </tr>
                        <tr>
                            <td style={ searchResultDesc }>{ this.state.searchResults[i].description }</td>
                        </tr>
                    </table>
                )
            )
        }

        return (
            <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <a className="navbar-brand" href="/dashboard"><img src={ logoHead } style={ navbarLogo } alt="Twoters Logo"/></a>

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
                            this.state.isLoading ? 
                                null :
                                this.state.isLoggedIn ? 
                                    (
                                        <div style={{ display: "flex", width: "100%"}}>

                                            <div style={{ width: "65%"}}>

                                                <form onSubmit={ this.onSearch } style={{ display: "inline-block", width: "75%", marginLeft: "5%" }}>

                                                    <FormControl style={{ paddingTop: "1px", width: "80%", float: "left" }}
                                                        name="searchValue"
                                                        type="text"
                                                        placeholder="Search"
                                                        value={ this.state.searchValue }
                                                        onChange={ this.onChangeSearchValue }
                                                        maxLength="20"
                                                    />

                                                    <button className="btn btn-light" type="subimt" style={{ marginLeft: "1%"}}><img src={searchIcon} style={{ height:"24px", width: "24px" }} /></button>

                                                </form>
                                        
                                            </div>

                                            <div style={{ marginLeft: "auto"}}>
                                                <button title='Dashboard' onClick={this.onDashboard} className="btn btn-light" type="button"><img src={homeIcon} style={{ height:"24px", width: "24px" }} /></button>
                                                <button title='Create' onClick={this.onCreate} className="btn btn-light" type="button"><img src={createIcon} style={{ height:"24px", width: "24px" }} /></button>
                                                <button title='Settings' onClick={this.onSettings} className="btn btn-light" type="button"><img src={settingsIcon} style={{ height:"24px", width: "24px" }} /></button> 
                                                <button title='Logout' onClick={this.onLogout} className="btn btn-light" type="button"><img src={logoutIcon} style={{ height:"24px", width: "24px" }}/></button>
                                            </div>
                                        </div>
                                    ) :
                                    null
                        }
                    </div>
                </nav>

                <div>
                    {
                        (this.state.searchResults.length == 0) ?
                            (
                                <div style={{ textAlign: "center", margin: "15px" }}>
                                    { userPostsTable }
                                </div>
                            ) :
                            (
                                <div style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px" }}>
                                    { searchResultTable }
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default dashboard;