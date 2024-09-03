import ModalView from './views/modalView';
import TodoListView from './views/todoListView';
import TodoItemView from './views/todoItemView';
import FilterTodoView from './views/filterTodoView.js';
import DarkThemeViewfrom from './views/darkThemeView.js';
import model from './model.js';
import { SORT_OPTIONS, TASK_TEMPLATE } from './config.js';
import {
  convertTo12HourFormat,
  generateUniqueId,
  getDateStatus,
} from './helper.js';
import 'core-js/stable';

class Controller {
  constructor() {
    this.taskManager = model;
    this.modalView = new ModalView();
    this.todoListView = new TodoListView();
    this.todoItemView = new TodoItemView();
    this.filterTodoView = new FilterTodoView();
    this.darkThemeView = new DarkThemeViewfrom();
  }

  init() {
    this.todoListView.addHandlerTodoList(this.controlTodoList.bind(this));

    this.todoItemView.addHandler(
      this.controlCompleteTask.bind(this),
      this.controlDeleteTask.bind(this),
      this.controlEditTask.bind(this)
    );
    this.modalView.addHandlerBindSubmit(
      this.controlAddTask.bind(this),
      this.controlUpdateTask.bind(this)
    );
    this.filterTodoView.addHandlerSortList(this.controlSortTodoList.bind(this));
  }

  controlAddTask(data) {
    const status = getDateStatus(data.dueDate);

    const newTask = {
      ...TASK_TEMPLATE,
      ...data,
      dueTime12: data.dueTime ? convertTo12HourFormat(data.dueTime) : '',
      id: generateUniqueId(),
      dueStatus: status,
      createdAt: new Date().toISOString(),
    };

    this.taskManager.addTodo(newTask);
    this.controlTodoList();
  }

  controlUpdateTask(updatedTask) {
    this.taskManager.updateTodo(updatedTask);
    this.controlTodoList();
  }

  controlCompleteTask(taskId) {
    this.taskManager.completeTodo(taskId);
    this.controlTodoList();
  }

  controlDeleteTask(taskId) {
    this.taskManager.deleteTodo(taskId);
    this.controlTodoList();
  }

  controlTodoList() {
    this.todoListView.render(this.taskManager.state.filteredTasks);
  }

  controlSortTodoList(sortBy) {
    this.taskManager.setUserSelectedFilter(sortBy);
    this.controlTodoList();
  }

  controlEditTask(taskId) {
    const task = this.taskManager.getTaskById(taskId);

    if (task) this.modalView._OpenModal(task);
  }
}

const app = new Controller();
app.init();
