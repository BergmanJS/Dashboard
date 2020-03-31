import React from "react";
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import LeftContentContainer from './LeftContentContainer';
import RightContentContainer from './RightContentContainer';
import Weather from './components/weather/Weather';
import Goals from './components/goals/Goals';
import Stocks from './components/stocks/Stocks';
import SportResults from './components/sportResults/SportResults';
import Odds from './components/odds/Odds';
import FavoriteLinks from './components/FavoriteLinks/FavoriteLinks';
import Corona from './components/Corona';

const GlobalStyle = createGlobalStyle`
  
  body {
    font-family: "Quicksand", sans-serif;
    margin: 0;
    padding: 0;

    * {
      box-sizing: border-box;
    }
  }
`

const AppContainer = styled.div`
  padding: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 1300px) {
    display: grid;
    grid-template-columns: 27rem auto 30rem;
    grid-template-rows: 100vh;
    padding: 0
  }
`;

const App = () => {
  return (
      <AppContainer>
        <GlobalStyle />
        <LeftContentContainer>
          <Weather />
          <Goals />
        </LeftContentContainer>
        <Stocks />
        <RightContentContainer>
          <FavoriteLinks />
          {/* <Corona /> */}
          <Odds />
          <SportResults />
        </RightContentContainer>
      </AppContainer>
   
  );
};

export default App;
