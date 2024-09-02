import axios from 'axios';
import { SearchType } from '../types';

export default function useWeather() {
    const fetchWeather = async (search: SearchType) => {
        const appId = '0697ee5c3ef282b53bea9e73100d039b';

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

            const data = await axios(geoUrl);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        fetchWeather,
    };
}
