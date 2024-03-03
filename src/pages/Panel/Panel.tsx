import React from 'react';
import './Panel.css';
import dictionaryImg from './img/dictionary.png';
import notesImg from './img/notes.png';
import tasksImg from './img/tasks.png';

import Dictionary from './subpanel/Dictionary';
import Tasks from './subpanel/Tasks';
import Notes from './subpanel/Notes';
import Pomodoro from './subpanel/Pomodoro';

const Panel: React.FC = () => {
  return (
    <div className="outer-container">
      <div className="container">
        <h3 className="name-header">StudySync</h3>

        <Pomodoro />

        <div className="other-features">
          <div id="tasks-container" className="feature-container">
            {/* <!-- <button id="tasks-btn" />Tasks</button> --> */}
            <input
              id="tasks-btn"
              className="feature-button"
              type="checkbox"
              name="feat3"
            />
            <label htmlFor="tasks-btn">
              <img className="icons" src={tasksImg} /> To-Do List
            </label>
            <div id="tasks-content" className="feature-content">
              <Tasks />
            </div>
          </div>

          <div id="notes-container" className="feature-container">
            {/* <!-- <button id="notes-btn">Notes</button> --> */}
            <input
              id="notes-btn"
              className="feature-button"
              type="checkbox"
              name="feat2"
            />
            <label htmlFor="notes-btn">
              <img className="icons" src={notesImg} /> Notes
            </label>
            <div id="notes-content" className="feature-content">
              <Notes />
            </div>
          </div>

          <div id="dictionary-container" className="feature-container">
            {/* <!-- <button id="dict-btn">Dictionary</button> --> */}
            <input
              id="dict-btn"
              className="feature-button"
              type="checkbox"
              name="feat1"
            />
            <label htmlFor="dict-btn">
              <img className="icons" src={dictionaryImg} /> Dictionary
            </label>
            <div id="dictionary-content" className="feature-content">
              <Dictionary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
