import moment from 'moment';

const Forecast = ({ day }) => {
  let forecastIcon = `./assets/icons/${day.weather[0]['icon']}.svg`;

  return (
    <li className="w-[120px] py-4 flex justify-center items-center bg-gray-50 rounded-lg">
      <div>
        <img src={forecastIcon} className="w-[60px] inline-flex" />
        <h6 className="font-light">
          {Math.round(day.main.temp_min)}&deg; / {Math.round(day.main.temp_max)}&deg;
        </h6>
        <p>{moment((day.dt_txt)).format('ddd M/D')}</p>
      </div>
    </li>
  );
};

export default Forecast;