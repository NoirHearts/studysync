import React from 'react';
import useSWR from 'swr';

// https://stackoverflow.com/questions/50642662/how-to-get-json-data-from-url-and-save-it-to-the-const-variable-typescript
/*
let data  = ''

fetch('https://jsonplaceholder.typicode.com/comments')
  .then(
    function(response) {
    return response.json();
    }
  ).then(
    function(myJson){
      data=myJson
      console.log(data)
    }
  );

*/

type WordDefinition = {
  definition: String;
  synonyms: Array<String>;
  antonyms: Array<String>;
}

type WordMeaning = {
  partOfSpeech: String;
  definitions: Array<WordDefinition>;
  synonyms: Array<String>;
  antonyms: Array<String>;
}

// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
const fetcher = (...args: any) => fetch(args).then(res => res.json())

let searchword = 'dictionary'

const SubpanelDict: React.FC = () => {

  const {
    data,
    error,
    isValidating,
  } = useSWR('https://api.dictionaryapi.dev/api/v2/entries/en/dictionary', fetcher);
  
  // add error prompt when invalid word

  if (error) {
    return <div>Failed to Load</div>;
  }

  if (isValidating) {
    return <div>Loading...</div>;
  }
  let definition_index: number = 0
  let wdef = data[definition_index]
  return (
    <div>
    <div className='dictionary-container'>
    </div>
      <p className="word">{wdef.word} <span className="word-phonetic">{wdef.phonetic && (<em>({wdef.phonetic})</em>) || (<></>)}</span></p>
      <p className="word-origin">{wdef.origin}</p>
      {wdef.meanings.map((m: WordMeaning) => (
        m.definitions.map((d: WordDefinition) => (
          <p className="word-meaning"><em className="word-speechpart">({m.partOfSpeech})</em> {d.definition}</p>
        ))
      ))
      }
    </div >
  );

}

export default SubpanelDict;