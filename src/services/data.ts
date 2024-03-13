import { ExtensionData } from '../types';
import { initialData } from '../constants';

/**
 * Checks if the provided key(s) are valid keys in the initial data.
 *
 * @param {string | string[]} key - The key(s) to validate.
 * @returns {boolean} Whether the key(s) are valid.
 */
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

/**
 * Adds a listener for changes to the storage.
 *
 * @param {string | null} key - The key to listen for changes. If null, listens to changes for all keys.
 * @param {(args: [string, { oldValue: any; newValue: any }]) => void} callback - Callback function to handle changes.
 */
const addListener = (
  key: string | null,
  callback: (args: [string, { oldValue: any; newValue: any }]) => void
) => {
  chrome.storage.onChanged.addListener((changes) => {
    for (const [
      keyChanged,
      { oldValue: oldVal, newValue: newVal },
    ] of Object.entries(changes)) {
      if (key === null || key === keyChanged) {
        callback([keyChanged, { oldValue: oldVal, newValue: newVal }]);
      }
    }
  });
};

export default {
  retrieve,
  update,
  addListener,
};
