export class WeatherData {
  current: {
    temperature2m: number;
    apparentTemperature: number;
    weatherCode: number;
    cloudCover: number;
  };

  daily: {
    time: Date[];
    weatherCode: number[];
    temperature2mMax: number[];
    temperature2mMin: number[];
    apparentTemperatureMax: number[];
    apparentTemperatureMin: number[];
    precipitationProbabilityMax: number[];
  };

  constructor(response: any) {
    const current = response.current;

    this.current = {
      temperature2m: current.temperature_2m,
      apparentTemperature: current.apparent_temperature,
      weatherCode: current.weather_code,
      cloudCover: current.cloud_cover,
    };

    const daily = response.daily;
    this.daily = {
      time: daily.time,
      weatherCode: daily.weather_code,
      temperature2mMax: daily.temperature_2m_max,
      temperature2mMin: daily.temperature_2m_min,
      apparentTemperatureMax: daily.apparent_temperature_max,
      apparentTemperatureMin: daily.apparent_temperature_min,
      precipitationProbabilityMax: daily.precipitation_probability_max
    }
  }
}
