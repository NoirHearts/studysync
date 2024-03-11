import React from 'react';
import { useState, useEffect, useRef } from 'react';
import dataService, { defaultSettings } from '../../../services/data';
import { Settings } from '../../../types';
import click from '../sounds/click.mp3';
import ring from '../sounds/ring.mp3';

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

  const clickSound = new Audio(click);
  const ringSound = new Audio(ring);

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
        ringSound.play();
        setIsPaused(true);
        isPausedRef.current = true;
        return switchMode();
      }
      tick();
    }, 1000);

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

    //change color of timer circle to default
    const timerDiv = document.querySelector('.timer') as HTMLDivElement;
    timerDiv.style.border = '4px solid #f1ece9';
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
            id="start-btn"
            className="pomodoro-button"
            onClick={() => {
              clickSound.play();
              if (!isInitialized) setIsInitialized(true);
              setIsPaused(false);
              isPausedRef.current = false;
              const timerDiv = document.querySelector(
                '.timer'
              ) as HTMLDivElement;
              timerDiv.style.border =
                mode === 'work' ? '4px solid #e63946' : '4px solid #2a9d8f';
            }}
          ></button>
        ) : (
          <button
            id="pause-btn"
            className="pomodoro-button"
            onClick={() => {
              clickSound.play();
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          ></button>
        )}
        <button
          id="skip-btn"
          className="pomodoro-button"
          onClick={() => {
            clickSound.play();
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
