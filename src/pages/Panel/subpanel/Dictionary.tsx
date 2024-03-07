import React, {useEffect, useState, useRef } from 'react';
import searchImg from '../img/search.png';

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

function getSearchWord() {
  const searchInput = document.getElementById(
    'search-word'
  ) as HTMLInputElement;
  return searchInput ? searchInput.value : '';
}

type DictionaryEntry = {
  word: string;
  phonetic: string;
  phonetics: Array<object>;
  origin: string;
  meanings: Array<WordMeaning>;
};

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
  const [_data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [definition, setDefinition] = useState<DictionaryEntry | null>(null);
  const inputFieldRef = useRef(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(url + getSearchWord());
      if (!response.ok) {
        throw new Error(`An error occurred. Status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
      const definition_index: number = 0;
      setDefinition(result[definition_index]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`Something went wrong.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const keyDownHandler = event => {
    if (event.target === inputFieldRef.current) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleClick();
      }
    }};

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  
  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Type a word to search..."
          id="search-word"
          ref={inputFieldRef}
        />
        <button id="search-btn" onClick={handleClick}>
          <img className="icons" src={searchImg} />
        </button>
      </div>
      <div className="dictionary-container"></div>

      {error ? (
        <div>No definitions found. </div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : definition != null ? (
        <>
          <p className="word">
            {definition.word}{' '}
            <span className="word-phonetic">
              {(definition.phonetic && <em>({definition.phonetic})</em>) || (
                <></>
              )}
            </span>
          </p>
          <p className="word-origin">{definition.origin}</p>
          {definition.meanings.map((m: WordMeaning) =>
            m.definitions.map((d: WordDefinition, index) => (
              <p key={index} className="word-meaning">
                <em className="word-speechpart">({m.partOfSpeech})</em>{' '}
                {d.definition}
              </p>
            ))
          )}
          </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dictionary;
