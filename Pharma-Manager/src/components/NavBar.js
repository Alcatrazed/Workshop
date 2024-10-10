import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from "../assets/pharma.manger2.0.png";
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

const refresh = () => {
    window.location.reload();
}

export default function NavBar() {
    const { currentUser, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <Nav>
            <SidePart>
                <Link onClick={() => { setTimeout(refresh, 10) }} style={{ textDecoration: 'none', color: 'white' }} to='/'>
                    <Logo src={logo} alt='pharmacy logo' />
                </Link>
            </SidePart>
            <MainPart>
                <Salut>
                    <div className="right">
                        {currentUser ? (
                            <div className="user">
                                <StyledLink to="" className="deconnexion" onClick={logout}>
                                    <span>Déconnexion</span>
                                </StyledLink>
                                
                            </div>
                        ) : ( location.pathname !== "/login" && 
                            <StyledLink className='deconnexion'>
                                <Link to="/login">Se connecter</Link>
                            </StyledLink>
                        )}
                    </div>
                </Salut>
            </MainPart>
        </Nav>
    )
}


const StyledLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    border-radius: 12px;
    background-color: #F1C40F;
    color: #F7FAFD;
    font-weight: bold;
    font-size: 16px;  
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #F7FAFD;  // Couleur jaune sur hover
        color: #1D242E;
    }

    &.deconnexion {
        margin-left: 10px;
    }
`;

const Salut = styled.div`
    width: 160px;
    height: 40px;
    margin-right: 40px;
    text-align: end;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Nav = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`;

const SidePart = styled.div`
    width: 20%;
    background-color: #F7FAFD;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
`;

const MainPart = styled.div`
    width: 80%;
    background-color: #1D242E;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Logo = styled.img`
    height: 60px;
    width: auto;
`;
