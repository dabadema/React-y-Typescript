import { Weather } from '../../hooks/useWeather';
import { formatTemperature } from '../utils';

type WeatherDetailsProps = {
    weather: Weather;
};

export default function WeatherDetail({ weather }: WeatherDetailsProps) {
    return (
        <>
            <div>Clima de: {weather.name}</div>
            <p>{formatTemperature(weather.main.temp)}&deg;C</p>
            <div>
                <p>
                    Min: <span> {formatTemperature(weather.main.temp_min)}&deg;C </span>
                </p>
                <p>
                    Min: <span> {formatTemperature(weather.main.temp_max)}&deg;C </span>
                </p>
            </div>
        </>
    );
}
