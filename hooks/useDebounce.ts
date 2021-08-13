import { useCallback, useState } from "react";

export const useDebounce = <T extends (...args: any) => any>(
  fun: T,
  wait: number
): ((...args: Parameters<T>) => any) => {
  const [timerId, setTimerId] = useState<number>();
  const [call, setCall] = useState(true);

  return useCallback(
    (...args: Parameters<T>) => {
      if (call) {
        setCall(false);
        fun(...args);
      }

      clearTimeout(timerId);

      const id = setTimeout(() => {
        setCall(true);
      }, wait);

      setTimerId(Number(id));
    },
    [call, fun, timerId, wait]
  );
};

export default useDebounce;
