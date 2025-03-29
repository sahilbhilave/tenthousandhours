import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  onComplete: () => void;
  initialTime?: number; // time in seconds, default is 1500 (25 minutes)
}

const Timer: React.FC<TimerProps> = ({ onComplete, initialTime = 1500 }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      onComplete();
      resetTimer();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time, onComplete, initialTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 text-center">
      <div className="text-7xl font-mono mb-6 text-gray-800">{formatTime(time)}</div>
      <div className="space-x-6">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
