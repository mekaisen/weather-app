import type { ChangeEvent } from 'react';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { useDebounceCallback } from '@/shared/hooks';
import { getWeatherCity } from '@/utils/api/requests/weather/city';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [cities, setCities] = useState<WeatherLocationData[] | null>();
  const [loading, setLoading] = useState(false);

  const debouncedGetWeatherCity = useDebounceCallback(async (city: string) => {
    if (!city.trim()) {
      setCities(null);
      return;
    };

    try {
      setLoading(true);
      const res = await getWeatherCity(city);
      if (!res) return;

      const data = res.data as unknown as WeatherLocationData[];
      setCities(data);
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setCities(null);
      }
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedGetWeatherCity(newValue);
  };

  return (
    <div className='space-y-4 max-w-md mx-auto p-4'>
      <div className='space-y-2'>
        <h2 className='text-lg font-medium'>Поиск города</h2>
        <Input
          className='w-full'
          value={inputValue}
          onChange={handleOnChange}
          placeholder='Введите название города'
        />
      </div>

      <div className='space-y-2'>
        <h3 className='text-sm font-medium text-muted-foreground'>Результаты поиска:</h3>
        {loading ? (
          <div className='flex justify-center items-center p-8 rounded-md border'>
            <div className='h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
          </div>
        ) : cities ? (
          <div className='rounded-md border divide-y'>
            {cities.map((city) => (
              <div
                key={city.id}
                className='p-3 hover:bg-accent transition-colors cursor-pointer flex items-center justify-between'
              >
                <div>
                  <div className='font-medium'>{city.name}</div>
                  <div className='text-sm text-muted-foreground'>{city.region}, {city.country}</div>
                </div>
                <div className='text-xs text-muted-foreground'>
                  {city.lat}, {city.lon}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center p-4 text-muted-foreground rounded-md border'>
            Поищите город
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
