import React, { useEffect, useState, useRef } from 'react';
import deleteImage from '../assets/img/delete.png';
// import './Tasks.css'

type TaskData = {
  taskString: string;
  taskCompleted: boolean;
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

function Task({ taskString, taskCompleted, taskListRef }: { taskListRef: any; taskString: string; taskCompleted: boolean; taskKey: string }) {

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
      <span className={taskCompleted ? "task-name task-done" : "task-name"}>{taskString}</span>
      <button className="delete-task-button" onClick={handleClick}>{/* <img src={deleteImage} /> */}D</button>
    </div >
  )
}

const Tasks: React.FC = () => {

  const inputFieldRef = useRef(null);
  const [taskList, setTaskList] = useState<{ [id: string]: TaskData }>({});
  const [taskListRender, setTaskListRender] = useState<JSX.Element[]>([])

  const handleClick = () => {
    let [tString, tCompleted] = getNewTask();
    if (tString != '') {
      let tid: String = Date.now().toString()
      let tid_offset: number = 0
      while (taskList[`${tid}+${tid_offset}`]) {
        tid_offset++;
      }
      taskList[`${tid}+${tid_offset}`] = {
        taskString: tString,
        taskCompleted: tCompleted
      }
      clearTask();
      setTaskList(taskList);
      let newTaskListRender = []
      for (let taskKey in taskList) {
        newTaskListRender.push(<Task taskListRef={taskList} taskKey={taskKey} taskString={taskList[taskKey].taskString} taskCompleted={taskList[taskKey].taskCompleted} />)
      }
      setTaskListRender(newTaskListRender)
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
