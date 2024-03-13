import { dictionaryApiUrl } from '../constants';
import { DictionaryEntry } from '../types';

/**
 * Searches for a dictionary entry for a given word.
 *
 * @param {string} query - The word to search for in the dictionary.
 * @returns A promise that resolves with the dictionary entry for the word.
 *
 */
const search = async (query: string): Promise<DictionaryEntry> => {
  if (query.includes(' ')) {
    throw new Error(`Please only search one word at a time.`);
  }

  const response = await fetch(dictionaryApiUrl + query);
  if (!response.ok) {
    if (response.status == 404) {
      throw new Error(`Word does not have a dictionary entry.`);
    } else {
      throw new Error(`An error occurred. Status: ${response.status}`);
    }
  }

  const result = (await response.json()) as DictionaryEntry[];

  return result[0];
};

export default {
  search,
};
