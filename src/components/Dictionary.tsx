import React, { useEffect, useState, useRef } from 'react';
import searchImg from '../assets/img/search.png';
import { DictionaryEntry, WordDefinition, WordMeaning } from '../types';
import dictionaryService from '../services/dictionary';

function getSearchWord() {
  const searchInput = document.getElementById(
    'search-word'
  ) as HTMLInputElement;
  return searchInput ? searchInput.value : '';
}

const Dictionary: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [definition, setDefinition] = useState<DictionaryEntry | null>(null);
  const inputFieldRef = useRef(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      const wordToSearch = getSearchWord();
      const result = await dictionaryService.search(wordToSearch);

      setDefinition(result);
    } catch (err) {
      console.error(err);
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
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.target === inputFieldRef.current) {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleClick();
        }
      }
    };

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
        <button id="search-button" onClick={handleClick}>
          <img className="icons" src={searchImg} />
        </button>
      </div>
      <div className="dictionary-container"></div>

      {error ? (
        <div className="error-msg">{error}</div>
      ) : isLoading ? (
        <div className="loading">Loading...</div>
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
