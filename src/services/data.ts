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

function isValidKey(
  key: string | string[]
): key is keyof ExtensionData | (keyof ExtensionData)[] {
  if (typeof key === 'string') {
    return key in initialData;
  } else if (Array.isArray(key)) {
    return key.every((el) => el in initialData);
  } else {
    return false;
  }
}

/**
 * Retrieves data from storage.
 *
 * @param {string | string[] | null} keys - The key(s) of the data to retrieve.
 * @param {(items: { [key: string]: any }) => void} callback - Callback function to handle retrieved data.
 */
const retrieve = (
  keys: string | string[] | null,
  callback: (items: { [key: string]: any }) => void
) => {
  if (keys !== null && !isValidKey(keys)) {
    throw new Error(`Invalid key(s): ${keys}`);
  }

  chrome.storage.sync.get(keys, (items) => {
    callback(items);
  });
};

/**
 * Updates data in storage.
 *
 * @param {Object.<string, any>} items - New data to be saved.
 * @param {() => void} callback - Callback function to be called after data is updated.
 */
const update = (items: { [key: string]: any }, callback: () => void) => {
  if (!isValidKey(Object.keys(items))) {
    throw new Error(`Invalid key(s): ${Object.keys(items)}`);
  }

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
