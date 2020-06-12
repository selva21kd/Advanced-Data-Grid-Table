import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { StPeople, StPlanets, StVehicles } from '../views';
import { DefaultLayoutRoute } from './RouterLayout';


class RouterComp extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <DefaultLayoutRoute exact path="/" component={ StPeople } />
                    <DefaultLayoutRoute exact path="/planet" component={ StPlanets } />
                    <DefaultLayoutRoute exact path="/vehicle" component={ StVehicles } />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default RouterComp