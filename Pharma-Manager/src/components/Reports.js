import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import SectionTitle from './subComponents/SectionTitle';
import axios from 'axios';
import Sell from './subComponents/Sell';
import { DNA } from 'react-loader-spinner';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Reports() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login'); 
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        axios.get('https://pharmacy-api-bice.vercel.app/api/sold')
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
    }, [])

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
            <SectionTitle title='Rapports' info=' Informations sur les produits vendus et les revenus' />
            <SellInfo>
                <InfoBlock>
                    Nom
                </InfoBlock>
                <InfoBlock>
                    Quantité
                </InfoBlock>
                <InfoBlock>
                    Total
                </InfoBlock>
                <InfoBlock>
                    Date
                </InfoBlock>
            </SellInfo>
            <Selling>
                {   
                    data.map(sold => {
                        return <Sell 
                            name = {sold.drug_name}
                            quantity = {sold.quantity}
                            total = {sold.price}
                            date = "2024-06-27"
                            // date = {sold.date}
                            key = {sold._id}
                        />
                    })
                }
            </Selling>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Selling = styled.div`
    width: 95%;
    border-radius: 5px;
    margin: auto;
    max-height: 700px;
    overflow: scroll;
    background-color: white;
    margin-top: 0;
`;

const InfoBlock = styled.div`
    width: 25%;
    text-align: center;
`;

const SellInfo = styled.div`
    width: 95%;
    height: 60px;
    margin: auto;
    background-color: white;
    margin-bottom: 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
`;

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;  // Prend toute la hauteur de son parent (ex: MainBar)
    width: 100%;   // Prend toute la largeur de son parent
    min-height: 300px; // Assure une hauteur minimale pour garantir le centrage
`;