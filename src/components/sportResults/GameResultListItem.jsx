import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import ListItem from "./../commonComponents/ListItem";

const GameResultListItem = (props) => {
    const homeTeam = props.gameData.teams.home.team.name;
    const homeTeamScore = props.gameData.teams.home.score;
    const awayTeam = props.gameData.teams.away.team.name;
    const awayTeamScore = props.gameData.teams.away.score;

    const Score = styled.span`
        max-width: 3rem;
    `

    return (
        <ListItem>
             <span>{homeTeam}</span>
            <Score>{homeTeamScore} : {awayTeamScore}</Score>
            <span>{awayTeam}</span>
        </ListItem>
    )
}

export default GameResultListItem;