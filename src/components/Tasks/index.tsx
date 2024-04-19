import React, { useEffect, useState, useRef } from 'react';
import './Tasks.css';
import tasksService from '../../services/tasks';
import { Task } from '../../types';
import TaskItem from '../TaskItem';

const Tasks: React.FC = () => {
  const inputFieldRef = useRef(null);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [triggerRender, setTriggerRender] = useState(false);
  const [newTaskString, setNewTaskString] = useState<string>('')

  // retrieve tasks on first render
  useEffect(() => {
    async function retrieveTasks() {
      const tasks: Task[] = await tasksService.getAll();
      setTaskList(tasks);
    }
    retrieveTasks();
  }, []);

  // re-retrieve tasks when task is deleted
  useEffect(() => {
    async function retrieveTasks() {
      const tasks: Task[] = await tasksService.getAll();
      setTaskList(tasks);
    }
    retrieveTasks();
  }, [triggerRender]);

  // saves new task to storage and renders it
  const handleClick = async () => {
    
    setNewTaskString('');
    // get the task string and check from the new task thingie
    async function retrieveInput(): Promise<void> {
      const taskString = document.getElementById(
        'new-task-string'
      ) as HTMLInputElement;
      const tString = taskString ? taskString.value : '';

      const taskCompleted = document.getElementById(
        'new-task-completed'
      ) as HTMLInputElement;
      const tCompleted = taskCompleted ? taskCompleted.checked : false;
      if (tString != '') {
        await tasksService.create({
          taskString: tString,
          taskCompleted: tCompleted,
        });
      }
    }

    // clear the new task thingie
    function clearInput() {
      const taskString = document.getElementById(
        'new-task-string'
      ) as HTMLInputElement;
      if (taskString) {
        taskString.value = '';
      }

      const taskCompleted = document.getElementById(
        'new-task-completed'
      ) as HTMLInputElement;
      if (taskCompleted) {
        taskCompleted.checked = false;
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


  const handleChecked = async (task: Task, checked: boolean) => {
    try{
      await tasksService.update(task.id, {taskString: task.taskString, taskCompleted: checked});
      setTriggerRender(!triggerRender);
    }catch(err){
      console.log(err);
    }
  }

  const handleText = async (task: Task, newString: string) => {
    try{
      await tasksService.update(task.id, {taskString: newString, taskCompleted: task.completed});
      setTriggerRender(!triggerRender);
    }catch(err){
      alert('shit');
      console.log(err);
    }
  }

  const handleDelete = async (task: Task) => {
    try{
      await tasksService.remove(task.id);
      setTriggerRender(!triggerRender);
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div id="tasklist">
      {taskList.map((task: Task) => {
        return <TaskItem task={task} key={task.id} handleChecked={handleChecked} handleDelete={handleDelete} handleText={handleText} />;
      })}
      <div className="task-item" id={newTaskString == '' ? "new-task-empty" : "new-task"}>
        <input className={newTaskString == '' ? 'task-item-checkbox hidden-checkbox':'task-item-checkbox'} type="checkbox" id="new-task-completed"></input>
        <input className='task-item-text' id="new-task-string" placeholder='New Task...' ref={inputFieldRef} onChange={async (e) => {setNewTaskString(e.target.value)}}></input>
        <button
          // className={newTaskString == '' ? 'task-item-rbutton hidden-checkbox' : 'task-item-rbutton'}
          className='task-item-rbutton'
          id="add-task" onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
};

export default Tasks;
