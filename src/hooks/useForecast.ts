import { useState, useEffect, ChangeEvent } from 'react';
import { optionType, weatherType, forecastType } from '../types';

const useForecast = () => {
  const [search, setSearch] = useState<string>('');
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [weather, setWeather] = useState<weatherType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(`${process.env.REACT_APP_GEO_URL}q=${value}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setOptions(data))
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value === '') return;

    getSearchOptions(value);
  };

  const getWeather = (city: optionType) => {
    fetch(`${process.env.REACT_APP_WEATHER_URL}lat=${city.lat}&lon=${city.lon}&exclude=exclude=minutely,hourly&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const weatherData = {
          ...data.city,
          list: data.list.slice(0, 4)
        }
        // console.log(data);
        setWeather(weatherData);
      })
      .catch((e) => console.log(e))
  }

  const getForecast = (city: optionType) => {
    fetch(`${process.env.REACT_APP_FORECAST_URL}lat=${city.lat}&lon=${city.lon}&exclude=exclude=minutely,hourly&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const forecastData = {
          ...data.city,
          daily: data.daily.slice(1, 6)
        }
        // console.log(data);
        setForecast(forecastData);
      })
      .catch((e) => console.log(e))
  }

  const handleSubmit = () => {
    if (!city) return;

    getWeather(city);
    getForecast(city);
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setSearch(city.name);
      setOptions([]);
    }
  }, [city])

  return {
    search,
    options,
    weather,
    forecast,
    handleChange,
    onOptionSelect,
    handleSubmit
  }
};

export default useForecast;