import { Task } from '../types';

let tasks: Task[] = [];

/**
 * Fetches notes from Chrome storage and updates the task array.
 */
const fetchTasks = async (): Promise<void> => {
  const items = await chrome.storage.sync.get('tasks');
  tasks = items.tasks || [];
};

try {
  await fetchTasks(); // Fetch task initially when module is loaded
} catch (err) {
  console.error(err);
}

/**
 * Generates a unique ID for a new task based on the maximum ID in the current task array.
 * @returns The generated ID.
 */
const generateId = (): number => {
  const maxId = tasks.length > 0 ? Math.max(...tasks.map((n) => n.id)) : 0;
  return maxId + 1;
};

/**
 * Retrieves all task.
 * @returns A promise that resolves with an array of all task.
 */
const getAll = async (): Promise<Task[]> => {
  return tasks;
};

/**
 * Retrieves a task by its ID.
 * @param id - The ID of the task to retrieve.
 * @returns A promise that resolves with the task corresponding to the provided ID, or null if not found.
 */
const getById = async (id: number): Promise<Task | null> => {
  const foundNote = tasks.find((a) => a.id === id);
  return foundNote ? foundNote : null;
};

/**
 * Creates a new task.
 * @param newNote - The new task object containing task string and completed status.
 * @returns A promise that resolves with the created task.
 */
const create = async (newTask: { description: string }): Promise<Task> => {
  const createdTask = {
    id: generateId(),
    description: newTask.description,
    completed: false,
    priority: 0, // unused property
  } as Task;

  tasks = [...tasks, createdTask];

  await chrome.storage.sync.set({
    tasks: tasks,
  });

  return createdTask;
};

/**
 * Updates an existing task.
 * @param id - The ID of the task to update.
 * @param newTask - The updated task object containing new description and completed status.
 * @returns A promise that resolves with the updated task.
 */
const update = async (
  id: number,
  newTask: {
    description?: string;
    completed?: boolean;
  }
): Promise<Task> => {
  const foundTaskIndex = tasks.findIndex((a) => a.id === id);

  if (foundTaskIndex === -1) {
    throw new Error('Cannot update non-existent task.');
  }

  const updatedTask = {
    ...tasks[foundTaskIndex],
    description: newTask.description ?? tasks[foundTaskIndex].description,
    completed: newTask.completed ?? tasks[foundTaskIndex].completed,
  } as Task;

  tasks[foundTaskIndex] = updatedTask;

  await chrome.storage.sync.set({
    tasks: tasks,
  });

  return updatedTask;
};

/**
 * Removes a task.
 * @param id - The ID of the task to remove.
 * @returns A promise that resolves with the removed task.
 */
const remove = async (id: number): Promise<Task> => {
  const taskToDelete = tasks.find((a) => a.id === id) || null;

  if (taskToDelete === null) {
    throw new Error('Cannot remove non-existent note.');
  }

  tasks = tasks.filter((task) => task.id !== id);
  await chrome.storage.sync.set({
    tasks: tasks,
  });

  return taskToDelete;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
