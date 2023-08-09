import { useState, useRef, useEffect } from "react";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const initialCount = 5;
const restTime = 11;

const convertToSeconds = (minutes) => {
  const seconds = minutes * 60;
  return seconds;
};

const Timer = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialCount);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const [isRest, setIsRest] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setIsRest(false);
    setSessionCount(1);
    setSecondsRemaining(initialCount);
  };
  const changeCountdown = (e) => {
    // console.log(convertToSeconds(e.target.value))
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(convertToSeconds(e.target.value));
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        console.log(isRest);
        // doesn't run as is because state updates in React are asynchrounous!!
        // setIsRest(!isRest);
        const shouldRest = !isRest;
        if (shouldRest) {
          console.log("Resting, time set to restTime");
          setSecondsRemaining(restTime);
        } else {
          console.log("Working, time set to initialCount");
          setSecondsRemaining(initialCount);
        }
        if (isRest) {
          setSessionCount(sessionCount + 1);
        }
        setIsRest(!isRest);
        // setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  return (
    <div className="Timer">
      <input type="number" onChange={changeCountdown} />
      <button onClick={handleStart} type="button">
        Start
      </button>
      <button onClick={handleStop} type="button">
        Stop
      </button>
      <button onClick={handleReset} type="button">
        Reset
      </button>
      <div style={{ padding: 20 }}>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      <div>Status: {status}</div>
      <div>Session Count: {sessionCount}</div>
      {isRest ? <h2>Rest Time!</h2> : <h2>Work Time!</h2>}
    </div>
  );
};

export default Timer;

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      // use setInterval instead of setTimeout because it allows you to run a fcn repeatedly, while setTimeout
      // only allows you to run once
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, "0");
