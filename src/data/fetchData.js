import moment from 'moment';
import { apiKeys } from './apiKeys';
const a = moment().subtract(1, 'year');
const yearFromNow = a.format().slice(0, 10);

const getCoronaStatsFromFinland = () => {
  return fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=finland", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "31dce9c245msh4487aa95fec7866p166f53jsn233484a52f4f"
	}
})
.then(response => response.json().then(data => {
  return data;
}))
.catch(err => {
  console.log(err);
});
}

const NoDataFound = () => {
  console.log('test return null')
  return null;
}

const getFollowedCurrentDayStockData = () => {
    return fetch(
        "https://api.worldtradingdata.com/api/v1/stock?symbol=TSLA,DIS,ZAL.DE&api_token=" + apiKeys.stocks
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  } 


  const getPopularCurrentDayStockData = () => {
    return fetch(
        "https://api.worldtradingdata.com/api/v1/stock?symbol=KC4.F,AAPL,MSFT,NOK,W9C.F&api_token=" + apiKeys.stocks
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  } 

  const getDisneyHistoryData = () => {
    
    return fetch(
        "https://api.worldtradingdata.com/api/v1/history?symbol=DIS&date_from=" + yearFromNow + "&api_token=" + apiKeys.stocks
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  } 

  const getTeslaHistoryData = () => {
    
    return fetch(
        "https://api.worldtradingdata.com/api/v1/history?symbol=TSLA&date_from=" + yearFromNow + "&api_token=" + apiKeys.stocks
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  }

  const getZalandoHistoryData = () => {
    
    return fetch(
        "https://api.worldtradingdata.com/api/v1/history?symbol=ZAL.DE&date_from=" + yearFromNow + "&api_token=" + apiKeys.stocks
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  }

  const getForecastData = () => {
    return fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Helsinki&units=metric&appid=" + apiKeys.weather
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  } 

  const getCurrentWeatherData = () => {
    return fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&appid=" + apiKeys.weather
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  } 

  const getPremierLeagueOddsData = () => {
    return fetch(
        "https://api.the-odds-api.com/v3/odds/?apiKey=" + apiKeys.odds + "&sport=soccer_epl&region=uk&mkt=h2h"
    )
    .then(response => response.json())
    .then(data => data)
    .catch(err => NoDataFound());
  }

  const getNHLOddsData = () => {
    return fetch(
        "https://eu-offering.kambicdn.org/offering/api/v3/ub/listView/ice_hockey/nhl.json?lang=fi_FI&market="
    )
    .then(response => response.json())
    .then(data => data)
    .catch(err => NoDataFound());
  }

  const getNHLData = () => {
    const a = moment().subtract(1, 'day');
    const currentDay = a.format().slice(0, 10);

    return fetch(
        "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" + currentDay + "&endDate=" + currentDay + "&hydrate=linescrore.game(content(highlights(scroreboard)))"
    )
      .then(response => response.json())
      .then(data => data)
      .catch(err => NoDataFound());
  }

  module.exports = {
    getCoronaStatsFromFinland,
    getPopularCurrentDayStockData,
    getFollowedCurrentDayStockData,
    getDisneyHistoryData,
    getTeslaHistoryData,
    getZalandoHistoryData,
    getForecastData,
    getCurrentWeatherData,
    getPremierLeagueOddsData,
    getNHLOddsData,
    getNHLData
 }
    

