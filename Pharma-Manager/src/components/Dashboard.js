import React, {useContext, useEffect, useState} from 'react';

import { DNA } from 'react-loader-spinner'
import DashInfo from './subComponents/DashInfo';
import SectionTitle from './subComponents/SectionTitle';
import RectInfo from './subComponents/RectInfo';

import medical from '../assets/medical.png';
import payments from '../assets/payments.png';
import warning from '../assets/warning.png';
import health from '../assets/health.png';

import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

export default function Dashboard() {
    console.log('Dashboard component mounted');
    const [drugs, setDrugs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sold, setSold] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    console.log("Current User: ", currentUser);
    useEffect(() => {
        console.log("Current User: ", currentUser);
        if (!currentUser) {
            console.log("Redirecting to login");
            navigate('/login'); 
        }
    }, [currentUser, navigate]);
    useEffect(() => {
        axios.get('https://pharmacy-api-bice.vercel.app/api/categories')
        .then(res => {
            setCategories(res.data);
            setLoading(false);
        })

        axios.get('https://pharmacy-api-bice.vercel.app/api/drug')
        .then(res => {
            setDrugs(res.data);
        })

        axios.get('https://pharmacy-api-bice.vercel.app/api/sold')
        .then(res => {
            setSold(res.data);
        })
    }, [])

    let total = 0;
    let shortage = 0;
    let quantity = 0;
    let allQuantity = 0;

    for (let i = 0; i < drugs.length; i++) {
        allQuantity += drugs[i].quantity;

        if (drugs[i].quantity <= 5) {
            shortage++;
            console.log(drugs[i])
        }
    }

    for (let i = 0; i < sold.length; i++) {
        quantity += sold[i].quantity;
        total += sold[i].price;
    }

    if (loading) {
        return (
            <SpinnerWrapper>
                <DNA
                    visible={true}
                    height="220" 
                    width="220"  
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </SpinnerWrapper>
        );
    }
    

    return (
        <Container>
            <FirstPart>
                <SectionTitle 
                    title = 'Tableau de bord' 
                    info = "Un aperçu rapide des données de l'inventaire."
                />
                <DashInfos>
                    <DashInfo 
                        borderColor = 'green' 
                        imgSrc={health} 
                        title='Bon' 
                        info = "État de l'inventaire" 
                    />
                    <DashInfo 
                        borderColor = 'yellow' 
                        imgSrc={payments} 
                        title={`${total} $`} 
                        info = 'Revenu' 
                    />
                    <DashInfo 
                        borderColor = 'blue' 
                        imgSrc={medical} 
                        title={drugs.length} 
                        info = 'Médicaments disponibles' 
                    />
                    <DashInfo 
                        borderColor = 'red' 
                        imgSrc={warning} 
                        title={shortage} 
                        info = 'Pénurie de médicaments' 
                    />
                </DashInfos>
            </FirstPart>
            <SecondPart>
                <Wrapper>
                    <RectInfo 
                        title = 'Inventaire'
                        firstTitle = {allQuantity}
                        firstPara = 'Quantité totale de médicaments'
                        secondTitle = {categories.length}
                        secondPara = 'Catégories de médicaments'
                    />
                    <RectInfo 
                        title = 'Rapport rapide'
                        firstTitle = {quantity}
                        firstPara = 'Quantité de médicaments vendus'
                        secondTitle = {sold.length}
                        secondPara = 'Nombre de médicaments vendus'
                    />
                    <RectInfo 
                        title = 'Dernière transaction'
                        firstTitle = {
                            sold.length
                             && 
                             `${(sold[sold.length - 1].date.toString()).substring(0, 10)} at ${(sold[sold.length - 1].date.toString()).substring(12, 19)}`
                        }
                        firstPara = 'Date exacte de la vente'
                    />
                </Wrapper>
            </SecondPart>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100%;
`;

const FirstPart = styled.div`
    height: 400px;  
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const DashInfos = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
`;

const SecondPart = styled.div`
    height: calc(100vh - 460px);
    width: 100%;
    background-color: white;
`;

const Wrapper = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;


const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;  // Prend toute la hauteur de son parent (ex: MainBar)
    width: 100%;   // Prend toute la largeur de son parent
    min-height: 300px; // Assure une hauteur minimale pour garantir le centrage
`;


