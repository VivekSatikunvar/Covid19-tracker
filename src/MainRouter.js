import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import App from './App';
import Vaccine from './Vaccine';

function MainRouter() {
    return (
        <BrowserRouter>
            <div className='container'>
                <Switch>
                    <Route path="/" component={App} exact />
                    <Route path="/vaccine" component={Vaccine}  />
                </Switch>
            </div>
        </BrowserRouter>
        
    )
}

export default MainRouter
