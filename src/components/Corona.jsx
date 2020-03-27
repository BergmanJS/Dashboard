import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import ContentBlock from './commonComponents/ContentBlock';
import MainTitle from './commonComponents/MainTitle';
import { getCoronaStatsFromFinland } from '../data/fetchData';

const CoronaHeader = styled.div`
    display: flex; 
    justify-content: space-between;
`

const Date = styled.span`
    font-size: 1rem;
    text-align: right;
`

const StatisticContainer = styled.div`
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
`

const StatisticWrapper = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StatisticNumber = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    color: #252745;
`

const StatisticLabel = styled.span`
    font-size: 0.875rem;
    color: #7c7c7c;
    font-weight: bold;
`

const Corona = () => {
    const [date, setDate] = useState(null);
    
    const [newCases, setNewCases] = useState(null);
    const [totalDeaths, setTotalDeaths] = useState(null);
    const [totalCases, setTotalCases] = useState(null);
    const [totalRecovered, setTotalRecovered] = useState(null);
    const [activeCases, setActiveCases] = useState(null);
    
    useEffect(() => {
        (async function waitData() {
            const coronaStatsFinland = await getCoronaStatsFromFinland();
            console.log('coronaStatsFingland', coronaStatsFinland);
            setDate(coronaStatsFinland.latest_stat_by_country[0].record_date.slice(0, 16));
            setTotalDeaths(coronaStatsFinland.latest_stat_by_country[0].total_deaths);
            setNewCases(coronaStatsFinland.latest_stat_by_country[0].new_cases);
            setTotalCases(coronaStatsFinland.latest_stat_by_country[0].total_cases);
            setTotalRecovered(coronaStatsFinland.latest_stat_by_country[0].total_recovered);
        
          })();
    }, []);

    return(
        <ContentBlock backgroundColor="#fff">
            <CoronaHeader>
                <MainTitle>Corona in Finland</MainTitle>
                <Date>{date}</Date>
            </CoronaHeader>
            <StatisticContainer>
                <StatisticWrapper>
                    <StatisticNumber>{totalCases}</StatisticNumber>
                    <StatisticLabel>Total cases</StatisticLabel>
                </StatisticWrapper>
                <StatisticWrapper>
                    <StatisticNumber>{newCases}</StatisticNumber>
                    <StatisticLabel>New cases</StatisticLabel>
                </StatisticWrapper>
                <StatisticWrapper>
                    <StatisticNumber>{totalDeaths}</StatisticNumber>
                    <StatisticLabel>Total Deaths</StatisticLabel>
                </StatisticWrapper>
                <StatisticWrapper>
                    <StatisticNumber>{totalRecovered}</StatisticNumber>
                    <StatisticLabel>Total Recovered</StatisticLabel>
                </StatisticWrapper>
            </StatisticContainer>
        </ContentBlock>
    );
}

export default Corona;