import { useState, useEffect, useRef, useCallback } from "react";

export const useTimer = (initialSeconds: number = 15) => {
  const [timer, setTimer] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    cleanupInterval();

    setTimer(initialSeconds);
    setIsActive(true);

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          cleanupInterval();
          setIsActive(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  }, [initialSeconds, cleanupInterval]);

  useEffect(() => {
    return cleanupInterval;
  }, [cleanupInterval]);

  useEffect(() => {
    if (!isActive) {
      setTimer(initialSeconds);
    }
  }, [initialSeconds, isActive]);

  return { timer, isActive, startTimer };
};
