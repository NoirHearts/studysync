import { Settings } from '../types';

export const defaultSettings: Settings = {
  pomodoro: {
    workTime: 25,
    breakTime: 5,
  },
  notes: [],
};

/**
 * Retrieves settings from storage.
 *
 * @param {string | string[] | Settings} keys - The key(s) of the settings to retrieve.
 * @param {(storedSettings: Settings) => void} callback - Callback function to handle retrieved settings.
 */
const get = (
  keys: string | string[] | Settings,
  callback: (storedSettings: Settings) => void
) => {
  chrome.storage.sync.get(keys, (storedSettings) => {
    callback(storedSettings as Settings);
  });
};

/**
 * Updates settings in storage.
 *
 * @param {Settings} newSettings - New settings to be saved.
 * @param {() => void} callback - Callback function to be called after settings are updated.
 */
const update = (newSettings: Settings, callback: () => void) => {
  chrome.storage.sync.set(
    {
      ...newSettings,
    },
    () => {
      callback();
    }
  );
};

export default {
  get,
  update,
};
