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
