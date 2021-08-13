import { useCallback, useEffect, useState } from "react";

export const useThrottle = <T extends (...args: any) => any>(
  fun: T,
  wait: number
): ((...args: Parameters<T>) => any) => {
  const [timerId, setTimerId] = useState<number>();
  const [call, setCall] = useState(false);
  const [lastArgs, setLastArgs] = useState<Parameters<T>>();

  useEffect(() => {
    if (!call) {
      return;
    }

    setCall(false);

    fun(...(lastArgs || []));
  }, [call, fun, lastArgs]);

  const debouncedFun = useCallback(
    (...args: Parameters<T>) => {
      setLastArgs(args);
      clearTimeout(timerId);

      const id = setTimeout(() => {
        setCall(true);
      }, wait);

      setTimerId(Number(id));
    },
    [timerId, wait]
  );

  return debouncedFun;
};

export default useThrottle;
