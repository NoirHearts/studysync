import React, { useEffect, useState } from 'react';
import './Tasks.css';
import taskService from '../../services/task';
import { Task } from '../../types';
import TaskItem from '../TaskItem';
import { handleCreateTask } from '../taskHandlers';

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

  const createNewTask = async () => {
    await handleCreateTask(tasks, setTasks);
  };

  const updateHandler = async (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteHandler = async (deletedTask: Task) => {
    setTasks(tasks.filter((t) => t.id !== deletedTask.id));
  };

  return (
    <div className="task-content-container">
      <div id="tasklist">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => {
            return (
              <TaskItem
                task={task}
                key={task.id}
                handleUpdate={updateHandler}
                handleDelete={deleteHandler}
              />
            );
          })
        ) : (
          <p>No tasks yet. Try creating one.</p>
        )}
      </div>
      <button
        id="create-task-button"
        // onClick={() => {
        //   createTask();
        // }}
        onClick={createNewTask}
      ></button>
    </div>
  );
};

export default Tasks;
