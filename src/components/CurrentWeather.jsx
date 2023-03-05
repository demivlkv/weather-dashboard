const CurrentWeather = ({ icon, data }) => {
  const { main, wind, pop } = data.list[0];

  return (
    <div className="mb-8 flex flex-row justify-center items-center">
      <img src={icon} className="w-1/3 inline-flex" />
      <h2 className="text-5xl font-light">{Math.round(main.temp)}&deg;</h2>
      <h6 className="font-light">
        {Math.round(main.temp_min)}&deg; / {Math.round(main.temp_max)}&deg;
      </h6>
      <div>
        <p>Wind: {wind.speed} mph</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Rain: {pop}%</p>
      </div>
    </div>
  );
};

export default CurrentWeather;