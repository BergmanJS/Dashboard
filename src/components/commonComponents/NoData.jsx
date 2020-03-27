import React, { useEffect, useState } from 'react';
import styled,  { keyframes } from 'styled-components';
import { showAnimation } from './Animations';
import SecondaryTitle from "./../commonComponents/SecondaryTitle";
import NoDataImageSrc from '../../images/noData.png';

const NoDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 12rem;
`

const NoDataText = styled(SecondaryTitle)`
    color: ${props => props.isLightTheme ? '#ffffff' : '#252745' };
    animation: ${showAnimation} .4s forwards;
`

const NoDataImage = styled.img`
    height: 10rem;
`

const NoData = (props) => {
    const [isLightTheme] = useState(props.lightTheme);
    
    return(
        <NoDataContainer>
            {/* <NoDataImage src={NoDataImageSrc}></NoDataImage> */}
            <NoDataText isLightTheme={isLightTheme}>Data not found..</NoDataText>
        </NoDataContainer>
    );
}

export default NoData;