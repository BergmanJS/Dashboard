import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Summary from './Summary';
import Followed from './Followed';
import Popular from './Popular';
import NoData from '../commonComponents/NoData'
import moment from 'moment';
import StockListItem from './StockListItem';
import {
  getFollowedCurrentDayStockData,
  getPopularCurrentDayStockData,
  getDisneyHistoryData,
  getTeslaHistoryData,
  getZalandoHistoryData
} from '../../data/fetchData';

const StocksContainter = styled.div`
  @media (min-width: 1300px) {
    display: flex;
    flex-direction: row !important;
    flex-wrap: wrap;
    overflow-y: auto;
    align-items: flex-start !important;
    padding: 0 2rem;

    &::-webkit-scrollbar {
      display: none;
    }

    > div {
      border-radius: 0;
      border-top-right-radius: 2rem;
      margin-bottom: 0;
      box-shadow: none;
      height: auto;
      width: 50%;
      height: 50%;

      &:last-child {
        border-top-right-radius: 0rem;
      }
    }

    div {
      &:first-child {
        flex-basis: 100%;
      }
    }
  }
`;

const Stocks = () => {
  const [followedStockListComponents, setFollowedStockListComponents] = useState(null);
  const [popularStockListComponents, setPopularStockListComponents] = useState(null);
  const [summaryStockData, setSummaryStockData] = useState(null);
  const [followedCurrentDayStockDataState, setFollowedCurrentDayStockDataState] = useState(null);

  useEffect(() => {
    (async function waitData() {
      const followedCurrentDayStockData = await getFollowedCurrentDayStockData();
      const popularCurrentDayStockData = await getPopularCurrentDayStockData();
      generateStockListItems(followedCurrentDayStockData.data,popularCurrentDayStockData.data);
      setFollowedCurrentDayStockDataState(followedCurrentDayStockData);

      const historyDataTesla = await getTeslaHistoryData();
      console.log(historyDataTesla);
      const historyDataDisney = await getDisneyHistoryData();
      const historyDataZalando = await getZalandoHistoryData(); 

      const summaryStockDataArray = [
        historyDataDisney.history,
        historyDataTesla.history,
        historyDataZalando.history
      ]
      setSummaryStockData(summaryStockDataArray.includes('undefined') ? 'no data' : summaryStockData);
    })();
  }, []);

    const generateStockListItems = (followedStockDataArray,popularCurrentDayStockDataArray) => {
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
      {summaryStockData === null || summaryStockData === 'no data found' ? <NoData /> : 
        <Summary followedCurrentDayStockData={followedCurrentDayStockDataState} summaryStockData={summaryStockData} />}
      <Followed followedStockListComponents={followedStockListComponents} />
      <Popular popularStockListComponents={popularStockListComponents} />
    </StocksContainter>
  );
};

export default Stocks;
