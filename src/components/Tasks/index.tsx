import React, { useEffect, useState, useRef } from 'react';
import './Tasks.css';
import taskService from '../../services/tasks';
import { Task } from '../../types';
import TaskItem from '../TaskItem';

const Tasks: React.FC = () => {
  const inputFieldRef = useRef(null);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTaskString, setNewTaskString] = useState<string>('');

  useEffect(() => {
    const retrieveTasks = async () => {
      try {
        const tasks = await taskService.getAll();
        setTaskList(tasks);
      } catch (e) {
        console.error(e);
      }
    };
    retrieveTasks();
  }, []);

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
        await taskService.create({
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
    setTaskList(await taskService.getAll());
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

  const updateHandler = async (updatedTask: Task) => {
    setTaskList(
      taskList.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const deleteHandler = async (deletedTask: Task) => {
    setTaskList(taskList.filter((t) => t.id !== deletedTask.id));
  };

  return (
    <div id="tasklist">
      {taskList.map((task: Task) => {
        return (
          <TaskItem
            task={task}
            key={task.id}
            handleUpdate={updateHandler}
            handleDelete={deleteHandler}
          />
        );
      })}
      <div
        className="task-item"
        id={newTaskString == '' ? 'new-task-empty' : 'new-task'}
      >
        <input
          className={
            newTaskString == ''
              ? 'task-item-checkbox hidden-checkbox'
              : 'task-item-checkbox'
          }
          type="checkbox"
          id="new-task-completed"
        ></input>
        <input
          className="task-item-text"
          id="new-task-string"
          placeholder="New Task..."
          ref={inputFieldRef}
          onChange={async (e) => {
            setNewTaskString(e.target.value);
          }}
        ></input>
        <button
          // className={newTaskString == '' ? 'task-item-rbutton hidden-checkbox' : 'task-item-rbutton'}
          className="task-item-rbutton"
          id="add-task"
          onClick={handleClick}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Tasks;
