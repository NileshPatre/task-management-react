import { useState, useEffect } from "react";
type DebouncedValue<T> = T | undefined;
type UseDebounceFunction<T> = (value: T, delay: number) => DebouncedValue<T>;
const useDebounce: UseDebounceFunction<any> = (value, delay) => {
  const [debouncedValue, setDebouncedValue] =
    useState<DebouncedValue<any>>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
