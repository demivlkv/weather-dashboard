import useForecast from './hooks/useForecast';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Search from './components/Search';
import CompassImg from './components/Icons/compass.svg';

const App = (): JSX.Element => {
  const { search, options, weather, forecast, handleChange, onOptionSelect, handleSubmit } = useForecast();

  return (
    <main className="w-full h-full md:h-screen flex flex-col justify-center items-center bg-gradient-to-br from-teal-200 via-cyan-200 to-gray-200">
      <Search
        search={search}
        options={options}
        handleChange={handleChange}
        onOptionSelect={onOptionSelect}
        handleSubmit={handleSubmit}
      />
      {weather && forecast ? (
        <section className="max-w-5xl w-full h-auto mx-8 py-10 px-8 flex flex-col justify-center items-center bg-white/90 rounded shadow-lg text-gray-500">
          <CurrentWeather data={weather} />
          <Forecast data={forecast} />
        </section>
      ) : (
        <img src={CompassImg} alt="search" className="w-28 bg-white/90 rounded-full" />
      )}
    </main>
  );
};

export default App;