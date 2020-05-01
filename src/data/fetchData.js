import moment from 'moment';
import { apiKeys } from './apiKeys';
const a = moment().subtract(1, 'year');
const yearFromNow = a.format().slice(0, 10);

const getVanguardSP500ETFData = () => {
    return fetch(
        'https://investors-exchange-iex-trading.p.rapidapi.com/stock/voo/book',
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'investors-exchange-iex-trading.p.rapidapi.com',
                'x-rapidapi-key':
                    '31dce9c245msh4487aa95fec7866p166f53jsn233484a52f4f',
            },
        }
    )
        .then((response) =>
            response.json().then((data) => {
                return data;
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

const getDisneyStockData = () => {
    return fetch(
        'https://investors-exchange-iex-trading.p.rapidapi.com/stock/dis/book',
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'investors-exchange-iex-trading.p.rapidapi.com',
                'x-rapidapi-key':
                    '31dce9c245msh4487aa95fec7866p166f53jsn233484a52f4f',
            },
        }
    )
        .then((response) =>
            response.json().then((data) => {
                return data;
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

const getTeslaStockData = () => {
    return fetch(
        'https://investors-exchange-iex-trading.p.rapidapi.com/stock/tsla/book',
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'investors-exchange-iex-trading.p.rapidapi.com',
                'x-rapidapi-key':
                    '31dce9c245msh4487aa95fec7866p166f53jsn233484a52f4f',
            },
        }
    )
        .then((response) =>
            response.json().then((data) => {
                return data;
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

const getMurphyOilData = () => {
    return fetch(
        'https://investors-exchange-iex-trading.p.rapidapi.com/stock/mur/book',
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'investors-exchange-iex-trading.p.rapidapi.com',
                'x-rapidapi-key':
                    '31dce9c245msh4487aa95fec7866p166f53jsn233484a52f4f',
            },
        }
    )
        .then((response) =>
            response.json().then((data) => {
                return data;
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

const getRoyalCaribbeanCruisesData = () => {
    return fetch(
        'https://investors-exchange-iex-trading.p.rapidapi.com/stock/rcl/book',
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'investors-exchange-iex-trading.p.rapidapi.com',
                'x-rapidapi-key':
                    '31dce9c245msh4487aa95fec7866p166f53jsn233484a52f4f',
            },
        }
    )
        .then((response) =>
            response.json().then((data) => {
                return data;
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

const getMicrosoftData = () => {
    return fetch(
        'https://investors-exchange-iex-trading.p.rapidapi.com/stock/msft/book',
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'investors-exchange-iex-trading.p.rapidapi.com',
                'x-rapidapi-key':
                    '31dce9c245msh4487aa95fec7866p166f53jsn233484a52f4f',
            },
        }
    )
        .then((response) =>
            response.json().then((data) => {
                return data;
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

const NoDataFound = () => {
    console.log('no data found');
    return null;
};

const getForecastData = () => {
    return fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=Helsinki&units=metric&appid=' +
            apiKeys.weather
    )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => NoDataFound());
};

const getCurrentWeatherData = () => {
    return fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&appid=' +
            apiKeys.weather
    )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => NoDataFound());
};

const getPremierLeagueOddsData = () => {
    return fetch(
        'https://api.the-odds-api.com/v3/odds/?apiKey=' +
            apiKeys.odds +
            '&sport=soccer_epl&region=uk&mkt=h2h'
    )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => NoDataFound());
};

const getNHLOddsData = () => {
    return fetch(
        'https://eu-offering.kambicdn.org/offering/api/v3/ub/listView/ice_hockey/nhl.json?lang=fi_FI&market='
    )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => NoDataFound());
};

const getNHLData = () => {
    const a = moment().subtract(1, 'day');
    const currentDay = a.format().slice(0, 10);

    return fetch(
        'https://statsapi.web.nhl.com/api/v1/schedule?startDate=' +
            currentDay +
            '&endDate=' +
            currentDay +
            '&hydrate=linescrore.game(content(highlights(scroreboard)))'
    )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => NoDataFound());
};

module.exports = {
    getForecastData,
    getCurrentWeatherData,
    getPremierLeagueOddsData,
    getNHLOddsData,
    getNHLData,
    getTeslaStockData,
    getDisneyStockData,
    getVanguardSP500ETFData,
    getMurphyOilData,
    getRoyalCaribbeanCruisesData,
    getMicrosoftData,
};
