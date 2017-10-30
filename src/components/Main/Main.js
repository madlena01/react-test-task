import React, { Component } from 'react';
import UserList from '../../containers/Users/UserList';
import AddUser from '../../containers/Users/AddUser';
import { Route, Switch } from 'react-router-dom'

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={UserList}/>
                <Route exact path='/contacts/add' component={AddUser}/>
            </Switch>
        );
    }
}

export default Main;
