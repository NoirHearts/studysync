import React, { useEffect, useState, useRef } from 'react';
import deleteImage from '../assets/img/delete.png';
// import './Tasks.css'

type TaskData = {
  taskName: string;
  taskCompleted: boolean;
  taskID: string;
}

// TODO: https://stackoverflow.com/questions/5364062/how-can-i-save-information-locally-in-my-chrome-extension
// Chrome storage: https://developer.chrome.com/docs/extensions/reference/api/storage
// Firefox storage: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage

function getNewTask(): [string, boolean] {
  const taskString = document.getElementById(
    'new-task-string'
  ) as HTMLInputElement;
  let tString = taskString ? taskString.value : '';

  const taskCompleted = document.getElementById(
    'new-task-completed'
  ) as HTMLInputElement;
  let tCompleted = taskCompleted ? taskCompleted.checked : false;

  return [tString, tCompleted];
}

function clearTask() {
  const taskString = document.getElementById(
    'new-task-string'
  ) as HTMLInputElement;
  if (taskString) {
    taskString.value = ''
  }

  const taskCompleted = document.getElementById(
    'new-task-completed'
  ) as HTMLInputElement;
  if (taskCompleted) {
    taskCompleted.checked = false
  }
}

function Task({ taskName, taskCompleted, taskListRef }: { taskName: string; taskCompleted: boolean; taskListRef: any }) {

  const handleClick = () => {

  }

  const handleOnChange = () => {

  }

  return (
    <div className="task-item">
      {
        taskCompleted
          ? <input type="checkbox" className="task-completed" onChange={handleOnChange} checked></input>
          : <input type="checkbox" className="task-completed" onChange={handleOnChange} ></input>}
      <span className={taskCompleted ? "task-name task-done" : "task-name"}>{taskName}</span>
      <button className="delete-task-button" onClick={handleClick}>{/* <img src={deleteImage} /> */}D</button>
    </div >
  )
}

const Tasks: React.FC = () => {

  const inputFieldRef = useRef(null);
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [taskListRender, setTaskListRender] = useState<JSX.Element[]>([])

  const handleClick = () => {
    let [tString, tCompleted] = getNewTask();
    if (tString != '') {
      taskList.push({
        taskName: tString,
        taskCompleted: tCompleted,
        taskID: "135"
      });
      clearTask();
      setTaskList(taskList);
      setTaskListRender(
        taskList.map((task: TaskData) => {
          return (<Task taskName={task.taskName} taskCompleted={task.taskCompleted} taskListRef={taskList} />)
        })
      )
    }
  };

  // Triggers add task on press enter while empty task in focus
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
      {taskListRender}
      <div className="task-item">
        <input type="checkbox" id="new-task-completed"></input>
        <input id="new-task-string" ref={inputFieldRef}></input>
        <button id="add-task" onClick={handleClick}>+</button>
      </div>
    </div>
  );
};

export default Tasks;
