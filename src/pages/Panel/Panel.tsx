import React from 'react';
import './Panel.css';
import dictionaryImg from './img/dictionary.png';
import notesImg from './img/notes.png';
import tasksImg from './img/tasks.png';
import Pomodoro from './pomodoro.tsx';

const Panel: React.FC = () => {
  return (
    <div className="container">
      <h3 className="name-header">StudySync</h3>
      
      <Pomodoro />

      <div className="other-features">
        <div className="dictionary-container">
          {/* <!-- <button id="dict-btn">Dictionary</button> --> */}
          <input id="dict-btn" type="checkbox" name="feat1" />
          <label htmlFor="dict-btn">
            <img className="icons" src={dictionaryImg} /> Dictionary
          </label>
          <div className="dictionary-content">
            Dictionary content here <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus
            felis, venenatis in viverra nec, ultrices sit amet dui. Sed
            fermentum vel diam ac luctus. Etiam ullamcorper, purus vel iaculis
            consectetur, enim enim interdum nunc, at venenatis elit massa
            consequat dui. Cras vel libero odio. Curabitur sit amet lorem arcu.
            Praesent porta odio leo, vitae egestas ex dapibus nec. Mauris congue
            mi non turpis porta, tincidunt pharetra massa finibus. Cras vitae
            metus ut est fermentum vulputate euismod quis urna. Quisque accumsan
            augue rhoncus diam iaculis convallis. Aenean nec mauris eget sapien
            elementum hendrerit. Ut eget dui lacus.
          </div>
        </div>

        <div className="notes-container">
          {/* <!-- <button id="notes-btn">Notes</button> --> */}
          <input id="notes-btn" type="checkbox" name="feat2" />
          <label htmlFor="notes-btn">
            <img className="icons" src={notesImg} /> Notes
          </label>
          <div className="notes-content">
            Notes content here <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus
            felis, venenatis in viverra nec, ultrices sit amet dui. Sed
            fermentum vel diam ac luctus. Etiam ullamcorper, purus vel iaculis
            consectetur, enim enim interdum nunc, at venenatis elit massa
            consequat dui. Cras vel libero odio. Curabitur sit amet lorem arcu.
            Praesent porta odio leo, vitae egestas ex dapibus nec. Mauris congue
            mi non turpis porta, tincidunt pharetra massa finibus. Cras vitae
            metus ut est fermentum vulputate euismod quis urna. Quisque accumsan
            augue rhoncus diam iaculis convallis. Aenean nec mauris eget sapien
            elementum hendrerit. Ut eget dui lacus.
          </div>
        </div>

        <div className="tasks-container">
          {/* <!-- <button id="tasks-btn" />Tasks</button> --> */}
          <input id="tasks-btn" type="checkbox" name="feat3" />
          <label htmlFor="tasks-btn">
            <img className="icons" src={tasksImg} /> To-Do List
          </label>
          <div className="tasks-content">
            Tasks content here <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus
            felis, venenatis in viverra nec, ultrices sit amet dui. Sed
            fermentum vel diam ac luctus. Etiam ullamcorper, purus vel iaculis
            consectetur, enim enim interdum nunc, at venenatis elit massa
            consequat dui. Cras vel libero odio. Curabitur sit amet lorem arcu.
            Praesent porta odio leo, vitae egestas ex dapibus nec. Mauris congue
            mi non turpis porta, tincidunt pharetra massa finibus. Cras vitae
            metus ut est fermentum vulputate euismod quis urna. Quisque accumsan
            augue rhoncus diam iaculis convallis. Aenean nec mauris eget sapien
            elementum hendrerit. Ut eget dui lacus.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
