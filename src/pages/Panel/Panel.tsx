import React from 'react';
import './Panel.css';
import dictionaryImg from '../../assets/img/dictionary.png';
import notesImg from '../../assets/img/notes.png';
import tasksImg from '../../assets/img/tasks.png';

import Dictionary from '../../components/Dictionary';
import Tasks from '../../components/Tasks';
import Notes from '../../components/Notes';
import Pomodoro from '../../components/Pomodoro';

const Panel: React.FC = () => {
  return (
    <div className="outer-container">
      <div className="container">
        <h3 className="name-header">StudySync</h3>

        <Pomodoro />

        <div className="other-features">
          <div id="tasks-container" className="feature-container">
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
