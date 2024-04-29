import taskService from '../services/task';

export const createTask = async () => {
  const createdTask = await taskService.create({
    description: '',
  });
  return createdTask;
};