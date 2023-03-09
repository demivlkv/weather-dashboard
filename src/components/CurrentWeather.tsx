import moment from 'moment';

import Tile from './Tile';
import Degree from './Degree';
import { weatherType } from '../types';
import { getWindDirection, getHumidityValue, getPop } from '../helpers';
import Sunrise from './Icons/Sunrise';
import Sunset from './Icons/Sunset';
import Currently from './Icons/Currently';

type Props = {
  data: weatherType
}

const CurrentWeather = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <>
      <h1 className="text-lg md:text-2xl">Right now in <span className="py-2 px-3 text-gray-700 font-bold border-b-4 border-slate-300">{data.name}, {data.country}</span>, it's {today.weather[0].description}.</h1>
      <section className="my-8 md:my-4 flex flex-wrap justify-center items-center">
        <img src={`./icons/${today.weather[0].icon}.svg`} alt={today.weather[0].description} className="w-1/2 md:w-1/3" />
        <div className="mb-8 md:mb-0 mx-12 flex flex-col justify-center items-center">
          <h2 className="mb-2 text-gray-700 text-8xl font-normal"><Degree temp={Math.round(today.main.temp)} /></h2>
          <h6 className="text-2xl font-medium tracking-wide">
            <Degree temp={Math.round(today.main.temp_min)} />
            {' '}/{' '}
            <Degree temp={Math.round(today.main.temp_max)} />
          </h6>
        </div>
        <div className="w-auto ml-4 flex flex-col text-zinc-400 justify-center leading-loose">
          <p className="w-full mb-3 inline-flex items-center gap-3 text-base">
            <Currently />
            {moment(today.dt * 1000).utcOffset(data.timezone / 60).format('ddd, LL HH:mm')}
          </p>
          <p className="w-full mb-3 inline-flex items-center gap-3">
            <Sunrise />
            <h6>Sunrise</h6>
            {moment(data.sunrise * 1000).utcOffset(data.timezone / 60).format('HH:mm')}
          </p>
          <p className="w-full inline-flex items-center gap-3">
            <Sunset />
            <h6>Sunset</h6>
            {moment(data.sunset * 1000).utcOffset(data.timezone / 60).format('HH:mm')}
          </p>
        </div>
      </section>

      <section className="mt-8 md:mt-0 w-full flex flex-wrap justify-evenly items-center gap-6">
        {/* WINDS */}

        <Tile
          icon="wind"
          title="Wind"
          info={`${Math.round(today.wind.speed)}`}
          unit={`mph`}
          description={`${getWindDirection(Math.round(today.wind.deg))} / gusts: ${today.wind.gust.toFixed(1)} mph`}
        />

        {/* FEELS LIKE */}

        <Tile
          icon="feels"
          title="Feels Like"
          info={<Degree temp={Math.round(today.main.feels_like)} />}
          unit={``}
          description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp) ? 'colder' : 'warmer'}`}
        />

        {/* HUMIDITY */}

        <Tile
          icon="humidity"
          title="Humidity"
          info={`${today.main.humidity}`}
          unit={`%`}
          description={getHumidityValue(today.main.humidity)}
        />

        {/* PERCIPITATION */}

        <Tile
          icon="pop"
          title="Precipitation"
          info={`${Math.round(today.pop * 100)}`}
          unit={`%`}
          description={`${getPop(today.pop)}; clouds at ${today.clouds.all}%`}
        />

      </section>
    </>
  )
};

export default CurrentWeather;