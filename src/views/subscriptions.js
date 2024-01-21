import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import New from "./subscriptions-views/new";
import Edit from "./subscriptions-views/edit";
import List from "./subscriptions-views/list";

const SubscriptionRouter = () => {
    const [ editPage, setEditPage ] = useState( false );
    const location = useLocation(); 

    useEffect ( () => {
        setEditPage( false );
        const hash = window.location.hash;
        const currentPath = hash.split( '/' )[ 1 ];

        if ( 'edit' === currentPath ) {
            setEditPage( true );
        }
    }, [ location ] );

    return (
        <>
            <h1>Subscriptions Plans</h1>
            <ListGroup horizontal className="subscription-navigation">
                <NavLink to="/">List</NavLink>
                <NavLink to="/new">New</NavLink>
                {
                    editPage && (
                        <NavLink className={ editPage ? 'active' : '' }>Edit</NavLink>
                    )
                }
            </ListGroup>
            <hr />
            <Routes>
                <Route path="/" element={ <List /> } />
                <Route path="/new" element={<New />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </>
    )
};

export default () => (
    <HashRouter>
        <SubscriptionRouter />
    </HashRouter>
);
