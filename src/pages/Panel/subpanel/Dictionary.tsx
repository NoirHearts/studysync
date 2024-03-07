import React, {useState} from 'react';
import useSWR from 'swr';

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const searchBtn = document.getElementById("search-btn");
const fetcher = (...args: any) => fetch(args).then((res) => res.json());

function getSearchWord() {
  const searchInput = document.getElementById("search-word");
  return searchInput ? searchInput.value : "";
}

searchBtn?.addEventListener("click", () => {
  const searchWord = getSearchWord();
});

type WordDefinition = {
  definition: string;
  synonyms: Array<string>;
  antonyms: Array<string>;
};

type WordMeaning = {
  partOfSpeech: string;
  definitions: Array<WordDefinition>;
  synonyms: Array<string>;
  antonyms: Array<string>;
};

const Dictionary: React.FC = () => {
  const { data, error, isValidating } = useSWR(
    `${url}${getSearchWord()}`,
    fetcher
  );

  if (error) {
    return <div>Can't find the word.</div>;
  }

  if (isValidating) {
    return <div>Loading...</div>;
  }
  const definition_index: number = 0;
  const wdef = data[definition_index];
  return (
    <div>
      <div className="dictionary-container">
      </div>
      
      <p className="word">
        {wdef.word}{' '}
        <span className="word-phonetic">
          {(wdef.phonetic && <em>({wdef.phonetic})</em>) || <></>}
        </span>
      </p>
      <p className="word-origin">{wdef.origin}</p>
      {wdef.meanings.map((m: WordMeaning) =>
        m.definitions.map((d: WordDefinition, index) => (
          <p key={index} className="word-meaning">
            <em className="word-speechpart">({m.partOfSpeech})</em>{' '}
            {d.definition}
          </p>
        ))
      )}
    </div>
  );
};

export default Dictionary;
