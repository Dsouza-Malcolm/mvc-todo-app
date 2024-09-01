import { initFlowbite } from "flowbite";
import "../../css/index.css";
import {
  convertTo12HourFormat,
  generateUniqueId,
  getDateStatus,
} from "./helper";
import * as model from "./model";
import AddTaskView from "./views/addTaskView";
import TaskList from "./views/taskList";
import TodoItemView from "./views/todoItemView";
import UpdateTaskView from "./views/updateTaskView";
import ModalView from "./views/ModalView";

const TASK = {
  title: "",
  description: "",
  priority: "",
  dueDate: "",
  isCompleted: false,
};

const controlAddTask = (data) => {
  const newTask = {
    ...TASK,
    ...data,
    dueTime12: data.dueTime ? convertTo12HourFormat(data.dueTime) : "",
    dueStatus: getDateStatus(data.dueDate),
    id: generateUniqueId(),
    taskCreated: new Date().toISOString(),
  };

  model.addTodo(newTask);
  console.log(newTask);
  TaskList.render(model.state.byPriority);
};

const controlUpdateTask = (updatedTask) => {
  model.updateTodo(updatedTask);
  TaskList.render(model.state.tasks);
};

const controlCompleteTask = (taskId) => {
  model.taskComplete(taskId);
  TaskList.render(model.state.tasks);
};

const controlDeleteTask = (taskId) => {
  console.log("Delete Task ", taskId);
  model.deleteTodo(taskId);
  console.log(model.state.tasks);
  TaskList.render(model.state.tasks);
};

const controlSorting = (sortBy) => {
  if (sortBy === "upcoming") {
    TaskList.render(model.state.upcoming);
  }
  if (sortBy === "priority") {
    TaskList.render(model.state.byPriority);
  }
  if (sortBy === "recent") {
    TaskList.render(model.state.tasks);
  }
  console.log(sortBy);
};

const controlTaskToEdit = (taskId) => {
  const task = model.getTaskById(taskId);

  if (!task) return;

  UpdateTaskView.updateTaskModal(task);
};

const controlTodoList = () => {
  TaskList.render(model.state.tasks);
};

const init = () => {
  document.addEventListener("DOMContentLoaded", () => initFlowbite());
  AddTaskView._datePickerSetMinDate();
  // AddTaskView._addHandlerNewTask(controlAddTask);
  const modal = new ModalView();
  modal._addHandlerBindSubmit(controlAddTask, controlUpdateTask);

  TaskList.addHandlerTodoList(controlTodoList);
  TaskList.addHandlerSortList(controlSorting);

  TodoItemView.addHandler(
    controlCompleteTask,
    controlDeleteTask,
    controlTaskToEdit
  );
};

init();
