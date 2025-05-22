import { useState, useEffect, useRef, useCallback } from "react";

/**
 * A minimalist, robust timer hook that counts down from the specified seconds
 *
 * @param initialSeconds - The number of seconds to count down from
 * @returns Object containing timer state and control function
 */
export const useTimer = (initialSeconds: number = 15) => {
  // State for the current timer value
  const [timer, setTimer] = useState(initialSeconds);
  // State to track if timer is currently running
  const [isActive, setIsActive] = useState(false);
  // Ref to store the interval ID for cleanup
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Cleans up the current interval if it exists
   */
  const cleanupInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Starts the timer countdown
   */
  const startTimer = useCallback(() => {
    // Clean up any existing interval first
    cleanupInterval();

    // Reset timer to initial value before starting
    setTimer(initialSeconds);
    setIsActive(true);

    // Create new interval
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          // Auto cleanup and reset states when timer reaches zero
          cleanupInterval();
          setIsActive(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  }, [initialSeconds, cleanupInterval]);

  // Effect to handle component unmount cleanup
  useEffect(() => {
    return cleanupInterval;
  }, [cleanupInterval]);

  // Effect to handle initialSeconds changes
  useEffect(() => {
    // Only update the timer if it's not active
    if (!isActive) {
      setTimer(initialSeconds);
    }
  }, [initialSeconds, isActive]);

  return { timer, isActive, startTimer };
};
