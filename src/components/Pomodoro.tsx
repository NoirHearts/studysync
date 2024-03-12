import React from 'react';
import { useState, useEffect, useRef } from 'react';
import dataService from '../services/data';
import { defaultSettings } from '../constants';
import { Settings } from '../types';
// add sound effects import audio here

const Pomodoro: React.FC = () => {
  const [settings, setSettings] = useState<Settings['pomodoro']>(
    defaultSettings.pomodoro
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const secondsLeftRef = useRef(secondsLeft);

  useEffect(() => {
    try {
      dataService.retrieve('settings', (items) => {
        setSettings({ ...(items.settings.pomodoro as Settings['pomodoro']) });
      });

      // Add listener to update pomodoro whenever settings are changed
      chrome.storage.onChanged.addListener((changes) => {
        for (const [key] of Object.entries(changes)) {
          if (key === 'settings') {
            dataService.retrieve('settings', (items) => {
              setSettings({
                ...(items.settings.pomodoro as Settings['pomodoro']),
              });
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }

    initTimer();

    secondsLeftRef.current = settings.workTime * 60;
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

  // Reset timer whenever settings state is updated
  useEffect(() => {
    setIsPaused(true);
    isPausedRef.current = true;
    initTimer();
    secondsLeftRef.current = settings.workTime * 60;
    setSecondsLeft(secondsLeftRef.current);
  }, [settings]);

  function initTimer() {
    setSecondsLeft(settings.workTime * 60);
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode: string = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds: number =
      (nextMode === 'work' ? settings.workTime : settings.breakTime) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

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
            id="start-button"
            className="pomodoro-button"
            onClick={() => {
              if (!isInitialized) setIsInitialized(true);
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          ></button>
        ) : (
          <button
            id="pause-button"
            className="pomodoro-button"
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          ></button>
        )}
        <button
          id="skip-button"
          className="pomodoro-button"
          onClick={() => {
            if (!isInitialized) return;
            setIsPaused(true);
            isPausedRef.current = true;
            switchMode();
            console.log(`Timer reset to ${secondsLeftRef.current}`);
          }}
        ></button>
      </div>
    </div>
  );
};

export default Pomodoro;
