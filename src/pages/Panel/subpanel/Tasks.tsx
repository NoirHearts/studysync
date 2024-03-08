import React, { useEffect, useState, useRef } from 'react';

type TaskData = {
  taskName: string;
  taskCompleted: boolean;
}

function getNewTask(): [string, boolean] {
  const taskString = document.getElementById(
    'new-task-string'
  ) as HTMLInputElement;
  let tString = taskString ? taskString.value : '';

  const taskCompleted = document.getElementById(
    'new-task-completed'
  ) as HTMLInputElement;
  let tCompleted = taskCompleted ? taskCompleted.checked : false;

  return [tString, tCompleted];
}

function clearTask() {
  const taskString = document.getElementById(
    'new-task-string'
  ) as HTMLInputElement;
  if (taskString) {
    taskString.value = ''
  }

  const taskCompleted = document.getElementById(
    'new-task-completed'
  ) as HTMLInputElement;
  if (taskCompleted) {
    taskCompleted.checked = false
  }
}

function Task({ taskName, taskCompleted }: TaskData) {

  return (
    <div className="task-item">
      {taskCompleted ? <input type="checkbox" checked></input> : <input type="checkbox"></input>}
      {/* taskCompleted ? <span style={{ textDecoration: "line-through" }}>{taskName}</span> : <span>{taskName}</span> */}
      {taskName}
    </div >
  )
}

let savedTasks: Array<TaskData> = [
  { taskName: "lorem ipsum dolor sit amet 1", taskCompleted: false },
  { taskName: "lorem ipsum dolor sit amet 2", taskCompleted: true },
  { taskName: "lorem ipsum dolor sit amet 3", taskCompleted: false },
  { taskName: "lorem ipsum dolor sit amet 4", taskCompleted: false }
]

const Tasks: React.FC = () => {

  const inputFieldRef = useRef(null);
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [taskListRender, setTaskListRender] = useState<JSX.Element[]>([])

  const handleClick = () => {
    let [tString, tCompleted] = getNewTask();
    if (tString != '') {
      taskList.push({
        taskName: tString,
        taskCompleted: tCompleted
      });
      clearTask();
      setTaskList(taskList);
      setTaskListRender(
        taskList.map((task: { taskName: string, taskCompleted: boolean }) => {
          return (<Task taskName={task.taskName} taskCompleted={task.taskCompleted} />)
        })
      )
    }
  };

  // Triggers add stask on press enter while empty task in focus
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

  return (
    <div>
      {taskListRender}
      <div className="task-item">
        <input type="checkbox" id="new-task-completed"></input>
        <input id="new-task-string" ref={inputFieldRef}></input>
        <button id="add-task" onClick={handleClick}>+</button>
      </div>
    </div>
  );
};

export default Tasks;
