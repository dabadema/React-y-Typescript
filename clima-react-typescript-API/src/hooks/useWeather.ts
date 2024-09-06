import axios from 'axios';
import { SearchType, Weather } from '../types';

// Type Guard or Assertion
function isWeatherResponse(weather: unknown) {
    return (
        Boolean(weather) &&
        typeof weather === 'object' &&
        typeof (weather as Weather).name === 'string' &&
        typeof (weather as Weather).main.temp === 'number' &&
        typeof (weather as Weather).main.temp_max === 'number' &&
        typeof (weather as Weather).main.temp_min === 'number'
    );
}

export default function useWeather() {
    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY;

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

            const { data } = await axios(geoUrl);

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

            //Castear el type from index.ts file
            // const { data: weatherResult } = await axios<Weather>(weatherUrl);
            // console.log(weatherResult.main.temp);
            // console.log(weatherResult.name);

            //Type Guards or Assertion
            const { data: weatherResult } = await axios<Weather>(weatherUrl);
            const result = isWeatherResponse(weatherResult);
            if (result) {
                console.log(weatherResult.main);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        fetchWeather,
    };
}
