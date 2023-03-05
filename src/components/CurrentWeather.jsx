const CurrentWeather = ({ icon, data }) => {
  const { clouds, main, weather } = data.list[0];

  return (
    <div className="mb-8 flex justify-center items-center">
      {weather[0].main}
      <img src={icon} className="w-1/4 inline-flex" />
      <h2 className="font-5xl font-light">{Math.round(main.temp)}&deg;</h2>
      <h6 className="font-light">
        {Math.round(main.temp.min)}&deg; / {Math.round(main.temp.max)}&deg;
      </h6>
      <div>
        <p>Wind: {main.speed} mph</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Rain: {main.pop}%</p>
      </div>
    </div>
  );
};

export default CurrentWeather;