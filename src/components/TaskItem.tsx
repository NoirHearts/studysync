import React, { useState } from 'react';
// import deleteImage from '../assets/img/delete.png';
import { Task } from '../types';

interface Props {
  task: Task;
  handleChecked: (task: Task, checked: boolean) => void;
  handleText: (task: Task, newString: string) => void;
  handleDelete: (task: Task) => void;
}

const TaskItem: React.FC<Props> = ({ task, handleChecked, handleText, handleDelete }) => {
  const [taskString, setTaskString] = useState<string>(task.taskString);

  return (
    <div className="task-item">
    <input
      type="checkbox"
      className="task-completed"
      onChange={async (e) => {
        try{
          handleChecked(task, e.target.checked);
        }catch(err){
          console.log(err);
        }
      }}
      checked={task.completed}
    ></input>
    <input
      className={task.completed ? 'task-name task-done' : 'task-name'}
      value={taskString}
      onChange={async (e) => {
        setTaskString(e.target.value);
      }}
      onBlur={async (_) => {
        try{
          if(taskString != ''){
            task.taskString = taskString;
            handleText(task, taskString);
          }else{
            handleDelete(task);
          }
        }catch(err){
          console.log(err)
        }
      }}
    />
    <button className="delete-task-button" onClick={
      async () => {
        try{
          handleDelete(task);
        }catch(err){
          console.log(err);
        }
      }
    }>×</button>
  </div>
  );
};


export default TaskItem;