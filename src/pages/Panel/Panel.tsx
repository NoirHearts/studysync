import React from 'react';
import './Panel.css';
import dictionaryImg from './img/dictionary.png';
import notesImg from './img/notes.png';
import tasksImg from './img/tasks.png';

import SubpanelDict from './subpanel/dictionary';
import SubpanelTodo from './subpanel/todo';
import SubpanelNotes from './subpanel/notes';

const Panel: React.FC = () => {
  return (
    <div className="container">
      <h3 className="name-header">StudySync</h3>
      <div className="timer-container">
        <div className="timer">
          <div className="timer-header">25:00</div>
        </div>
        <div className="buttons">
          <button id="start-btn" className="pomodoro-button"></button>
          <button id="pause-btn" className="pomodoro-button"></button>
          <button id="stop-btn" className="pomodoro-button"></button>
        </div>
      </div>

      <div className="other-features">
        <div id="dictionary-container" className="feature-container">
          {/* <!-- <button id="dict-btn">Dictionary</button> --> */}
          <input id="dict-btn" className="feature-button" type="checkbox" name="feat1" />
          <label htmlFor="dict-btn">
            <img className="icons" src={dictionaryImg} /> Dictionary
          </label>
          <div id="dictionary-content" className="feature-content">
            <SubpanelDict />
          </div>
        </div>

        <div id="notes-container" className="feature-container">
          {/* <!-- <button id="notes-btn">Notes</button> --> */}
          <input id="notes-btn" className="feature-button" type="checkbox" name="feat2" />
          <label htmlFor="notes-btn">
            <img className="icons" src={notesImg} /> Notes
          </label>
          <div id="notes-content" className="feature-content">
            <SubpanelNotes />
          </div>
        </div>

        <div id="tasks-container" className="feature-container">
          {/* <!-- <button id="tasks-btn" />Tasks</button> --> */}
          <input id="tasks-btn" className="feature-button" type="checkbox" name="feat3" />
          <label htmlFor="tasks-btn">
            <img className="icons" src={tasksImg} /> To-Do List
          </label>
          <div id="tasks-content" className="feature-content">
            <SubpanelTodo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
