import React, { useEffect, useRef, useState } from 'react';
import taskService from '../services/task';
import { Task } from '../types';
import { saveCooldown } from '../constants';

interface Props {
  task: Task;
  handleUpdate: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const TaskItem: React.FC<Props> = ({ task, handleUpdate, handleDelete }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const descriptionField = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (task !== null) {
      setTaskDescription(task.description);
      setTaskCompleted(task.completed);
    }
    resizeHeight();
  }, [task]);

  useEffect(() => {
    const timeoutId = setTimeout(saveTask, saveCooldown);

    return () => clearTimeout(timeoutId);
  }, [taskDescription, taskCompleted]);

  const saveTask = async () => {
    try {
      if (taskDescription !== '') {
        const updatedTask = await taskService.update(task.id, {
          completed: taskCompleted,
          description: taskDescription,
        });
        handleUpdate(updatedTask);
      } else if (document.activeElement !== descriptionField.current) {
        const deletedTask = await taskService.remove(task.id);
        handleDelete(deletedTask);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resizeHeight = () => {
    const el = descriptionField.current;
    if (el !== null && el instanceof HTMLTextAreaElement) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  };

  return (
    <div
      className={`task-item ${taskDescription === '' ? 'task-deleting' : ''}`}
    >
      <input
        type="checkbox"
        className="task-item-checkbox"
        onChange={async (e) => {
          setTaskCompleted(e.target.checked);
        }}
        checked={taskCompleted}
      ></input>
      <textarea
        rows={1}
        autoFocus={task.description === ''}
        className={`task-item-text ${taskCompleted ? 'task-done' : ''}`}
        ref={descriptionField}
        value={taskDescription}
        onChange={(e) => {
          setTaskDescription(e.target.value);
          resizeHeight();
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
