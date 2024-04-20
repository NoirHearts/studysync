import React, { useEffect, useState } from 'react';
import './Tasks.css';
import taskService from '../../services/task';
import { Task } from '../../types';
import TaskItem from '../TaskItem';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const retrieveTasks = async () => {
      try {
        const items = await taskService.getAll();
        setTasks(items);
      } catch (e) {
        console.error(e);
      }
    };
    retrieveTasks();
  }, []);

  const createTask = async () => {
    const createdTask = await taskService.create({
      description: '',
    });
    setTasks([...tasks, createdTask]);
  };

  const updateHandler = async (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteHandler = async (deletedTask: Task) => {
    setTasks(tasks.filter((t) => t.id !== deletedTask.id));
  };

  return (
    <div id="tasklist">
      {tasks.map((task: Task) => {
        return (
          <TaskItem
            task={task}
            key={task.id}
            handleUpdate={updateHandler}
            handleDelete={deleteHandler}
          />
        );
      })}
      <button
        id="create-task-button"
        onClick={() => {
          createTask();
        }}
      >
        +
      </button>
    </div>
  );
};

export default Tasks;
