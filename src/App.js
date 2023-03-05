import { useState, useEffect } from 'react';
import axios from 'axios';
import { ImSpinner8 } from 'react-icons/im';
import { CgSearch } from 'react-icons/cg';

import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [noData, setNoData] = useState('Enter a city');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('Tokyo');
  const [description, setDescription] = useState('sunny');
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}.svg`);

  // if (noData) {
  //   return (
  //     <div>
  //       <div>
  //         <ImSpinner8 className="text-5xl animate-spin" />
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="w-full h-screen flex justify-center align-center my-8">
      <div className="max-w-xl w-full h-full mx-8 p-8 border border-slate-200 rounded-xl shadow-lg">
        <h1>Weather App</h1>

        {/* CITY INPUT */}
        <form onSubmit={handleSubmit} className="">
          <input
            className="py-3 px-2 font-semibold border-b-2 border-gray-200"
            placeholder="Enter city"
            onChange={handleChange}
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
        <CurrentWeather icon={weatherIcon} data={weatherData} />

        {/* DISPLAY FORECAST */}
        <ul className="grid grid-cols-3 gap-4">
          {weatherData.list.map((days, i) => {
            if (i > 0) {
              return (<Forecast key={i} day={days} />)
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;