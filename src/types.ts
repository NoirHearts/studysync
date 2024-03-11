export interface Settings {
  pomodoro: {
    workTime: number;
    breakTime: number;
  };
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExtensionData {
  settings: Settings;
  notes: Note[];
}
