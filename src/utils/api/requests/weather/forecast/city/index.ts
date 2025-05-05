import { api } from '@/utils/api/instance';

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherForecastCity = (city: string, days: string) => (
  api.get<WeatherResponse>(`forecast.json?key=${VITE_WEATHER_API_KEY}&q=${city}&days=${days}`)
);
