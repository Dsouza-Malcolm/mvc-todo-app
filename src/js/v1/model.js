import { getDateStatus } from "./helper";

const INITIAL_STATE = {
  tasks: [],
  completedTasks: [],
  byPriority: [],
  upcoming: [],
};

export const state = { ...INITIAL_STATE };

export const addTodo = (newTask) => {
  state.tasks.unshift(newTask);
  filterTasks();
  persistTasks();
};

export const taskComplete = (taskId) => {
  state.tasks = state.tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, isCompleted: true };
    }

    return task;
  });

  filterTasks();
  persistTasks();
};

export const deleteTodo = (taskId) => {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  console.log(state);
  persistTasks();
};

export const updateTodo = (updatedTask) => {
  const { id } = updatedTask;

  state.tasks = state.tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        ...updatedTask,
        dueStatus: getDateStatus(updatedTask.dueDate),
      };
    }

    return task;
  });

  persistTasks();
};

const filterTasks = () => {
  state.completedTasks = state.tasks.filter(
    (task) => task.isCompleted === true
  );

  state.upcoming = state.tasks.filter(
    (task) => task.dueStatus !== "Today" || task.dueStatus !== "Yesterday"
  );

  state.tasks = state.tasks.filter((task) => task.isCompleted !== true);

  state.byPriority = [...state.tasks].sort(
    (a, b) => parseInt(a.priority.slice(1)) - parseInt(b.priority.slice(1))
  );

  console.log(state);
};

export const getTaskById = (taskId) => {
  return state.tasks.find((task) => task.id === taskId);
};

export const persistTasks = () => {
  localStorage.setItem("todoTasks", JSON.stringify(state.tasks));
};

const clearPersistTasks = () => {
  localStorage.clear("todoTasks");
};

const init = () => {
  const storage = localStorage.getItem("todoTasks");
  if (storage) state.tasks = JSON.parse(storage);
  filterTasks();
};

// clearPersistTasks();
init();
