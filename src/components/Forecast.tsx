import moment from 'moment';
import { forecastType } from '../types';
import Degree from './Degree';

type Props = {
  data: forecastType
}

const Forecast = ({ data }: Props): JSX.Element => {
  return (
    <section className="mt-8 flex flex-wrap justify-center items-center">
      {data.daily.map((day, i) => (
        <div key={i} className="mx-6 flex flex-col justify-center items-center flex-shrink-0">
          <img src={`./icons/${day.weather[0].icon}.svg`} alt={day.weather[0].description} />
          <p>
            <Degree temp={Math.round(day.temp.min)} /> / <Degree temp={Math.round(day.temp.max)} />
          </p>
          <h6>{moment((day.dt) * 1000).utcOffset(data.timezone_offset / 60).format('ddd')}</h6>
        </div>
      ))}
    </section>
  );
};

export default Forecast;