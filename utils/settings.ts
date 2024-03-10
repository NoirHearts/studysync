export interface Settings {
  pomodoro: {
    workTime: number;
    breakTime: number;
  };
}

export const defaultSettings = {
  pomodoro: {
    workTime: 25,
    breakTime: 5,
  },
};
