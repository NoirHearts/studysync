import { ExtensionData, Settings } from './types';

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

export const dictionaryApiUrl =
  'https://api.dictionaryapi.dev/api/v2/entries/en/';
