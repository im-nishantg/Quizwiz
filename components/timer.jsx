import React, { useState, useEffect } from 'react';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(10);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let interval = null;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      setSuccess(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      {success ? (
        props.handleTimer()
      ) : (
        <p>Time remaining: {formatTime(seconds)}</p>
      )}
    </div>
  );
};

export default Timer;
