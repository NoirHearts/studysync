import React, { useEffect, useState } from 'react';
import taskService from '../services/task';
import { Task } from '../types';

interface Props {
  task: Task;
  handleUpdate: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const TaskItem: React.FC<Props> = ({ task, handleUpdate, handleDelete }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    if (task !== null) {
      setTaskDescription(task.description);
      setTaskCompleted(task.completed);
    }
  }, [task]);

  const saveTask = async () => {
    try {
      if (taskDescription !== '') {
        const updatedTask = await taskService.update(task.id, {
          completed: taskCompleted,
          description: taskDescription,
        });
        handleUpdate(updatedTask);
      } else {
        const deletedTask = await taskService.remove(task.id);
        handleDelete(deletedTask);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        taskDescription === '' ? 'task-item task-deleting' : 'task-item'
      }
    >
      <input
        type="checkbox"
        className="task-item-checkbox"
        onChange={async (e) => {
          setTaskCompleted(e.target.checked);
          await saveTask();
        }}
        checked={taskCompleted}
      ></input>
      <input
        autoFocus={task.description === ''}
        className={
          taskCompleted ? 'task-item-text task-done' : 'task-item-text'
        }
        value={taskDescription}
        onChange={(e) => {
          setTaskDescription(e.target.value);
        }}
        onBlur={async (_) => {
          await saveTask();
        }}
      />
      <button
        className="task-item-rbutton task-item-delete"
        onClick={async () => {
          try {
            const deletedTask = await taskService.remove(task.id);
            handleDelete(deletedTask);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        ×
      </button>
    </div>
  );
};

export default TaskItem;
