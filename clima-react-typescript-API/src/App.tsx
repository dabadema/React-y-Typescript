import styles from './App.module.css';
import Form from './components/Form/Form';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import useWeather from './hooks/useWeather';

function App() {
    const { fetchWeather } = useWeather();

    console.log(import.meta.env);

    return (
        <>
            <h1 className={styles.title}> Buscador de clima</h1>

            <div className={styles.container}>
                <Form fetchWeather={fetchWeather} />
                <p>
                    <WeatherDetail weather={weather} />
                </p>
            </div>
        </>
    );
}

export default App;
