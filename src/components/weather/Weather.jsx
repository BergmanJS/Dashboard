import React, { useState, useEffect } from 'react';
import ContentBlock from './../commonComponents/ContentBlock';
import MainTitle from './../commonComponents/MainTitle';
import HoursNearby from './HoursNearby';
import moment from 'moment';
import styled from 'styled-components';
import Mountains from '../Mountains';
import { getForecastData, getCurrentWeatherData } from '../../data/fetchData';
import NoData from '../commonComponents/NoData';
import DefaultText from '../commonComponents/DefaultText';

const WeatherToday = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;

  h3 {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: #ffffff;
    margin: 0;

    &:after {
      content: '';
      display: inline-block;
      width: .1rem;
      height: 3rem;
      margin-right: 1.5rem;
      margin-left: 1.5rem;
      background-color: #ffffff;
      opacity: .2
    }
  }
`;

const Icon = styled.img`
    width: 6rem;
    height: 6rem;
    filter: brightness(1.5);
`

const WeatherSecondaryInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const WeatherInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  
  &:first-child {
    margin-right: 1.2rem;
  }
`

const WeatherInfoValue = styled.span`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
`

const isNightMode = (sunsetTime) => {
  const newDate = new Date();
  const sunsetTimeDate = new Date(sunsetTime * 1000);
  const sunsetHour = Number(sunsetTimeDate.getHours())
  const currentHour = Number(newDate.getHours());
  return sunsetHour < currentHour;
}

const Weather = () => {
    const [currentTemp, setCurrentTemp] = useState(null);
    const [currentTempFeelsLike, setCurrentTempFeelsLike] = useState(null);
    const [currentWind, setCurrentWind] = useState(null);
    const [currentIconUrl, setCurrentIconUrl] = useState(null);
    const [weahterData, setWeatherDataList] = useState(null);
    const [dataFound, setDataFound] = useState(true);
    const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    (async function waitData() {
      const forecastData = await getForecastData();
      const currentWeather = await getCurrentWeatherData();

      if (forecastData === null || forecastData.list.length === 0 ) {
        setDataFound(false)
      }
      else {
        const sunsetTime = currentWeather.sys.sunset;
        setCurrentTemp(Math.round(currentWeather.main.temp));
        setCurrentTempFeelsLike(Math.round(currentWeather.main.feels_like));
        setCurrentWind(currentWeather.wind.speed);
        setNightMode(isNightMode(sunsetTime));
        setCurrentIconUrl("http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png");
        setWeatherDataList(forecastData);
      }
    })();
  }, []);

  return (
    <ContentBlock backgroundColor={"#252745"} padding='11rem 2rem 2rem 2rem' >
      <Mountains nightMode={nightMode}/>
      <MainTitle color="#ffffff">Weather</MainTitle>
      { dataFound ? 
        <div>
          <WeatherToday>
            <Icon src={currentIconUrl} alt='icon'/>
            <h3>{currentTemp}&#176;c</h3>
            <WeatherSecondaryInfoContainer>
              <WeatherInfoContainer>
                <WeatherInfoValue>{currentTempFeelsLike}&#176;c</WeatherInfoValue>
                <DefaultText color={'#ffffff'}>Feels like</DefaultText>
              </WeatherInfoContainer>
              <WeatherInfoContainer>
                <WeatherInfoValue>{currentWind}</WeatherInfoValue>
                <DefaultText color={'#ffffff'}>Wind speed</DefaultText>
              </WeatherInfoContainer>
            </WeatherSecondaryInfoContainer>
          </WeatherToday>
          {weahterData === null ? null : <HoursNearby weahterData={weahterData} />}
        </div>
        : 
        <NoData lightTheme/> 
      }
    </ContentBlock>
  );
};

export default Weather;
