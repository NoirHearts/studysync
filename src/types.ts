export interface ExtensionData {
  settings: Settings;
  notes: Note[];
}

export interface Settings {
  pomodoro: {
    workTime: number;
    breakTime: number;
    volume: number;
  };
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tasks

export interface Task {
  id: string;
  completed: boolean;
  task: string;
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
