export interface ExtensionData {
  settings: Settings;
  notes: Note[];
  tasks: Task[];
}

export interface Settings {
  pomodoro: {
    workTime: number;
    breakTime: number;
    volume: number;
  };
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  completed: boolean;
  taskString: string;
  priority: number;
}

// Dictionary API

export type DictionaryEntry = {
  word: string;
  phonetic: string;
  phonetics: Array<object>;
  origin: string;
  meanings: Array<WordMeaning>;
};

export type WordDefinition = {
  definition: string;
  synonyms: Array<string>;
  antonyms: Array<string>;
};

export type WordMeaning = {
  partOfSpeech: string;
  definitions: Array<WordDefinition>;
  synonyms: Array<string>;
  antonyms: Array<string>;
};
