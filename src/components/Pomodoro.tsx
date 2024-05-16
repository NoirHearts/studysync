import React from 'react';
import { useState, useEffect, useRef } from 'react';
import dataService from '../services/data';
import { defaultSettings } from '../constants';
import { Settings } from '../types';
import click from '../assets/sounds/click.mp3';
import ring from '../assets/sounds/ring.mp3';

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
  const settingsRef = useRef(settings);

  const clickSound = new Audio(click);
  const ringSound = new Audio(ring);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await dataService.retrieve('settings');
        setSettings({ ...(items.settings.pomodoro as Settings['pomodoro']) });

        dataService.addListener(
          'settings',
          ([_keyChanged, { oldValue: _oldValue, newValue }]) => {
            setSettings({
              ...(newValue as Settings).pomodoro,
            });
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    initTimer();

    secondsLeftRef.current = settings.workTime * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        playSound(ringSound);
        if (!settingsRef.current.autoPlay){
          console.log("pumasok here")
          setIsPaused(true);
          isPausedRef.current = true;
        }
        
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
      (nextMode === 'work' ? settingsRef.current.workTime : settingsRef.current.breakTime) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    console.log(`Next is ${nextSeconds}`)
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;

    //change color of timer circle to default
    const timerDiv = document.querySelector('.timer') as HTMLDivElement;
    if (!settingsRef.current.autoPlay){
      timerDiv.style.border = '4px solid #f1ece9';
    }
    else{
      timerDiv.style.border = modeRef.current === 'work' ? '4px solid #e63946' : '4px solid #2a9d8f';
    }
    
  }

  function playSound(sound: HTMLAudioElement) {
    sound.volume = settings.volume / 100;
    sound.play();
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

      <div className="pomodoro-settings">
        <button onClick={() => {chrome.runtime.openOptionsPage()}} id="settings-button" className="pomodoro-button"></button>
      </div>

      <div className="buttons">
        {isPaused ? (
          <button
            id="start-button"
            className="pomodoro-button"
            onClick={() => {
              playSound(clickSound);
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
            id="pause-button"
            className="pomodoro-button"
            onClick={() => {
              playSound(clickSound);
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          ></button>
        )}
        <button
          id="skip-button"
          className="pomodoro-button"
          onClick={() => {
            playSound(clickSound);
            if (!isInitialized) return;
            
            if (!settingsRef.current.autoPlay){
              setIsPaused(true);
              isPausedRef.current = true;
            }
            // setIsPaused(true);
            // isPausedRef.current = true;
            switchMode();
            console.log(`Timer reset to ${secondsLeftRef.current}`);
          }}
        ></button>
      </div>
    </div>
  );
};

export default Pomodoro;
