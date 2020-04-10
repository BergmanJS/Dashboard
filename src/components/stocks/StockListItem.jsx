import React from "react";
import ListItem from "./../commonComponents/ListItem";
import StockValue from "./StockValue";

const StockListItem = props => {
  const stockName = props.stockData.companyName;
  const latestPrice = props.stockData.delayedPrice;
  const stockValue = props.stockData.extendedChangePercent.toFixed(2);
  const positive = stockValue > 0;

  return (
    <ListItem>
      <span>{stockName}</span>
      <StockValue positive={positive}>{stockValue} %</StockValue>
    </ListItem>
  );
};

export default StockListItem;
