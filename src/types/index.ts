export type optionType = {
  name: string
  country: string
  lat: number
  lon: number
}

export type weatherType = {
  name: string
  country: string
  list: [
    {
      dt: number
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
      }
      weather: [
        {
          main: string
          icon: string
          description: string
        }
      ]
      wind: {
        speed: number
        gust: number
        deg: number
      }
      clouds: {
        all: number
      }
      pop: number
      visibility: number
    }
  ]
  sunrise: number
  sunset: number
  timezone: number
}

export type forecastType = {
  daily: [
    {
      dt: number
      humidity: number
      pop: number
      sunrise: number
      sunset: number
      temp: {
        min: number
        max: number
      }
      weather: [
        {
          description: string
          icon: string
        }
      ]
      wind_speed: number
    }
  ]
  timezone_offset: number
}