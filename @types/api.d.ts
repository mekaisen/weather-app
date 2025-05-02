interface WeatherLocationData {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

interface WeatherApiConfig {
  headers: Record<string, string>;
  method: string;
  url: string;
}

interface WeatherApiResponse {
  config: WeatherApiConfig;
  data: WeatherLocationData[];
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
}
