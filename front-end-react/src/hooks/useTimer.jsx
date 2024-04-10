import { useState, useEffect, useRef, useCallback } from 'react';

const useTimer = (delay) => {
  const intervalRef = useRef();
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState({
    timerValue: 0,
    startTime: 0,
  });

  const startTimer = useCallback(() => {
    setTimer(() => ({
      timerValue: 0,
      startTime: Date.now(),
    }));
    setStarted(true);
  }, []);
  const pauseTimer = useCallback(() => {
    setStarted(false);
  }, []);
  const refreshTimer = useCallback(() => {
    const now = Date.now();
    setTimer((timer) => ({
      ...timer,
      timerValue: now - timer.startTime,
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimer(() => ({
      timerValue: 0,
      startTime: 0,
    }));
    setStarted(false);
  }, []);

  useEffect(() => {
    if (started) {
      intervalRef.current = setInterval(refreshTimer, delay);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [started, delay, refreshTimer]);

  return {
    timerValue: Math.round(timer.timerValue / 100) / 10,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useTimer;
