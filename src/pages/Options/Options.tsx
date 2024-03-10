import React, { useEffect, useState } from 'react';
import { Settings, defaultSettings } from '../../../utils/settings';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [status, setStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const displayStatus = (message: string, ms: number) => {
    setStatus(message);
    const id = setTimeout(() => {
      setStatus('');
    }, ms);
    return () => clearTimeout(id);
  };

  const displayError = (message: string, ms: number) => {
    setErrorMessage(message);
    const id = setTimeout(() => {
      setErrorMessage('');
    }, ms);
    return () => clearTimeout(id);
  };

  useEffect(() => {
    try {
      chrome.storage.sync.get(defaultSettings, (storedSettings) => {
        setSettings({ ...storedSettings } as Settings);
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        displayError(`Error: ${error.message}`, 5000);
      } else {
        displayError('Something went wrong.', 5000);
      }
    }
  }, []);

  const saveSettings = () => {
    try {
      chrome.storage.sync.set(
        {
          ...settings,
        },
        () => {
          displayStatus('Options saved.', 1000);
        }
      );
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        displayError(`Error: ${error.message}`, 5000);
      } else {
        displayError('Something went wrong.', 5000);
      }
    }
  };

  return (
    <div className="options-container">
      <h1>{title} Page</h1>
      <div>
        <label htmlFor="work-time">Work time (in minutes)</label>
        <input
          type="number"
          name="work-time"
          min={1}
          value={settings.workTime}
          onChange={(event) =>
            setSettings({ ...settings, workTime: Number(event.target.value) })
          }
        ></input>
      </div>
      <div>
        <label htmlFor="break-time">Break time (in minutes)</label>
        <input
          type="number"
          name="break-time"
          min={1}
          value={settings.breakTime}
          onChange={(event) =>
            setSettings({ ...settings, breakTime: Number(event.target.value) })
          }
        ></input>
      </div>
      <div className="error-message">{errorMessage}</div>
      <div className="status-message">{status}</div>
      <button onClick={saveSettings}>Save</button>
    </div>
  );
};

export default Options;
