import { Task } from '../types';
import { createTask } from './taskUtils';

export const handleCreateTask = async (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  const createdTask = await createTask();
  setTasks([...tasks, createdTask]);
};