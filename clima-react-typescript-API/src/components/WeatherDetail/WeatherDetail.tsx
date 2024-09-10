import { Weather } from '../../hooks/useWeather';

type WeatherDetailsProps = {
    weather: Weather;
};

export default function WeatherDetail({ weather }: WeatherDetailsProps) {
    return <div>Clima de:</div>;
}
