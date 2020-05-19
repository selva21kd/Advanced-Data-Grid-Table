import React from 'react';
import { Route } from 'react-router-dom';
import { DefaultLayout } from '../layouts';


export const DefaultLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <DefaultLayout>
                <Component {...matchProps} />
            </DefaultLayout>
        )} />
    )
};
