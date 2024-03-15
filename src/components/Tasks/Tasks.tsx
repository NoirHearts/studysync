import React, { useEffect, useState, useRef } from 'react';
// import deleteImage from '../assets/img/delete.png';
import './Tasks.css'
import tasksService from '../../services/tasks'
import { Task } from '../../types'

// TODO: https://stackoverflow.com/questions/5364062/how-can-i-save-information-locally-in-my-chrome-extension
// Chrome storage: https://developer.chrome.com/docs/extensions/reference/api/storage
// Firefox storage: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage

const Tasks: React.FC = () => {
  const inputFieldRef = useRef(null);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [triggerRender, setTriggerRender] = useState(false);

  function TaskComponent({ task }: { task: Task }) {

    const [taskCompleted, setTaskCompleted] = useState(task.completed);

    const handleClick = async () => {
      await tasksService.deleteTask(task.id);
      setTriggerRender(!triggerRender);
    }

    const handleOnChange = async (e: any) => {
      setTaskCompleted(e.target.checked);
      task.completed = e.target.checked;
      await tasksService.editTask(task.id, task);
      setTriggerRender(!triggerRender);
    }

    // TODO: https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/

    return (
      <div className="task-item">
        <input type="checkbox" className="task-completed" onChange={handleOnChange} checked={taskCompleted}></input>
        <span className={taskCompleted ? "task-name task-done" : "task-name"}>{task.task}</span>
        <button className="delete-task-button" onClick={handleClick}>{/* <img src={deleteImage} /> */}D</button>
      </div >
    )
  }

  // retrieve tasks on first render
  useEffect(()=>{
    async function retrieveTasks(){
      await tasksService.loadTasks()
      const tasks: Task[] = await tasksService.getAll();
      setTaskList(tasks)
    }
    retrieveTasks();
  }, [])

  // saves new task to storage and renders it
  const handleClick = async () => {

    // get the task string and check from the new task thingie
    async function retrieveInput(): Promise<Task> {
      const taskString = document.getElementById(
        'new-task-string'
      ) as HTMLInputElement;
      const tString = taskString ? taskString.value : '';

      const taskCompleted = document.getElementById(
        'new-task-completed'
      ) as HTMLInputElement;
      const tCompleted = taskCompleted ? taskCompleted.checked : false;
      
      const newTask: Task = await tasksService.createTask(tString, tCompleted);
      return newTask;
    }
    
    // clear the new task thingie
    function clearInput() {
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

    await retrieveInput();
    clearInput();
    setTaskList(await tasksService.getAll());    
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
      {
        taskList.map((task: Task) => {
          return (
            <TaskComponent
              task={task}
              key={task.id}
            />
          )
        })
      }
      <div className="task-item">
        <input type="checkbox" id="new-task-completed"></input>
        <input id="new-task-string" ref={inputFieldRef}></input>
        <button id="add-task" onClick={handleClick}>+</button>
      </div>
    </div>
  );
};

export default Tasks;
