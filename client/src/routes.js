import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Books from './pages/Books';
import NewBook from './pages/NewBook';

export default function RoutesApp() {
    return (
        //Garante o roteamento correto
        <BrowserRouter>
            {/*Garante que não tem mais de uma rota aberta ao mesmo tempo */}
            <Routes>
                <Route exact path="/" element={ <Login /> } />
                <Route path="/books" element={ <Books /> } />
                <Route exact path="/book/new/:bookId" element={ <NewBook /> } />
            </Routes>
        </BrowserRouter>
    );
}