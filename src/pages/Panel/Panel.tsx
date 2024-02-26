import React from 'react';
import './Panel.css';
import dictionaryImg from './img/dictionary.png';
import notesImg from './img/notes.png';
import tasksImg from './img/tasks.png';

import SubpanelDict from './subpanel/dictionary.tsx';
import SubpanelTodo from './subpanel/todo.tsx';
import SubpanelNotes from './subpanel/notes.tsx';

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
        <div className="dictionary-container">
          {/* <!-- <button id="dict-btn">Dictionary</button> --> */}
          <input id="dict-btn" type="checkbox" name="feat1" />
          <label htmlFor="dict-btn">
            <img className="icons" src={dictionaryImg} /> Dictionary
          </label>
          <div className="dictionary-content">
            <SubpanelDict />
          </div>
        </div>

        <div className="notes-container">
          {/* <!-- <button id="notes-btn">Notes</button> --> */}
          <input id="notes-btn" type="checkbox" name="feat2" />
          <label htmlFor="notes-btn">
            <img className="icons" src={notesImg} /> Notes
          </label>
          <div className="notes-content">
            <SubpanelNotes />
          </div>
        </div>

        <div className="tasks-container">
          {/* <!-- <button id="tasks-btn" />Tasks</button> --> */}
          <input id="tasks-btn" type="checkbox" name="feat3" />
          <label htmlFor="tasks-btn">
            <img className="icons" src={tasksImg} /> To-Do List
          </label>
          <div className="tasks-content">
            <SubpanelTodo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
