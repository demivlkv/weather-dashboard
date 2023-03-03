import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImSpinner8 } from 'react-icons/im';

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [noData, setNoData] = useState('Enter a city');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('Tokyo');
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}`);

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
        <form onSubmit={handleSubmit} className="">
          <input
            className="py-3 px-2"
            placeholder="Enter city"
            onChange={handleChange}
            required
          />
        </form>
      </div>
    </div>
  );
}

export default App;