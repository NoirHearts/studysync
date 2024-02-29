import React from 'react';
import { useState, useEffect, useRef } from 'react';
// add sound effects import audio here

function Pomodoro() {
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const secondsLeftRef = useRef(secondsLeft);

  function initTimer() {
    setSecondsLeft(25 * 60); //25 mins * 60 secs
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode : string = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds : number = (nextMode === 'work' ? 25 : 5) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  useEffect(() => {
    initTimer();

    secondsLeftRef.current = 25 * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        setIsPaused(true);
        isPausedRef.current = true;
        return switchMode();
      }
      tick();
    }, 1000);
    // if secondsleft === 0 => (new Audio(alarm).play())

    return () => clearInterval(interval);
  }, []);

  let minutes: string = String(Math.floor(secondsLeft / 60));
  let seconds: string = String(secondsLeft % 60);

  if (Number(minutes) < 10) minutes = '0' + minutes;
  if (Number(seconds) < 10) seconds = '0' + seconds;

  return (
    <div className="timer-container">
      <div className="timer">
        <div className="timer-header">
          {minutes}:{seconds}
        </div>
      </div>
      <div className="buttons">
        {isPaused ? (
          <button
            id="start-btn"
            className="pomodoro-button"
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          ></button>
        ) : (
          <button
            id="pause-btn"
            className="pomodoro-button"
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          ></button>
        )}
        <button
          id="skip-btn"
          className="pomodoro-button"
          onClick={() => {
            setIsPaused(true);
            isPausedRef.current = true;
            switchMode();
            console.log(`Timer reset to ${secondsLeftRef.current}`);
          }}
        ></button>
      </div>
    </div>
  );
}

export default Pomodoro;
