import { ExtensionData, Settings } from './types';

export const defaultSettings: Settings = {
  pomodoro: {
    workTime: 25,
    breakTime: 5,
    volume: 100,
    autoPlay: false,
    longBreak: false,
  },
};

export const autoplayEnabledSettings: Settings = {
  pomodoro: {
    workTime: 0.1,
    breakTime: 5,
    volume: 100,
    autoPlay: true,
    longBreak: false
  },
};

export const initialData: ExtensionData = {
  settings: {
    ...defaultSettings,
  },
  notes: [],
  tasks: [],
};

export const saveCooldown = 300;

export const dictionaryApiUrl =
  'https://api.dictionaryapi.dev/api/v2/entries/en/';
