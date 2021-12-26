import { useEffect, useRef } from "react";

const useTimeout = (timeout, callback) => {
  const timerId = useRef(null);
  const remaining = useRef(timeout);
  const start = useRef(null);

  const pause = () => {
    clearTimeout(timerId.current);
    remaining.current -= Date.now() - start.current;
  };

  const resume = () => {
    start.current = Date.now();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(callback, remaining.current);
  };

  useEffect(() => {
    resume();

    return () => {
      clearTimeout(timerId.current);
    };
  }, []);

  return [pause, resume];
};

export default useTimeout;
