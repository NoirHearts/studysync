import React, { useEffect, useState, useRef } from 'react';
import deleteImage from '../assets/img/delete.png';
import './Tasks.css'

const localStorageKey = "studysync-tasks"

type TaskData = {
  taskString: string;
  taskCompleted: boolean;
}

// TODO: https://stackoverflow.com/questions/5364062/how-can-i-save-information-locally-in-my-chrome-extension
// Chrome storage: https://developer.chrome.com/docs/extensions/reference/api/storage
// Firefox storage: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage

// get the task string and check from the new task thingie
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

// clear the new task thingie
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

function Task({ taskString, taskCompleted, taskKey, taskListRef, taskListRenderRef }: { taskListRef: any[]; taskListRenderRef: any[]; taskString: string; taskCompleted: boolean; taskKey: string }) {

  const refresh = async () => {
    localStorage.setItem(localStorageKey, JSON.stringify(taskListRef[0]))
    taskListRef[1](taskListRef[0])
    refreshTaskListRender(taskListRef, taskListRenderRef)
  }

  const handleClick = async () => {
    delete taskListRef[0][taskKey];
    await refresh();
  }

  const handleOnChange = async (e: any) => {
    taskListRef[0][taskKey].taskCompleted = e.target.checked
    await refresh();
  }

  // TODO: https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/

  return (
    <div className="task-item">
      {
        taskCompleted
          ? <input type="checkbox" className="task-completed" onChange={handleOnChange} checked></input>
          : <input type="checkbox" className="task-completed" onChange={handleOnChange} ></input>
      }
      <span className={taskCompleted ? "task-name task-done" : "task-name"}>{taskString}</span>
      <button className="delete-task-button" onClick={handleClick}>{/* <img src={deleteImage} /> */}D</button>
    </div >
  )
}

function refreshTaskListRender(taskListRef: any[], taskListRenderRef: any[]) {
  let newTaskListRender = []
  for (let taskKey in taskListRef[0]) {
    newTaskListRender.push(
      <Task
        taskListRef={taskListRef}
        taskListRenderRef={taskListRenderRef}
        taskKey={taskKey}
        key={taskKey}
        taskString={taskListRef[0][taskKey].taskString}
        taskCompleted={taskListRef[0][taskKey].taskCompleted}
      />
    )
  }
  taskListRenderRef[1](newTaskListRender)
}

const Tasks: React.FC = () => {
  const inputFieldRef = useRef(null);
  const [taskList, setTaskList] = useState<{ [id: string]: TaskData }>({});
  const [taskListRender, setTaskListRender] = useState<JSX.Element[]>([]);

  // loads the task list
  useEffect(() => {
    let savedTaskList: string | null = localStorage.getItem(localStorageKey)
    console.log(savedTaskList)
    if (savedTaskList == null) {
      let newSavedTaskList: { [id: string]: TaskData } = {}
      localStorage.setItem("tasks", JSON.stringify(newSavedTaskList))
    } else {
      let loadedTaskList: { [id: string]: TaskData } = {}
      try {
        loadedTaskList = JSON.parse(savedTaskList)
      } catch (err) {
        console.log(err)
        console.log(savedTaskList.toString())
        localStorage.clear()
      }
      setTaskList(loadedTaskList)
    }
  }, []);

  useEffect(() => {
    refreshTaskListRender([taskList, setTaskList], [taskListRender, setTaskListRender])
  }, [taskList]);

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

      if (tString == 'clear') {
        localStorage.clear()
      } else {
        localStorage.setItem(localStorageKey, JSON.stringify(taskList))
      }

      setTaskList(taskList);
      refreshTaskListRender([taskList, setTaskList], [taskListRender, setTaskListRender])
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
