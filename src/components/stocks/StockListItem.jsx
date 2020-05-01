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

    const ValueContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        &:nth-child(3) {
            margin-left: 2.5rem;
        }
    `;

    const Value = styled(StockValue)`
        font-size: 1.2rem;
        font-weight: bold;
        color: #252745;
    `;

    const Label = styled.span`
        font-size: 0.875rem;
        color: #7c7c7c;
        font-weight: bold;
        opacity: 0.7;

        @media (min-width: 1440px) {
            font-size: 1rem;
        }
    `;

    return (
        <ListItem>
            <span>{stockName}</span>
            <ValueContainer>
                <Value positive={positive}>{stockValueChangePercent}</Value>
                <Label>Change</Label>
            </ValueContainer>
            <ValueContainer>
                <Value positive={positive}>{currentPrice}</Value>
                <Label>Current</Label>
            </ValueContainer>
        </ListItem>
    );
};

export default StockListItem;
