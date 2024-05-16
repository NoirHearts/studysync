import React, { useEffect, useState } from 'react';
import { ExtensionData, Settings } from '../../types';
import dataService from '../../services/data';
import { defaultSettings } from '../../constants';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [status, setStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await dataService.retrieve('settings');
        setSettings({ ...(items.settings as Settings) });
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          displayError(`Error: ${error.message}`, 5000);
        } else {
          displayError('Something went wrong.', 5000);
        }
      }
    };

    fetchData();
  }, []);

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

  const saveSettings = async () => {
    try {
      await dataService.update({
        settings: settings,
      });
      displayStatus('Options saved.', 1000);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        displayError(`Error: ${error.message}`, 5000);
      } else {
        displayError('Something went wrong.', 5000);
      }
    }
  };

  const importData = () => {
    const fileInput = document.getElementById(
      'import-input'
    ) as HTMLInputElement;

    fileInput.onchange = function (event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = async function (e: ProgressEvent<FileReader>) {
        const dataJSON = e.target?.result as string;
        const data = JSON.parse(dataJSON);

        try {
          await dataService.update(data);
          displayStatus('Data imported successfully.', 3000);
          setSettings({ ...data.settings } as Settings);
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

  const exportData = async () => {
    try {
      const items = await dataService.retrieve(null);
      const data = items as ExtensionData;
      const dataJSON = JSON.stringify(data, null, 2);
      const blob = new Blob([dataJSON], { type: 'application/json' });
      const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      const localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -1);
      const timestamp = localISOTime.replace(/[:.TZ]/g, '-').slice(0, -4);

      const filename = `studysync_data_${timestamp}.json`;

      const downloadLink = document.createElement('a');
      downloadLink.download = filename;
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.click();
      downloadLink.remove();
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
          value={settings.pomodoro.workTime}
          onChange={(event) =>
            setSettings({
              ...settings,
              pomodoro: {
                ...settings.pomodoro,
                workTime: Number(event.target.value),
              },
            })
          }
        ></input>
      </div>
      <div>
        <label htmlFor="break-time">Break time (in minutes)</label>
        <input
          type="number"
          name="break-time"
          min={1}
          value={settings.pomodoro.breakTime}
          onChange={(event) =>
            setSettings({
              ...settings,
              pomodoro: {
                ...settings.pomodoro,
                breakTime: Number(event.target.value),
              },
            })
          }
        ></input>
      </div>
      <div>
        <label htmlFor="volume">Volume</label>
        <input
          type="range"
          name="volume"
          min="0"
          max="100"
          value={settings.pomodoro.volume}
          onChange={(event) => {
            setSettings({
              ...settings,
              pomodoro: {
                ...settings.pomodoro,
                volume: Number(event.target.value),
              },
            });
          }}
        />
        <output
          name="volume-display-value"
          id="volume-display-value"
          htmlFor="volume"
        >
          {settings.pomodoro.volume}
        </output>
      </div>

      <div>
        <input
          type="checkbox"
          id="autoplay"
          checked={settings.pomodoro.autoPlay}
          onClick={() => {
            setSettings({
              ...settings,
              pomodoro: {
                ...settings.pomodoro,
                autoPlay: !settings.pomodoro.autoPlay,
              },
            });
          }}
        />
        <label htmlFor="autoplay">Enable Autoplay</label>
      </div>

      <div className="error-message">{errorMessage}</div>
      <div className="status-message">{status}</div>
      <button onClick={saveSettings}>Save</button>
      <div>
        <input
          type="file"
          id="import-input"
          accept=".json"
          style={{ display: 'none' }}
        />
        <button onClick={importData}>Import Data</button>{' '}
        <button onClick={exportData}>Export Data</button>
      </div>
    </div>
  );
};

export default Options;
