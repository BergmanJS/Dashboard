import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HourContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.2rem;

    h3 {
        color: #ffffff;
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    span {
        margin-bottom: 0.5rem;
        color: #d3d3d3;
        font-size: 0.875rem;
    }
`
const Icon = styled.img`
    width: 3.5rem;
    height: 3.5rem;
    filter: brightness(1.5);
`

const Hour = (props) => {
    
    const [iconUrl, setIconUrl] = useState('');
    const [data, setTemp] = useState('');
    const [timeTaken, setTimeTaken] = useState('');
    const weatherIcon = props.daysData.weather[0].icon;
    const temp = Math.round(props.daysData.main.temp);
    const time = props.daysData.dt_txt.slice(11, 16);

    useEffect(() => {
        setTemp(temp);
        setTimeTaken(time);
        setIconUrl("http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
    }, []);

    return (
        <HourContainer>
            <Icon src={iconUrl} alt='icon'/>
            <h3>{data}&#176;c</h3>
            <span>{timeTaken}</span>
        </HourContainer>
    )
}

export default Hour;