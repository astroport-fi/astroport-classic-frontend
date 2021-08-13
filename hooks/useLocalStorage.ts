import { useCallback, useState } from "react";

type LocalStorage<T> = [T, (value: T | ((val: T) => T)) => void];

export const useLocalStorage = <T>(
  key: string,
  initial?: T
): LocalStorage<T> => {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initial;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return initial;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const next = value instanceof Function ? value(stored) : value;

        setStored(next);
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    [key, stored]
  );

  return [stored, setValue];
};
