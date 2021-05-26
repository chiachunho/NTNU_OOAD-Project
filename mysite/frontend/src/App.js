import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CustomLayout from './containers/Layout';
import { Games, Account } from './pages';
import Hello from './components/Hello';
import PageNotFound from './components/PageNotFound';
import { Switch } from 'react-router-dom';
import NetworkError from './components/NetworkError';
import Home from './components/Homepage';
import Rules from './components/Rules';
import Tutorial from './components/Tutorial';

class App extends Component {
    render() {
        return (
            <CustomLayout>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/games' component={Games} />
                    <Route path='/account' component={Account} />
                    <Route path={'/rules/'} exact component={Rules} />
                    <Route path={'/hello/'} exact component={Hello} />
                    <Route path={'/tutorial/'} exact component={Tutorial} />
                    <Route path={'/networkError/'} exact component={NetworkError} />
                    <Route exact component={PageNotFound} />
                </Switch>
            </CustomLayout>
        );
    }
}

export default App;
