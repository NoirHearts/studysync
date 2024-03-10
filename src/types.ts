export interface Settings {
  pomodoro: {
    workTime: number;
    breakTime: number;
  };
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
