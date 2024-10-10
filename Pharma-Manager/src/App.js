import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MainBar from './components/MainBar';
import "./index.css"
import { AuthContext, AuthContextProvider } from './AuthContext/AuthContext'; // Importer useAuth
import { BrowserRouter as Router } from 'react-router-dom'; // Assure-toi que le Router est ici

function App() {
  return (
    <AuthContextProvider > 
      <Router>
      <Container>
        <NavBar />
        <MainContent/>
      </Container>
      </Router>
    </AuthContextProvider>
  );
}

const MainContent = () => {
  const { currentUser } = useContext(AuthContext);
  const location = window.location.pathname; // Utilisation de la location pour détecter la page courante  
  return (
    <Main>
      {currentUser && location !== '/' && <SideBar />}
      <MainBar />
    </Main>
  );
};

export default App;


const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Lato", sans-serif !important;
  overflow: hidden;
`;

const Main = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  background-color: #edf1f5;
`;