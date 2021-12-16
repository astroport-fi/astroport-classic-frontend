import { useEffect, useState } from "react";

export interface CountdownOptions {
  readonly targetTime: number;
  readonly interval?: number;
}

export const useCountdown: (options: CountdownOptions) => number = ({
  targetTime,
  interval = 60000,
}) => {
  const [ms, setMs] = useState<number>(targetTime - Date.now());
  const [countdownIntervalId, setCountdoiwnIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMs(targetTime - Date.now());
    const intervalId = setInterval(() => {
      setMs(targetTime - Date.now());
    }, interval);
    setCountdoiwnIntervalId(intervalId);

    return () => {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
    };
  }, [targetTime, interval]);

  useEffect(() => {
    if (ms < 0) {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
      setMs(0);
    }
  }, [ms]);

  return ms;
};

export const useFormattedCountdown = (
  options: CountdownOptions
): {
  d: string;
  h: string;
  m: string;
} => {
  const countdown = useCountdown(options);

  const calcDelta = (ms: number) => ({
    d: Math.floor(ms / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0"),
    h: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0"),
    m: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0"),
  });

  return calcDelta(countdown);
};
