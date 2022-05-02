import { useEffect, useRef } from "react";

const useTimeout = (timeout: any, callback: any) => {
  const timerId = useRef(null);
  const remaining = useRef(timeout);
  const start = useRef(null);

  const pause = () => {
    // @ts-expect-error
    clearTimeout(timerId.current);
    remaining.current -= Date.now() - (start.current || 0);
  };

  const resume = () => {
    // @ts-expect-error
    start.current = Date.now();
    // @ts-expect-error
    clearTimeout(timerId.current);
    // @ts-expect-error
    timerId.current = setTimeout(callback, remaining.current);
  };

  useEffect(() => {
    resume();

    return () => {
      // @ts-expect-error
      clearTimeout(timerId.current);
    };
  }, []);

  return [pause, resume];
};

export default useTimeout;
