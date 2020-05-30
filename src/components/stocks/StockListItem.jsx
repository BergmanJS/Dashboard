import React from 'react';
import styled from 'styled-components';
import ListItem from './../commonComponents/ListItem';
import StockValue from './StockValue';

const StockListItem = (props) => {
    const stockName = props.stockData.companyName;
    const stockValueChangePercent = props.stockData.extendedChangePercent.toFixed(
        2
    );
    const currentPrice = props.stockData.delayedPrice.toFixed(2);
    const positive = stockValueChangePercent > 0;

    const StockName = styled.span`
        margin-right: 1rem;
    `;

    const ValueContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;

        &:nth-child(3) {
            margin-left: 1.3rem;
        }

        @media (min-width: 1650px) {
            &:nth-child(3) {
                margin-left: 2.5rem;
            }
        }
    `;

    const Value = styled(StockValue)`
        font-size: 1rem;
        font-weight: bold;
        color: #252745;
    `;

    const CurrentPriceValue = styled(Value)`
        color: #252745 !important;
    `;

    const Label = styled.span`
        font-size: 0.875rem;
        color: #717498 !important;
        font-weight: bold;
    `;

    return (
        <ListItem>
            <StockName>{stockName}</StockName>
            <ValueContainer>
                <Value positive={positive}>{stockValueChangePercent}%</Value>
                <Label>Change</Label>
            </ValueContainer>
            <ValueContainer>
                <CurrentPriceValue>{currentPrice}</CurrentPriceValue>
                <Label>Current</Label>
            </ValueContainer>
        </ListItem>
    );
};

export default StockListItem;
