import type { ChangeEvent } from 'react';

import { useDeferredValue, useState } from 'react';

import { Input } from '@/components/ui/input';
import { useDebounceCallback } from '@/shared/hooks';

const Home = () => {
  const [inputValue, setInputValue] = useState('');

  let res = '';
  const debouncedCallback = useDebounceCallback((value: string) => {
    return res = value;
  }, 500);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedCallback(newValue);
  };

  return (
    <div>
      <Input value={inputValue} onChange={handleOnChange} />
      <p>Отложенное значение: {res}</p>
    </div>
  );
};
export default Home;
