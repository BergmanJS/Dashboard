import React from 'react';
import styled, { css } from 'styled-components';
import Hours from './Hours';

const HoursNearbyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: -0.5rem;
`;

const HoursNearby = (props) => {
    
    const HoursGenerator = () => {
        const hoursNearbyArray = [];

        for (var i = 1; i < 6; i++) {
            hoursNearbyArray.push(<Hours key={i} daysData={props.weahterData.list[i]}/>)
        }
        return [...hoursNearbyArray];
    }

    return (
        <HoursNearbyContainer>
            {HoursGenerator()}
        </HoursNearbyContainer>
    )
}

export default HoursNearby;