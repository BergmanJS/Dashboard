import React from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import LeftContentContainer from './components/LeftContentContainer';
import CenterContentContainer from './components/CenterContentContainer';
import RightContentContainer from './components/RightContentContainer';
import Weather from './components/weather/Weather';
import Goals from './components/goals/Goals';
import Workout from './components/workout/Workout';
import Stocks from './components/stocks/Stocks';
import SportResults from './components/sportResults/SportResults';
import Odds from './components/odds/Odds';
import FavoriteLinks from './components/FavoriteLinks/FavoriteLinks';
import firebase from 'firebase/app';
import database from 'firebase/database';

var firebaseConfig = {
    apiKey: 'AIzaSyCU2YdiVqlKb3DbAJKD3T3iazZ0kHgIyy8',
    authDomain: 'dashboard-6ffdd.firebaseapp.com',
    databaseURL: 'https://dashboard-6ffdd.firebaseio.com',
    projectId: 'dashboard-6ffdd',
    storageBucket: 'dashboard-6ffdd.appspot.com',
    messagingSenderId: '125883349213',
    appId: '1:125883349213:web:b07b2062a0f96d2b2d4334',
    measurementId: 'G-32788WE9Q0',
};

firebase.initializeApp(firebaseConfig);

const GlobalStyle = createGlobalStyle`
  
  body {
    font-family: "Quicksand", sans-serif;
    margin: 0;
    padding: 0;

    * {
      box-sizing: border-box;
    }

    #id-329-title{
      display: none;
    }
  }
`;

const AppContainer = styled.div`
    padding: 1rem;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (min-width: 1300px) {
        display: grid;
        grid-template-columns: 27rem auto 32rem;
        grid-template-rows: 100vh;
        padding: 0;
    }
`;

const App = () => {
    return (
        <AppContainer>
            <GlobalStyle />
            <LeftContentContainer>
                <Weather />
                <Goals firebaseConfig={firebaseConfig} />
            </LeftContentContainer>
            <CenterContentContainer>
                <Workout />
                <Stocks />
            </CenterContentContainer>
            <RightContentContainer>
                <FavoriteLinks />
                <Odds />
                {/* <SportResults /> */}
            </RightContentContainer>
        </AppContainer>
    );
};

export default App;
