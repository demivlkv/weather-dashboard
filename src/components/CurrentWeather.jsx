import { TbWind, TbDroplet, TbUmbrella } from 'react-icons/tb';

const CurrentWeather = ({ icon, data }) => {
  const { main, wind, pop } = data.list[0];

  return (
    <div className="mb-4 flex justify-center items-center gap-6">
      <img src={icon} className="w-1/3 inline-flex" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-gray-600 text-8xl font-light">{Math.round(main.temp)}&deg;</h2>
        <h6 className="text-xl font-light">
          {Math.round(main.temp_min)}&deg; / {Math.round(main.temp_max)}&deg;
        </h6>
      </div>
      <div className="flex flex-col justify-center">
        <p><TbWind className="w-6 h-6 mr-1 inline-flex items-center" /> {Math.round(wind.speed)} mph</p>
        <p><TbDroplet className="w-6 h-6 mr-1 inline-flex items-center" /> {main.humidity}%</p>
        <p><TbUmbrella className="w-6 h-6 mr-1 inline-flex items-center" /> {pop}%</p>
      </div>
    </div>
  );
};

export default CurrentWeather;