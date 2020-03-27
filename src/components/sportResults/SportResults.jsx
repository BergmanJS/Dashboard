import React, { useState, useEffect } from "react";
import moment from 'moment';
import ContentBlock from "./../commonComponents/ContentBlock";
import MainTitle from "./../commonComponents/MainTitle";
import Ul from "./../commonComponents/Ul";
import GameResultListItem from './GameResultListItem';
import { getNHLData } from '../../data/fetchData';

const SportResults = () => {

    const [gameResultList, setGameResultList] = useState(null);

    useEffect(() => {
        (async function waitData() {
          const nhlData = await getNHLData();
          generateGameResultListItems(nhlData);
        })();
      }, []);

      const generateGameResultListItems = (nhlData) => {
        const gameResultListItemArray = [];
        const gamesDataArray = nhlData.dates[0].games;

        gamesDataArray.forEach(e => {
            gameResultListItemArray.push(<GameResultListItem key={e.gamePk} gameData={e}/>);
        });

        setGameResultList(gameResultListItemArray);
    }

    return (
        <ContentBlock>
            <MainTitle>NHL Results</MainTitle>
            <Ul>
                {gameResultList}
            </Ul>
        </ContentBlock>
    )
}

export default SportResults;