import React, { useState, useEffect} from "react";
import ContentBlock from "./../commonComponents/ContentBlock";
import MainTitle from "./../commonComponents/MainTitle";
import Chart from "./Chart";

const Summary = (props) => {
    const currentDayData = props.followedCurrentDayStockData

    return(
        <ContentBlock>
            <MainTitle>Followed stock summary</MainTitle>
            <Chart currentDayData={props.followedCurrentDayStockData} summaryStockData={props.summaryStockData}/>
        </ContentBlock>
    );
}

export default Summary;