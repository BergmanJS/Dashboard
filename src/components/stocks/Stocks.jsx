import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Followed from './Followed';
import Popular from './Popular';
import NoData from '../commonComponents/NoData'
import moment from 'moment';
import StockListItem from './StockListItem';
import {
  getFollowedCurrentDayStockData,
  getPopularCurrentDayStockData
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
      width: 50%;
      height: 50%;
      box-shadow: none;
    }
  }
`;

const Stocks = () => {
  const [followedStockListComponents, setFollowedStockListComponents] = useState(null);
  const [popularStockListComponents, setPopularStockListComponents] = useState(null);

  useEffect(() => {
    (async function waitData() {
      const followedCurrentDayStockData = await getFollowedCurrentDayStockData();
      const popularCurrentDayStockData = await getPopularCurrentDayStockData();

      generateStockListItems(followedCurrentDayStockData.data,popularCurrentDayStockData.data);
      setFollowedCurrentDayStockDataState(followedCurrentDayStockData);
    })();
  }, []);

    const generateStockListItems = (followedStockDataArray, popularCurrentDayStockDataArray) => {
        const stockListItemComponentsArray = [];
        const popularStockListItemComponentsArray = [];

        followedStockDataArray.forEach(e => {
        stockListItemComponentsArray.push(
            <StockListItem key={e.symbol} stockData={e} />
        );
        });
        setFollowedStockListComponents(stockListItemComponentsArray);

        popularCurrentDayStockDataArray.forEach(e => {
        popularStockListItemComponentsArray.push(
            <StockListItem key={e.symbol} stockData={e} />
        );
        });
        setPopularStockListComponents(popularStockListItemComponentsArray);
    };

  return (
    <StocksContainter>
      <Followed followedStockListComponents={followedStockListComponents} />
      <Popular popularStockListComponents={popularStockListComponents} />
    </StocksContainter>
  );
};

export default Stocks;
