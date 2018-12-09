import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './components/login';
import AuthorizedRoute from './components/AuthorizedRoute';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/login' component={login}></Route>
            <AuthorizedRoute exact path="/" component={App} />
        </Switch>
    </Router>
    
    
    
, document.getElementById('root'));
serviceWorker.unregister();
