import React from 'react';
import './Panel.css';
import dictionaryImg from '../../assets/img/dictionary.png';
import notesImg from '../../assets/img/notes.png';
import tasksImg from '../../assets/img/tasks.png';

import Dictionary from '../../components/Dictionary';
import Tasks from '../../components/Tasks/Tasks';
import Notes from '../../components/Notes';
import Pomodoro from '../../components/Pomodoro';
import FeatureContainer from '../../components/FeatureContainer';

const Panel: React.FC = () => {
  return (
    <div className="panel-container">
      <h3 className="name-header">StudySync</h3>
      <Pomodoro />
      <div className="other-features">
        <FeatureContainer prefix="tasks" title="To-Do List" icon={tasksImg}>
          <Tasks />
        </FeatureContainer>
        <FeatureContainer prefix="notes" title="Notes" icon={notesImg}>
          <Notes />
        </FeatureContainer>
        <FeatureContainer
          prefix="dictionary"
          title="Dictionary"
          icon={dictionaryImg}
        >
          <Dictionary />
        </FeatureContainer>
      </div>
    </div>
  );
};

export default Panel;
