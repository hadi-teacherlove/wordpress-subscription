import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import New from "./subscriptions-views/new";
import Edit from "./subscriptions-views/edit";
import List from "./subscriptions-views/list";

export default () => {
    return (
        <HashRouter>
            <h1>Subscriptions</h1>
            <ul className="subscription-navigation">
                <li><a href="#/">List</a></li>
                <li><a href="#/new">New</a></li>
                <li><a href="#/edit/1">Edit</a></li>
            </ul>
            <Routes>
                <Route path="/" element={ <List /> } />
                <Route path="/new" element={<New />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </HashRouter>
    )
};
