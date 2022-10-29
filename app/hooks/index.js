import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const item = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      clearTimeout(item);
    };
  }, [delay, value]);
  return debounce;
};
