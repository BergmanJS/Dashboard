import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Followed from './Followed';
import NoData from '../commonComponents/NoData'
import moment from 'moment';
import StockListItem from './StockListItem';
import {
  getVanguardSP500ETFData,
  getDisneyStockData,
  getTeslaStockData,
  getAppleData,
  getMicrosoftData
} from '../../data/fetchData';

 const StocksContainter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
 
  @media (min-width: 1300px) {
    display: flex;
    flex-direction: row !important;
    flex-wrap: wrap;
    overflow-y: auto;
    align-items: flex-start !important;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }

    > div {
      height: auto;
      height: 50%;
      box-shadow: none;
    }
  }
`;

const Stocks = () => {
  const [followedStockListComponents, setFollowedStockListComponents] = useState(null);

  useEffect(() => {
    (async function waitData() {
      const vanguardSP500ETFData = await getVanguardSP500ETFData();
      const teslaStockData = await getTeslaStockData();
      const disneyStockData = await getDisneyStockData();
      const appleData = await getAppleData();
      const microsoftData = await getMicrosoftData();
      const StockDataArray = [vanguardSP500ETFData, teslaStockData, disneyStockData, appleData, microsoftData];
      console.log('StockDataArray', StockDataArray);
      generateStockListItems(StockDataArray);
    })();
  }, []);

    const generateStockListItems = (StockDataArray) => {
        const followedStockListItemComponentsArray = [];
        StockDataArray.forEach(e => {
        followedStockListItemComponentsArray.push(
          <StockListItem key={e.quote.symbol} stockData={e.quote} />
        );
        });
        
        setFollowedStockListComponents(followedStockListItemComponentsArray);
    };

  return (
    <StocksContainter>
      <Followed followedStockListComponents={followedStockListComponents} />
    </StocksContainter>
  );
};

export default Stocks;
