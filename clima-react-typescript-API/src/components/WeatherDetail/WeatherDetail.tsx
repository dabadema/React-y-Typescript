import { Weather } from '../../hooks/useWeather';
import { formatTemperature } from '../utils';
import styles from './WeatherDetail.module.css';

type WeatherDetailsProps = {
    weather: Weather;
};

export default function WeatherDetail({ weather }: WeatherDetailsProps) {
    return (
        <div className={styles.container}>
            <div>Clima de: {weather.name}</div>
            <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
            <div className={styles.temperatures}>
                <p>
                    Min: <span> {formatTemperature(weather.main.temp_min)}&deg;C </span>
                </p>
                <p>
                    Min: <span> {formatTemperature(weather.main.temp_max)}&deg;C </span>
                </p>
            </div>
        </div>
    );
}
