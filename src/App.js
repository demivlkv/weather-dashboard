import { useState, useEffect } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { CgSearch } from 'react-icons/cg';

import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [noData, setNoData] = useState('Enter a city');
  const [searchCity, setSearchCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('Tokyo');
  const [description, setDescription] = useState('...');
  const [weatherIcon, setWeatherIcon] = useState(`./assets/icons/compass.svg`);

  const handleSubmit = e => {
    e.preventDefault();
    getWeather(searchCity);
  }

  const getWeather = async (location) => {
    setWeatherData([]);

    let search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&long=${location[1]}`;

    try {
      let res = await fetch(`${process.env.REACT_APP_URL+search}&exclude=minutely,hourly&units=imperial&cnt=6&appid=${apiKey}`)
      let data = await res.json();

      if (data.cod != 200) {
        setNoData('Location not found');
        return;
      }

      setWeatherData(data);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(`./assets/icons/${data.list[0].weather[0]['icon']}.svg`);
      setDescription(`${data.list[0].weather[0].description}`);
    } catch (error) {
      console.log(error);
    }
  }

  const myIP = location => {
    const { latitude, longitude } = location.coords;

    getWeather([latitude, longitude]);
  }

  useEffect(() => {

  })

  return (
    <div className="w-full h-screen flex justify-center align-center my-8">
      <div className="max-w-xl w-full h-full mx-8 p-8 border border-slate-200 rounded-xl shadow-lg">
        <h1>Weather App</h1>

        {/* CITY INPUT */}
        <form onSubmit={handleSubmit} className="">
          <input
            className="py-3 px-2 font-semibold border-b-2 border-gray-200"
            placeholder="Enter city"
            onChange={event => setSearchCity(event.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-slate-600 py-2 px-4 text-gray-200"
            onClick={() => { navigator.geolocation.getCurrentPosition(myIP) }}
          >
            <CgSearch size={24} style={{ color: '#ffffff' }} className="flex items-center" />
          </button>
        </form>

        {/* DISPLAY CURRENT WEATHER */}
        <h2>Right now in <span className="city-text">{city}</span>, it's {description}.</h2>
        {weatherData.length === 0 ? (
          <div>
            <ImSpinner8 className="text-5xl animate-spin" />
          </div>
        ) : (
          <>
            <CurrentWeather icon={weatherIcon} data={weatherData} />
            
            <ul className="grid grid-cols-3 gap-4">
              {weatherData.list.map((days, i) => {
                if (i > 0) {
                  return (<Forecast key={i} day={days} />)
                }
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;