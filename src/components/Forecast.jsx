import moment from 'moment';

const Forecast = ({ day }) => {
  let forecast_icon = `${process.env.REACT_APP_ICON_URL + day.weather[0]["icon"]}.svg`;

  return (
    <li className="py-4 flex justify-center items-center bg-gray-200 rounded-lg">
      <div>
        <img src={forecast_icon} className="w-[60px] inline-flex" />
        <h6 className="font-light">
          {Math.round(day.main.temp.min)}&deg; / {Math.round(day.main.temp.max)}&deg;
        </h6>
        <p>{moment((day.dt) * 1000).format('ddd M/D')}</p>
      </div>
    </li>
  );
};

export default Forecast;