import React, { useEffect, useState } from 'react';
import { ExtensionData, Settings } from '../../types';
import dataService, { defaultSettings } from '../../services/data';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [status, setStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    try {
      dataService.retrieve('settings', (items) => {
        setSettings({ ...(items.settings as Settings) });
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

  const saveSettings = () => {
    try {
      dataService.update(
        {
          settings: settings,
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

      reader.onload = function (e: ProgressEvent<FileReader>) {
        const dataJSON = e.target?.result as string;
        const data = JSON.parse(dataJSON);

        try {
          dataService.update(data, () => {
            displayStatus('Data imported successfully.', 3000);
            setSettings({ ...data.settings } as Settings);
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

  const exportData = () => {
    try {
      dataService.retrieve(null, (items) => {
        const data = items as ExtensionData;
        const dataJSON = JSON.stringify(data, null, 2);
        const blob = new Blob([dataJSON], { type: 'application/json' });

        const downloadLink = document.createElement('a');
        downloadLink.download = 'studysync_data.json';
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
        downloadLink.remove();
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
