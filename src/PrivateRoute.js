import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class PrivateRoute extends Component
{

constructor()
{
    super();

    this.state = {
        isLoading: true,
        isLoggedIn: false
    };

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

    render()
    {
        return this.state.isLoading ? null :
            this.state.isLoggedIn ?
            <Route path={this.props.path} component={this.props.component} exact={this.props.exact}/> :
            <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
    }
}

export default PrivateRoute;