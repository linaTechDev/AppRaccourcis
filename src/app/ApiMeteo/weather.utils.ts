const weatherIconMap: {[key: string]: string} = {
  0: "☀️",  // Clear sky
  1: "🌤️",  // Mainly clear
  2: "⛅",   // Partly cloudy
  3: "☁️",   // Overcast
  45: "🌫️",  // Fog
  48: "🌫️",  // Rime fog
  51: "🌧️",  // Drizzle (Light)
  53: "🌧️",  // Drizzle (Moderate)
  55: "🌧️",  // Drizzle (Dense)
  56: "🌧️",  // Freezing drizzle (Light)
  57: "🌧️",  // Freezing drizzle (Dense)
  61: "🌦️",  // Rain (Light)
  63: "🌧️",  // Rain (Moderate)
  65: "🌧️",  // Rain (Heavy)
  66: "🌨️",  // Freezing rain (Light)
  67: "🌨️",  // Freezing rain (Heavy)
  71: "❄️",   // Snowfall (Light)
  73: "❄️",   // Snowfall (Moderate)
  75: "❄️",   // Snowfall (Heavy)
  77: "❄️",   // Snow grains
  80: "🌧️",  // Rain showers (Light)
  81: "🌧️",  // Rain showers (Moderate)
  82: "🌧️",  // Rain showers (Violent)
  85: "❄️",   // Snow showers (Light)
  86: "❄️",   // Snow showers (Heavy)
  95: "🌩️",  // Thunderstorm (Slight or Moderate)
  96: "🌩️",  // Thunderstorm with hail (Slight)
  99: "🌩️",  // Thunderstorm with hail (Heavy)
};

export function getWeatherIcon(weatherCode: number): string {
  return weatherIconMap[weatherCode] || "🌥️";
}
