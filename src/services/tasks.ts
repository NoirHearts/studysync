import { Task } from '../types'

const tasksLocalStorageKey = "studysync-tasks"

let tasks: Task[] = [];

const loadTasks = async () => {

  const savedTaskList: string | null = localStorage.getItem(tasksLocalStorageKey);

  if (savedTaskList == null) {
    tasks = [];
  } else {

    try {
      const parsed: Task[] = JSON.parse(savedTaskList);
      tasks = parsed;
    } catch (err) {
      console.log(err);
      localStorage.removeItem(tasksLocalStorageKey);
      tasks = [];
    }
  }
}

const saveTasks = async (taskList=tasks) => {
  localStorage.setItem(tasksLocalStorageKey, JSON.stringify(taskList))
  console.log("wgat")
}

const getAll = async (): Promise<Task[]> => {
  return tasks;
}

const createTask = async(task: string, completed: boolean, taskList=tasks): Promise<Task> => {
  const timestamp: string = Date.now().toString();
  let offset = 0;
  let id = `${timestamp}+${offset}`;
  while(tasks.find((a) => a.id == id)){
    offset++;
    id = `${timestamp}+${offset}`;
  }

  const newTask = {
    task: task,
    completed: completed,
    id: id,
    priority: 0
  }

  if(taskList == tasks){
    tasks = [...tasks, newTask];
  }else{
    taskList.push(newTask)
  }
  
  await saveTasks();

  return newTask
}

const findTask = async (id: string, taskList=tasks): Promise<Task | null> => {
  const foundTask = taskList.find((a) => a.id == id);
  return foundTask ? foundTask : null;
}

const deleteTask = async(id: string, taskList=tasks) => {
  const i = taskList.findIndex((a) => a.id == id);
  taskList.splice(i, 1);
  if(taskList == tasks){
    await saveTasks();
  }
}

const editTask = async(id: string, updated: Task, taskList=tasks) => {
  const i = taskList.findIndex((a) => a.id == id);
  taskList[i] = updated;
  if(taskList == tasks){
    await saveTasks();
  }
}

export  default {
  loadTasks,
  saveTasks,
  getAll,
  createTask,
  findTask,
  editTask,
  deleteTask
}