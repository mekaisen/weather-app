import { api } from '@/utils/api/instance';

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherCity = (city: string) => (
  api.get<WeatherApiResponse>(`search.json?key=${VITE_WEATHER_API_KEY}&q=${city}`)
);

export { getWeatherCity };
