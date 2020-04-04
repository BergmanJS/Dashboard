import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentBlock from "./../commonComponents/ContentBlock";
import MainTitle from "./../commonComponents/MainTitle";
import Button from "./../commonComponents/Button";
import Label from './../commonComponents/Label';
import Modal from './../commonComponents/Modal';

const TrainingContainter = styled(ContentBlock)`

  @media (min-width: 1300px) {
    height: 100%;
    box-shadow: none;
    }
  }
`; 

const Training = () => {
    const [trainingData, setTrainingData] = useState(null);

    useEffect(() =>{
        
    },[])

    return(
        <TrainingContainter>
            <MainTitle>Training</MainTitle>
           {/*  <Chart currentDayData={currentDayData} summaryStockData={props.summaryStockData}/> */}
        </TrainingContainter>
    );
}

export default Training;