import React, { useState } from 'react';
// import deleteImage from '../assets/img/delete.png';
import taskService from '../services/tasks';
import { Task } from '../types';

interface Props {
  task: Task;
  handleUpdate: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const TaskItem: React.FC<Props> = ({ task, handleUpdate, handleDelete }) => {
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description
  );

  return (
    <div
      className={
        taskDescription == '' ? 'task-item task-deleting' : 'task-item'
      }
    >
      <input
        type="checkbox"
        className="task-item-checkbox"
        onChange={async (e) => {
          try {
            const updatedTask = await taskService.update(task.id, {
              completed: e.target.checked,
            });
            handleUpdate(updatedTask);
          } catch (err) {
            console.log(err);
          }
        }}
        checked={task.completed}
      ></input>
      <input
        className={
          task.completed ? 'task-item-text task-done' : 'task-item-text'
        }
        value={taskDescription}
        onChange={async (e) => {
          setTaskDescription(e.target.value);
        }}
        onBlur={async (_) => {
          try {
            if (taskDescription != '') {
              task.description = taskDescription;
              const updatedTask = await taskService.update(task.id, {
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
