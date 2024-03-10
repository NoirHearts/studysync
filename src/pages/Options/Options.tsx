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

  const importSettings = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';

    fileInput.onchange = function (event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        const settingsJSON = e.target?.result as string;
        const settings = JSON.parse(settingsJSON) as Settings;

        try {
          chrome.storage.sync.set(settings, () => {
            displayStatus('Settings imported successfully.', 3000);
            setSettings({ ...settings } as Settings);
          });
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            displayError(`Error: ${error.message}`, 5000);
          } else {
            displayError('Something went wrong.', 5000);
          }
        }
      };

      reader.readAsText(file);
    };

    document.body.appendChild(fileInput);
    fileInput.click();
  };

  const exportSettings = () => {
    chrome.storage.sync.get(null, function (items) {
      const settingsJSON = JSON.stringify(items);
      const blob = new Blob([settingsJSON], { type: 'application/json' });

      const downloadLink = document.createElement('a');
      downloadLink.download = 'studysync_settings.json';
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.click();
    });
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
      <div>
        <button onClick={importSettings}>Import Settings</button>{' '}
        <button onClick={exportSettings}>Export Settings</button>
      </div>
    </div>
  );
};

export default Options;
