import React, { useState, useEffect } from "react";
import ListItem from "./../commonComponents/ListItem";
import StockValue from "./StockValue";

const StockListItem = props => {
  const stockValue = props.stockData.change_pct;
  const stockName = props.stockData.name;
  const positive = stockValue > 0;

  return (
    <ListItem>
      <span>{stockName}</span>
      <StockValue positive={positive}>{stockValue} %</StockValue>
    </ListItem>
  );
};

export default StockListItem;
