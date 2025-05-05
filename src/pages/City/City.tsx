import { useLoaderData } from 'react-router';

const City = () => {
  const data = useLoaderData<WeatherResponse>();
  const { current, forecast, location } = data.data;
  console.log(data);
  const today = forecast.forecastday[0];

  return (
    <div className='container mx-auto px-4 '>
      <div className='bg-card rounded-xl shadow-lg overflow-hidden'>

        <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-4 md:mb-0'>
              <h1 className='text-3xl font-bold'>{location.name}, {location.country}</h1>
              <p className='text-lg'>{current.condition.text}</p>
              <p className='text-sm opacity-90'>Последнее обновление: {current.last_updated}</p>
            </div>
            <div className='flex items-center'>
              <img
                alt={current.condition.text}
                className='w-24 h-24'
                src={`https:${current.condition.icon}`}
              />
              <div className='text-center'>
                <p className='text-5xl font-bold'>{current.temp_c}°C</p>
                <p className='text-lg'>Ощущается как {current.feelslike_c}°C</p>
              </div>
            </div>
          </div>
        </div>

        {/* Детали */}
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h2 className='text-xl font-semibold'>Местное время: {location.localtime}</h2>
              <p className='text-muted-foreground'>Часовой пояс: {location.tz_id}</p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-muted-foreground'>Координаты:</p>
              <p>{location.lat}, {location.lon}</p>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
            <div className='bg-muted/30 p-4 rounded-lg text-center'>
              <p className='text-muted-foreground'>Влажность</p>
              <p className='text-2xl font-semibold'>{current.humidity}%</p>
            </div>
            <div className='bg-muted/30 p-4 rounded-lg text-center'>
              <p className='text-muted-foreground'>Ветер</p>
              <p className='text-2xl font-semibold'>{current.wind_kph} км/ч</p>
              <p className='text-sm'>{current.wind_dir}</p>
            </div>
            <div className='bg-muted/30 p-4 rounded-lg text-center'>
              <p className='text-muted-foreground'>Давление</p>
              <p className='text-2xl font-semibold'>{current.pressure_mb} мб</p>
            </div>
            <div className='bg-muted/30 p-4 rounded-lg text-center'>
              <p className='text-muted-foreground'>Видимость</p>
              <p className='text-2xl font-semibold'>{current.vis_km} км</p>
            </div>
          </div>

          {/* Прогноз по часам */}
          <h2 className='text-2xl font-bold mb-4'>Прогноз по часам</h2>
          <div className='overflow-x-auto pb-4'>
            <div className='flex space-x-4 min-w-max'>
              {today.hour.map((hour) => {
                const hourTime = new Date(hour.time).getHours();
                const isCurrentHour = new Date().getHours() === hourTime;
                return (
                  <div
                    key={hour.time_epoch}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      isCurrentHour ? 'bg-primary/10 ring-1 ring-primary' : 'bg-muted/20'
                    }`}
                  >
                    <p className='text-sm font-medium'>{hourTime}:00</p>
                    <img
                      alt={hour.condition.text}
                      className='w-10 h-10 my-2'
                      src={`https:${hour.condition.icon}`}
                    />
                    <p className='font-semibold'>{hour.temp_c}°C</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
            <div className='bg-muted/20 p-5 rounded-lg'>
              <h3 className='text-xl font-bold mb-3'>Восход и закат</h3>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  <svg className='h-8 w-8 text-yellow-500 mr-2' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <circle cx='12' cy='12' r='5' />
                    <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
                  </svg>
                  <div>
                    <p className='text-muted-foreground'>Восход</p>
                    <p className='font-semibold'>{today.astro.sunrise}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <svg className='h-8 w-8 text-indigo-500 mr-2' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <path d='M17 18a5 5 0 0 0-10 0' />
                    <line x1='12' x2='12' y1='9' y2='2' />
                    <line x1='4.22' x2='5.64' y1='10.22' y2='11.64' />
                    <line x1='1' x2='3' y1='18' y2='18' />
                    <line x1='21' x2='23' y1='18' y2='18' />
                    <line x1='18.36' x2='19.78' y1='11.64' y2='10.22' />
                    <line x1='23' x2='1' y1='22' y2='22' />
                    <polyline points='8 6 12 2 16 6' />
                  </svg>
                  <div>
                    <p className='text-muted-foreground'>Закат</p>
                    <p className='font-semibold'>{today.astro.sunset}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-muted/20 p-5 rounded-lg'>
              <h3 className='text-xl font-bold mb-3'>Статистика дня</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground'>Макс. температура</p>
                  <p className='text-xl font-semibold'>{today.day.maxtemp_c}°C</p>
                </div>
                <div>
                  <p className='text-muted-foreground'>Мин. температура</p>
                  <p className='text-xl font-semibold'>{today.day.mintemp_c}°C</p>
                </div>
                <div>
                  <p className='text-muted-foreground'>Вероятность осадков</p>
                  <p className='text-xl font-semibold'>{today.day.daily_chance_of_rain}%</p>
                </div>
                <div>
                  <p className='text-muted-foreground'>УФ-индекс</p>
                  <p className='text-xl font-semibold'>{today.day.uv}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
