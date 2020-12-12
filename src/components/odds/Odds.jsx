import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentBlock from './../commonComponents/ContentBlock';
import MainTitle from './../commonComponents/MainTitle';
import ListItem from './../commonComponents/ListItem';
import SecondaryTitle from './../commonComponents/SecondaryTitle';
import NoData from '../commonComponents/NoData';
import moment from 'moment';
import { getPremierLeagueOddsData, getNHLOddsData } from '../../data/fetchData';

const DateContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 0.25rem;
`;

const GameDay = styled.div`
    font-size: 0.875rem;
    opacity: 0.8;
`;

const StartTime = styled(GameDay)`
    margin-left: 0.5rem;
`;
const OddsContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TeamsContainer = styled.div`
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
`;

const Team = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: #252745;

    &::first-child {
        margin-bottom: 0.5rem;
    }
`;

const OddsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OddsSpan = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: bold;
    border: 0.125rem solid #252745;
    border-radius: 0.1875rem;
    color: ${(props) =>
        props.bigOdd > 2.9 ? '#ffffff' : '#252745'} !important;
    height: 2rem;
    width: 3.5rem;
    padding: 1.125rem;
    margin-left: 0.625rem;
    background-color: ${(props) =>
        props.bigOdd > 2.9 ? '#252745' : 'transparent'};
`;

const OddsContainerList = styled.ul`
    padding: 0;
    margin: 0;
    max-height: 25rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Odds = () => {
    const [plOddsList, setPLoddsList] = useState(null);
    const [nhlOddsList, setNHLOddsList] = useState(null);
    const [dataFound, setDataFound] = useState(true);

    const generatePLOddsListItems = (oddsDataArray) => {
        const oddsListItemArray = [];
        console.log(oddsDataArray);

        oddsDataArray.forEach((e) => {
            console.log(e);
            const homeTeam = e.teams[0];
            const awayTeam = e.teams[1];
            const homeOdds = e.sites[0].odds.h2h[0];
            const drawOdds = e.sites[0].odds.h2h[1];
            const awayOdds = e.sites[0].odds.h2h[2];

            const milliseconds = e.commence_time * 1000;
            const day = moment(milliseconds).format('L');
            const time = moment(milliseconds).format('LT');

            oddsListItemArray.push(
                <ListItem display="block" marginBottom="2rem">
                    <DateContainer>
                        <GameDay>{day}</GameDay>
                        <StartTime>{time}</StartTime>
                    </DateContainer>
                    <OddsContent>
                        <TeamsContainer>
                            <Team>{homeTeam}</Team>
                            <Team>{awayTeam}</Team>
                        </TeamsContainer>
                        <OddsContainer>
                            <OddsSpan bigOdd={homeOdds}>{homeOdds}</OddsSpan>
                            <OddsSpan>{drawOdds}</OddsSpan>
                            <OddsSpan bigOdd={awayTeam}>{awayOdds}</OddsSpan>
                        </OddsContainer>
                    </OddsContent>
                </ListItem>
            );
        });
        setPLoddsList(oddsListItemArray);
    };

    const generateNHLOddsListItems = (oddsDataArray) => {
        const oddsListItemArray = [];

        oddsDataArray.forEach((e) => {
            const keyId = e.betOffers[0].id;
            const homeTeam = e.betOffers[0].outcomes[0].participant;
            const awayTeam = e.betOffers[0].outcomes[2].participant;
            const homeOdds = e.betOffers[0].outcomes[0].odds / 1000;
            const drawOdds = e.betOffers[0].outcomes[1].odds / 1000;
            const awayOdds = e.betOffers[0].outcomes[2].odds / 1000;

            oddsListItemArray.push(
                <ListItem key={keyId}>
                    <TeamsContainer>
                        <Team>{homeTeam}</Team>
                        <Team>{awayTeam}</Team>
                    </TeamsContainer>
                    <OddsContainer>
                        <OddsSpan bigOdd={homeOdds}>{homeOdds}</OddsSpan>
                        <OddsSpan>{drawOdds}</OddsSpan>
                        <OddsSpan bigOdd={awayTeam}>{awayOdds}</OddsSpan>
                    </OddsContainer>
                </ListItem>
            );
        });
        setNHLOddsList(oddsListItemArray);
    };

    useEffect(() => {
        (async function waitData() {
            const PLOddsData = await getPremierLeagueOddsData();
            // const NHLOddsData = await getNHLOddsData(); poistettiin myös alemmasta iffistä
            PLOddsData.data.length == 0
                ? setDataFound(false)
                : generatePLOddsListItems(PLOddsData.data);
            //generateNHLOddsListItems(NHLOddsData.events);
        })();
    }, []);

    return (
        <ContentBlock backgroundColor="#ffb129">
            <MainTitle>Odds</MainTitle>
            {dataFound && plOddsList != null ? (
                <div>
                    {/*  <SecondaryTitle>NHL</SecondaryTitle marginBottom={'1.3rem'}>
                    <OddsContainerList>
                        {nhlOddsList}
                        <NoData />
                    </OddsContainerList> */}
                    <SecondaryTitle marginBottom={'1.3rem'}>
                        Premier League
                    </SecondaryTitle>
                    <OddsContainerList>{plOddsList}</OddsContainerList>
                </div>
            ) : (
                <NoData />
            )}
        </ContentBlock>
    );
};

export default Odds;
