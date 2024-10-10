import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Routes, 
    Route,
    useNavigate
} from "react-router-dom";
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import Reports from './Reports';
import Configuration from './Configuration';
import Login from './login/Login';
import Register from './register/Register';
import HomePage from './homepage/HomePage';
import { AuthContext } from '../AuthContext/AuthContext';
import PrivateRoute from './PrivateRoute';

export default function MainBar() {
    const { currentUser } = useContext(AuthContext); 
   
    return(
        <Container>
                <Routes>                                      
                    <Route path="/dashboard" element={currentUser ? <Dashboard /> : <PrivateRoute />} />
                    <Route path="/inventory" element={currentUser ? <Inventory /> : <PrivateRoute />} />
                    <Route path="/reports" element={currentUser ? <Reports /> : <PrivateRoute />} />
                    <Route path="/configuration" element={currentUser ? <Configuration /> : <PrivateRoute />} />

                    <Route exact path='/' element={<HomePage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    
                </Routes>
        </Container>
    );
}

const Container = styled.div`
    width: 80%;
    height: 100%;
`;