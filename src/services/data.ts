import { ExtensionData, Settings } from '../types';

export const defaultSettings: Settings = {
  pomodoro: {
    workTime: 25,
    breakTime: 5,
  },
};

export const initialData: ExtensionData = {
  settings: {
    ...defaultSettings,
  },
  notes: [],
};

/**
 * Retrieves data from storage.
 *
 * @param {string | string[] | { [key: string]: any; } | null} keys - The key(s) of the data to retrieve.
 * @param {(items: { [key: string]: any }) => void} callback - Callback function to handle retrieved data.
 */
const retrieve = (
  keys:
    | string
    | string[]
    | {
        [key: string]: any;
      }
    | null,
  callback: (items: { [key: string]: any }) => void
) => {
  chrome.storage.sync.get(keys, (items) => {
    callback(items);
  });
};

/**
 * Updates data in storage.
 *
 * @param { [key: string]: any } items - New data to be saved.
 * @param {() => void} callback - Callback function to be called after data is updated.
 */
const update = (items: { [key: string]: any }, callback: () => void) => {
  chrome.storage.sync.set(
    {
      ...items,
    },
    () => {
      callback();
    }
  );
};

export default {
  retrieve,
  update,
};
