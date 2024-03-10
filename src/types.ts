export interface Settings {
  pomodoro: {
    workTime: number;
    breakTime: number;
  };
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExtensionData {
  settings: Settings;
  notes: Note[];
}
